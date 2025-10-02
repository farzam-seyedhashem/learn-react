export default function Input({handleEmail}) {
	return(
		<>
			<input onChange={handleEmail} placeholder={"type enything"} className={"w-[300px] text-black bg-white placeholder-yellow-800 px-6 py-5 rounded-full"}/>
		</>
	)
}