"use client";
import { icons } from "@/public/StackIcons/Export";
import Image from "next/image";

export const Stack: React.FC = () => {

  const listIcons = () => {
    return Object.entries(icons).map(([key, value]) => (
      <img key={key} src={value.src} alt={key} width={60} height={60} title={key} className="mt-9"/>
    ))
  }
    return (
        <div className="my-16 animate-fade-in mx-[2rem] lg:mx-[8rem]">
          <h2 className="text-sm text-zinc-500">
            Tech Stack
          </h2>
          <div className="grid grid-cols-4 justify-items-center lg:mx-[6rem]">
            {listIcons()}
          </div>
        </div>
    );
  };