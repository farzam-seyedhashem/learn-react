import { createUserController, getAllUsersController } from "../../_controllers/UserController";

/**
 * API route handler for POST /api/users
 * @param {Request} req
 * @returns {Promise<Response>}
 */
export async function POST(req) {
  return createUserController(req);
}

/**
 * API route handler for GET /api/users
 */
export async function GET() {
  return getAllUsersController();
}
