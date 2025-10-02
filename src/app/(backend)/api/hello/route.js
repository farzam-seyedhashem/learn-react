import {NextResponse,NextRequest} from "next/server";
import {CreateUserService, GetAllUserServices} from "@/app/(backend)/_services/UserServices";
import {getPlainObject} from "@/app/(backend)/_lib/PlainObject";

export async function GET() {
	const result = getPlainObject(await GetAllUserServices())
	return NextResponse.json(result,{status:200})
}
export async function POST(request) {
	try {
		const result = getPlainObject(await CreateUserService(await request.json()))
		return NextResponse.json(result, {status: 200})
	}catch(err){
		return NextResponse.json({error:err.message}, {status: 200})
	}
}