import {
  deleteUserController,
  getUserByIdController,
  updateUserController,
} from "../../../_controllers/UserController";

/**
 * API route handler for GET /api/users/[id]
 */
export async function GET(req, { params }) {
  return getUserByIdController(req, { params });
}

/**
 * API route handler for PUT /api/users/[id]
 */
export async function PUT(req, { params }) {
  return updateUserController(req, { params });
}

/**
 * API route handler for DELETE /api/users/[id]
 */
export async function DELETE(req, { params }) {
  return deleteUserController(req, { params });
}