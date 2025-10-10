import dbConnect from "../_lib/dbConnect";
import {User} from "../_models/index";
import {getPlainObject} from "../_lib/PlainObject";
import UserModel from "../_models/UserModel";

/**
 * Creates a new user in the database.
 * @param {object} data - The user data to create.
 * @returns {Promise<object>} The newly created user object.
 * @throws {Error} If there is an error during the database operation.
 */
export async function createUserService(data) {
    try {
        await dbConnect();
        const newUser = await UserModel.create(data);

        // Convert to plain object using the helper and remove password
        const userObject = getPlainObject(newUser);
        // The password field is already excluded by default due to `select: false` in the model,
        // but this is an extra layer of precaution.
        delete userObject.password;

        return userObject;
    } catch (error) {
        console.error("Error in createUserService:", error);

        // Handle specific Mongoose errors, like a duplicate key (email)
        if (error.code === 11000) {
            throw new Error("کاربری با این ایمیل قبلا ثبت‌نام کرده است.");
        }

        // For other errors, throw a generic message
        throw new Error("خطایی در هنگام ساخت کاربر رخ داد.");
    }
}

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array<object>>} A list of all user objects, without passwords.
 * @throws {Error} If there is an error during the database operation.
 */
export async function GetAllUserServices() {
    try {
        await dbConnect();
        // The password field is excluded by default
        const users = await UserModel.find({});
        return getPlainObject(users);
    } catch (error) {
        console.error("Error in GetAllUserServices:", error);
        throw new Error("خطایی در بازیابی کاربران رخ داد.");
    }
}

/**
 * Retrieves a single user by their ID.
 * @param {string} id - The ID of the user to retrieve.
 * @returns {Promise<object|null>} The user object without the password, or null if not found.
 * @throws {Error} If there is a database error.
 */
export async function getUserByIdService(id) {
    try {
        await dbConnect();
        const user = await UserModel.findById(id);
        return getPlainObject(user);
    } catch (error) {
        console.error("Error in getUserByIdService:", error);
        throw new Error("خطایی در بازیابی کاربر رخ داد.");
    }
}

/**
 * Updates a user's data in the database.
 * @param {string} id - The ID of the user to update.
 * @param {object} data - The new data for the user.
 * @returns {Promise<object|null>} The updated user object without the password, or null if not found.
 * @throws {Error} If there is a database error.
 */
export async function updateUserService(id, data) {
    try {
        await dbConnect();
        // Note: The 'password' field is intentionally not updatable here for security.
        delete data.password;

        const updatedUser = await UserModel.findByIdAndUpdate(id, data, {
            new: true, // Return the updated document
            runValidators: true, // Run schema validators on update
        });

        return getPlainObject(updatedUser);
    } catch (error) {
        console.error("Error in updateUserService:", error);
        throw new Error("خطایی در به‌روزرسانی کاربر رخ داد.");
    }
}

/**
 * Deletes a user from the database.
 * @param {string} id - The ID of the user to delete.
 * @returns {Promise<object|null>} The deleted user object, or null if not found.
 */
export async function deleteUserService(id) {
    try {
        await dbConnect();
        const deletedUser = await UserModel.findByIdAndDelete(id);
        return getPlainObject(deletedUser);
    } catch (error) {
        console.error("Error in deleteUserService:", error);
        throw new Error("خطایی در حذف کاربر رخ داد.");
    }
}

/**
 * Authenticates a user based on email and password.
 * @param {object} data - The user's login credentials ({email, password}).
 * @returns {Promise<object>} The authenticated user object without the password.
 * @throws {Error} If authentication fails.
 */
export async function loginUserService(data) {
    try {
        await dbConnect();
        const { email, password } = data;

        // 1. Find user by email and explicitly select the password field
        const user = await UserModel.findOne({ email }).select('+password');

        // 2. If no user is found, throw an error
        if (!user) {
            throw new Error("ایمیل یا رمز عبور اشتباه است.");
        }

        // 3. Compare the entered password with the hashed password in the database
        const isPasswordMatch = await user.comparePassword(password);

        // 4. If passwords do not match, throw the same error for security
        if (!isPasswordMatch) {
            throw new Error("ایمیل یا رمز عبور اشتباه است.");
        }

        // 5. Return the plain user object without the password
        const userObject = getPlainObject(user);
        delete userObject.password;

        return userObject;

    } catch (error) {
        // Log the actual error for debugging but throw a generic one to the controller
        console.error("Error in loginUserService:", error.message);
        throw new Error(error.message || "خطایی در فرآیند ورود رخ داد.");
    }
}
