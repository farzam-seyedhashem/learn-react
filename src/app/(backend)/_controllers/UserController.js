import {User} from "@/app/(backend)/_models";
import dbConnect from "@/app/(backend)/_lib/dbConnect";

export async function GetUsersController(filter) {
	await dbConnect()
	return await User.find(filter)
}
export async function saveUsersController(data) {
	await dbConnect()
	const newUser = new User(data)
	return await newUser.save()
}