"use client";
import { Stack } from "./stack";

export const AboutMe: React.FC = () => {
  const about = `I am a passionate full-stack 
  developer with a strong focus on backend development, 
  dedicated to my ongoing professional growth. My love for coding 
  is complemented by a fervent desire to make a significant contribution 
  to the success of every project I engage with. My goal is to create a lasting impact, 
  delivering robust and efficient solutions that drive business achievements. 
  I am always eager to learn and enhance my skills, committed to continuous development,
   and delivering exceptional results in the world of software development.`

    return (
        <div className="my-16 text-center animate-fade-in mx-[2rem] lg:mx-[8rem]">
          <h2 className="text-sm text-zinc-500 ">
            {about}
          </h2>
          <Stack />
        </div>
    );
  };