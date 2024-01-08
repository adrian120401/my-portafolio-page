import Link from "next/link";
import React from "react";
import Particles from "./components/particles";
/* import Me from "../public/me.jpeg"
import Image from "next/image"; */

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      <nav className="my-16 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm duration-500 text-zinc-500 hover:text-zinc-300"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
{/*       <div>
        <Image className="h-auto max-w-full rounded-full w-20" width={800} height={600} quality={80} src="/me.jpeg" alt="Me"></Image>
      </div> */}
      <h1 className="z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-6xl lg:text-8xl whitespace-nowrap bg-clip-text ">
        Adrian de los Reyes
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-16 text-center animate-fade-in mx-[2rem] lg:mx-[8rem]">
        <h2 className="text-sm text-zinc-500 ">
          I am a passionate full-stack developer with a strong focus on backend development, dedicated to my ongoing professional growth. My love for coding is complemented by a fervent desire to make a significant contribution to the success of every project I engage with
        </h2>
      </div>
    </div>
  );

}
