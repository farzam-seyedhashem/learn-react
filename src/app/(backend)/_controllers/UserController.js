import {
    createUserService,
    deleteUserService,
    GetAllUserServices,
    getUserByIdService,
    updateUserService
} from "../_services/UserServices";
import {NextResponse} from "next/server";

/**
 * Handles the request to create a new user.
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} The response object.
 */
export async function createUserController(req) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.email || !body.password) {
            return NextResponse.json({success: false, message: "Missing required fields."}, {status: 400});
        }

        const newUser = await createUserService(body);

        return NextResponse.json({success: true, data: newUser}, {status: 201});

    } catch (error) {
        console.error("Error in createUserController:", error);
        // Handle specific error from service
        if (error.message.includes("already exists")) {
            return NextResponse.json({success: false, message: error.message}, {status: 409}); // 409 Conflict
        }
        return NextResponse.json({success: false, message: error.message || "Internal Server Error"}, {status: 500});
    }
}

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
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}

export async function getUserByIdController(req, {params}) {
    try {
        const {id} = params;
        const user = await getUserByIdService(id);

        if (!user) {
            return NextResponse.json({success: false, message: "User not found."}, {status: 404});
        }

        return NextResponse.json({success: true, data: user}, {status: 200});
    } catch (error) {
        console.error("Error in getUserByIdController:", error);
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}

export async function updateUserController(req, {params}) {
    try {
        const {id} = params;
        const body = await req.json();

        // Prevent updating role or other sensitive fields directly
        delete body.role;

        const updatedUser = await updateUserService(id, body);

        if (!updatedUser) {
            return NextResponse.json({success: false, message: "User not found."}, {status: 404});
        }

        return NextResponse.json({success: true, data: updatedUser}, {status: 200});
    } catch (error) {
        console.error("Error in updateUserController:", error);
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}

export async function deleteUserController(req, {params}) {
    try {
        const {id} = params;
        const deletedUser = await deleteUserService(id);

        if (!deletedUser) {
            return NextResponse.json({success: false, message: "User not found."}, {status: 404});
        }

        return NextResponse.json({success: true, message: "User deleted successfully."}, {status: 200});
    } catch (error) {
        console.error("Error in deleteUserController:", error);
        return NextResponse.json({success: false, message: "Internal Server Error"}, {status: 500});
    }
}
