'use client'
import Button from "@/components/ui/Button";
import Input from "@/components/ui/input";
import {useEffect, useRef, useState} from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import Link from "next/link";
import {usePathname} from "next/navigation";

export default function Home() {
	const [text, setText] = useState("");
	const pathname = usePathname()
	const image = useRef(null)
	const input = useRef(null)
	const handleEmail = (e) => {
		setText(e.target.value)
	}

	return (
		<>
			<div className={"bg-white flex items-center justify-center h-dvh w-full"}>
				<div className={"relative w-11/12 md:w-3/12 p-6 border border-zinc-300 rounded-3xl "}>
					<Link href={"/"} >
					<button
						className={"flex items-center justify-center absolute top-6 right-6 text-black w-10 h-10 rounded-full hover:bg-black/8"}>
						<Icon>
							arrow_forward
						</Icon>
					</button>
					</Link>
					<div className={"flex justify-center"}>
						<Image width={100} height={69} alt={""} src={"/logo.svg"} layout={"fixed"}/>
					</div>
					<h1 className={"mt-6 text-zinc-900 font-bold text-[24px]"}>
						ورود | ثبت‌نام
					</h1>
					<p className={"mt-6 text-zinc-700 text-[16px]"}>
						سلام!
					</p>
					<label className={"text-zinc-700 text-[16px]"}>
						لطفا شماره موبایل یا ایمیل خود را وارد کنید
					</label>
					<input ref={input}
						className={"mt-4 caret-sky-500 text-[16px] outline-none focus:border-2 focus:border-sky-500 border border-zinc-300 rounded-lg w-full px-4 h-[56px] text-zinc-900 "}/>
					<button
						className={"h-[56px] hover:bg-rose-700 transition-all duration-300 ease-in-out rounded-lg mt-10 bg-rose-600 text-white font-bold text-[16px] w-full"}>
						ورود
					</button>
					<p className={"text-center text-zinc-500 text-[14px] mt-4 "}>
						ورود شما به معنای پذیرش
						<a className={"text-sky-500 mx-1"}>
							شرایط دیجی‌ کالا
						</a>
						و
						<a className={"text-sky-500 mx-1"}>
							قوانین حریم‌خصوصی
						</a>
						است
					</p>
				</div>

			</div>
		</>
	);
}
