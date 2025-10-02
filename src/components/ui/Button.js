'use client'

import {useState} from "react";


export default function Button({children,className}){
	const [b,setB] = useState(false);
	return(
		<button onClick={()=>setB(!b)} className={`
        ${b?"bg-gradient-to-b from-purple-400 to-blue-500":"text-white bg-red-500"}
    
        h-[40px]
        rounded-[8px]
        font-[700]
        text-[16px]
        ${className}
        `}>

			{children}
		</button>
	)
}

