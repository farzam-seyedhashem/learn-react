import { loginController } from "../../../_services/UserServices";

/**
 * API route handler for POST /api/auth/login
 * @param {Request} req - The incoming request object.
 * @returns {Promise<Response>} The response object.
 */
export async function POST(req) {
    return loginController(req);
}
