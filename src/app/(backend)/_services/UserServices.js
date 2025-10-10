import {
    createUserService,
    deleteUserService,
    GetAllUserServices,
    getUserByIdService,
    loginUserService,
    updateUserService
} from "../_controllers/UserControler"; // مسیر اصلاح شد
import {NextResponse} from "next/server";
import {SignJWT} from "jose";

// --- Authentication Controllers ---

/**
 * Handles the request to sign up a new user.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} The response object.
 */
export async function signupController(req) {
    try {
        const body = await req.json();

        if (!body.name || !body.email || !body.password) {
            return NextResponse.json({success: false, message: "لطفا تمام فیلدهای الزامی را پر کنید."}, {status: 400});
        }

        const newUser = await createUserService(body);

        return NextResponse.json({success: true, data: newUser}, {status: 201});

    } catch (error) {
        console.error("Error in signupController:", error);
        if (error.message.includes("قبلا ثبت‌نام کرده است")) {
            return NextResponse.json({success: false, message: error.message}, {status: 409}); // 409 Conflict
        }
        return NextResponse.json({success: false, message: error.message || "خطای داخلی سرور"}, {status: 500});
    }
}

/**
 * Handles the request to log in a user and returns a JWT.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} The response object with a token.
 */
export async function loginController(req) {
    try {
        const body = await req.json();
        const {email, password} = body;

        if (!email || !password) {
            return NextResponse.json({success: false, message: "ایمیل و رمز عبور الزامی است."}, {status: 400});
        }

        const user = await loginUserService({email, password});

        const secret = new TextEncoder().encode(process.env.JWT_SECRET);
        const alg = 'HS256';

        const token = await new SignJWT({userId: user._id, role: user.role})
            .setProtectedHeader({alg})
            .setExpirationTime('2h')
            .setIssuedAt()
            .sign(secret);

        return NextResponse.json({success: true, token, data: user}, {status: 200});

    } catch (error) {
        console.error("Error in loginController:", error.message);
        if (error.message.includes("اشتباه است")) {
            return NextResponse.json({success: false, message: error.message}, {status: 401});
        }
        return NextResponse.json({success: false, message: "خطای داخلی سرور"}, {status: 500});
    }
}


// --- Standard User CRUD Controllers ---

/**
 * Handles the request to get all users.
 * @returns {Promise<Response>} The response object.
 */
export async function getAllUsersController() {
    try {
        const users = await GetAllUserServices();
        return NextResponse.json({success: true, data: users}, {status: 200});
    } catch (error) {
        console.error("Error in getAllUsersController:", error);
        return NextResponse.json({success: false, message: "خطای داخلی سرور"}, {status: 500});
    }
}

export async function getUserByIdController(req, {params}) {
    try {
        const {id} = params;
        const user = await getUserByIdService(id);

        if (!user) {
            return NextResponse.json({success: false, message: "کاربر یافت نشد."}, {status: 404});
        }

        return NextResponse.json({success: true, data: user}, {status: 200});
    } catch (error) {
        console.error("Error in getUserByIdController:", error);
        return NextResponse.json({success: false, message: "خطای داخلی سرور"}, {status: 500});
    }
}

export async function updateUserController(req, {params}) {
    try {
        const {id} = params;
        const body = await req.json();

        delete body.role;

        const updatedUser = await updateUserService(id, body);

        if (!updatedUser) {
            return NextResponse.json({success: false, message: "کاربر یافت نشد."}, {status: 404});
        }

        return NextResponse.json({success: true, data: updatedUser}, {status: 200});
    } catch (error) {
        console.error("Error in updateUserController:", error);
        return NextResponse.json({success: false, message: "خطای داخلی سرور"}, {status: 500});
    }
}

export async function deleteUserController(req, {params}) {
    try {
        const {id} = params;
        const deletedUser = await deleteUserService(id);

        if (!deletedUser) {
            return NextResponse.json({success: false, message: "کاربر یافت نشد."}, {status: 404});
        }

        return NextResponse.json({success: true, message: "کاربر با موفقیت حذف شد."}, {status: 200});
    } catch (error) {
        console.error("Error in deleteUserController:", error);
        return NextResponse.json({success: false, message: "خطای داخلی سرور"}, {status: 500});
    }
}
