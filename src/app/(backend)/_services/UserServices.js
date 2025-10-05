import dbConnect from "../_lib/dbConnect";
import User from "../_models/UserModel";
import { getPlainObject } from "../_lib/PlainObject";

/**
 * Creates a new user in the database.
 * @param {object} data - The user data to create.
 * @returns {Promise<object>} The newly created user object.
 * @throws {Error} If there is an error during the database operation.
 */
export async function createUserService(data) {
  try {
    await dbConnect();
    const newUser = await User.create(data);

    // Convert to plain object using the helper and remove password
    const userObject = getPlainObject(newUser);
    delete userObject.password;

    return userObject;
  } catch (error) {
    console.error("Error in createUserService:", error);

    // Handle specific Mongoose errors, like a duplicate key (email)
    if (error.code === 11000) {
      throw new Error("A user with this email already exists.");
    }

    // For other errors, throw a generic message
    throw new Error("Could not create user due to a database error.");
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
    // Find all users and exclude the password field from the result
    const users = await User.find({}).select("-password");
    return getPlainObject(users);
  } catch (error) {
    console.error("Error in GetAllUserServices:", error);
    throw new Error("Could not retrieve users.");
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
    const user = await User.findById(id).select("-password");
    return getPlainObject(user);
  } catch (error) {
    console.error("Error in getUserByIdService:", error);
    throw new Error("Could not retrieve user.");
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
    // A separate flow should be created for password changes.
    delete data.password;

    const updatedUser = await User.findByIdAndUpdate(id, data, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    }).select("-password");

    return getPlainObject(updatedUser);
  } catch (error) {
    console.error("Error in updateUserService:", error);
    throw new Error("Could not update user.");
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
    const deletedUser = await User.findByIdAndDelete(id).select("-password");
    return getPlainObject(deletedUser);
  } catch (error) {
    console.error("Error in deleteUserService:", error);
    throw new Error("Could not delete user.");
  }
}
