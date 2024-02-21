"use client"
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Page(){

  


return (
     
      <section className="max-w-full mx-auto my-[10rem]">
        <div className="max-w-full flex flex-col items-center justify-center ">
            <span className="px-[16px] py-[10px] rounded-[6px] text-white bg-blue-950">
                Working with AI
            </span>
            <h1 className="text-center font-black mt-[45px] text-blue-950 text-[45px]">All config you need is here</h1>
            <p className="text-center font-bold text-[18px] text-blue-950 opacity-[.25] ">Search for the most appropriate config for your project</p>
            <Link href= "/process" className="bg-blue-950 mt-[45px] text-white rounded-[6px] px-[65px] py-[11px] ">
                Try it out 
            </Link>
        </div>
      </section>
)
}
