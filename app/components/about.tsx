"use client";
import { Stack } from "./stack";
import { Projects } from "./projects";
import { ButtonAnimated } from "./ButtonAnimated";
import { ExternalLink } from "lucide-react";

export const AboutMe: React.FC = () => {
  const cvRoute = "https://drive.google.com/file/d/1glD-poJKx1t_PI8Pf8cqeOG25K36UJcZ/view?usp=sharing"
  const cvRouteSpanish = "https://drive.google.com/file/d/1utKJnNkh2rbh5DKwscKywNeZWaepJWqx/view?usp=sharing"

  const about = `I am a passionate full-stack 
  developer with a strong focus on backend development, 
  dedicated to my ongoing professional growth. My love for coding 
  is complemented by a fervent desire to make a significant contribution 
  to the success of every project I engage with. My goal is to create a lasting impact, 
  delivering robust and efficient solutions that drive business achievements. 
  I am always eager to learn and enhance my skills, committed to continuous development,
   and delivering exceptional results in the world of software development.`

  const openPDF = (route:string) => {
    window.open(route, "_blank");
  }

  return (
      <div className="mt-16 animate-fade-in text-center mx-[2rem] lg:mx-[8rem]">
        <h2 className="text-sm text-zinc-500">
          {about}
        </h2>
        <div className="items-center mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 mx-[4rem] md:mx-[8rem] lg:mx-[10rem] xl:mx-[16rem]">
          <ButtonAnimated onClick={() => openPDF(cvRoute)}>
            <ExternalLink className="mr-1"/>
            <p>Resume</p>
          </ButtonAnimated>
          <ButtonAnimated onClick={() => openPDF(cvRouteSpanish)}>
            <ExternalLink className="mr-1"/>
            <p>Resume-Spanish</p>
          </ButtonAnimated>
        </div>
        <Projects/>
        <Stack />
      </div>
    );
  };