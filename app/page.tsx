import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
import Image from 'next/image';
import { AboutMe } from "./components/about";
/*import { ChatMenu } from "./chat"
 import Me from '../public/me-modified.png' */

const navigation = [
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="w-screen h-screen bg-gradient-to-tl 
     from-black via-zinc-600/20 to-black
     overflow-y-auto overflow-x-hidden">
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div className="flex flex-col items-center justify-center pb-16">
        <nav className="my-16 animate-fade-in">
          <ul className="flex items-center justify-center gap-4">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm duration-500 text-zinc-400 hover:text-zinc-300 text-md"
              >
                {item.name}
              </Link>
            ))}
          </ul>
        </nav>
        <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        

        <Image src="https://res.cloudinary.com/diwrns9sr/image/upload/v1709876243/portafolio/me.png" alt="Me" className="w-[25%] md:w-[15%] mb-4 mt-2 animate-fade-in" width={'1000'} height={'1000'} />
        <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-6xl lg:text-8xl whitespace-nowrap bg-clip-text ">
          Adrian de los Reyes
        </h1>

        <h3 className="z-10 text-lg text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-2xl md:text-2xl lg:text-4xl whitespace-nowrap bg-clip-text ">
          Software Developer
        </h3>

        <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
        <AboutMe />
{/*         <div className="animate-fade-in z-10">
          <ChatMenu />
        </div> */}
      </div>
    </div>
  );

}
