"use client";
import { icons } from "@/public/StackIcons/Export";

export const Stack: React.FC = () => {

  const listIcons = () => {
    return Object.entries(icons).map(([key, value]) => (
      <div key={key} className="icon-container mt-6">
        <img  src={value.src} alt={key} width={60} height={60} title={key} className="icon-image"/>
        <p className="text-sm text-zinc-500 mt-1">{key}</p>
      </div>
    ))
  }
    return (
        <div className="my-16 animate-fade-in mx-[2rem] lg:mx-[4rem]">
          <h2 className="text-sm text-zinc-500 text-start">
            Tech Stack
          </h2>
          <div className="grid md:grid-cols-4 grid-cols-2 justify-items-center lg:mx-[6rem]">
            {listIcons()}
          </div>
        </div>
    );
  };