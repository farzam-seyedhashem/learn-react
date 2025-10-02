import {GetUsersController, saveUsersController} from "@/app/(backend)/_controllers/UserController";

export async function GetAllUserServices() {
	return await GetUsersController({})
}
export async function GetUserByPhoneServices(phone) {
	return await GetUsersController({phone: phone})
}
export async function CreateUserService(data) {
	return await saveUsersController(data)
}