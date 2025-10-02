import Image from "next/image";
import Icon from "@/components/Icon";
import Link from "next/link";

export default function Menu(props) {
	return(
		<header className={"fixed top-0 bg-white w-full border-b border-black/12 left-0  z-999 "}>

			<div className={"container mx-auto flex items-center justify-between w-full h-[72px]"}>
				<div  className={"flex items-center flex-1"}>
					<div className={"aspect-video w-[200px] relative"}>
						<Image objectFit={"cotain"} layout={"fill"}  alt={""} src={"/logo-full.svg"}/>
					</div>
					<div className={"relative w-4/12 mr-6"}>
						<input  placeholder={"جستجو"}
						        className={"w-full h-[56px] pr-[calc(16px+16px+24px)]  bg-zinc-100 rounded-lg placeholder-zinc-500"}/>
						<Icon className={"absolute top-1/2 transform -translate-y-1/2 right-4 text-zinc-500"}>

							search
						</Icon>
					</div>
				</div>
				<button className={"border px-6 h-[40px] text-[16px] font-bold text-zinc-800 flex items-center rounded-lg border-zinc-600 "}>
					<Icon className={"ml-2"}>
						login
					</Icon>
					ورود و ثبت نام
				</button>
			</div>
			<div className={"container mx-auto flex items-center h-[56px]"}>
				<ul className={"flex flex-1 items-center"}>
					<li>
						<Link className={`relative flex items-center font-bold text-black text-[16px] px-6 h-[56px]`} href={"#"}>
							دسته بندی
							{/*<div className={"h-[1px] bg-rose-600 w-full bottom-0 right-0 absolute"}/>*/}
						</Link>
					</li>
					<li>
						<Link className={"flex items-center font-bold text-black text-[16px] px-6 h-[56px]"} href={"#"}>
							دسته بندی
						</Link>
					</li>
					<li>
						<Link className={"flex items-center font-bold text-black text-[16px] px-6 h-[56px]"} href={"#"}>
							دسته بندی
						</Link>
					</li>
					<li>
						<Link className={"flex items-center font-bold text-black text-[16px] px-6 h-[56px]"} href={"#"}>
							دسته بندی
						</Link>
					</li>
					<li>
						<Link className={"flex items-center font-bold text-black text-[16px] px-6 h-[56px]"} href={"#"}>
							دسته بندی
						</Link>
					</li>
				</ul>
				<div className={"flex items-center justify-center px-6 h-[40px] rounded-full bg-yellow-50 text-yellow-600"}>
					<Icon className={"ml-2"}>
						location_on
					</Icon>
					شهر خود را انتخاب کنید
				</div>
			</div>
		</header>
	)
}