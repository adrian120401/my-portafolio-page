"use client";
import { Stack } from "./stack";
import { Projects } from "./projects";
import { ButtonAnimated } from "./ButtonAnimated";
import { ExternalLink } from "lucide-react";

export const AboutMe: React.FC = () => {
  const cvRoute = "https://drive.google.com/file/d/1glD-poJKx1t_PI8Pf8cqeOG25K36UJcZ/view?usp=sharing"
  const cvRouteSpanish = "https://drive.google.com/file/d/1utKJnNkh2rbh5DKwscKywNeZWaepJWqx/view?usp=sharing"

  const about = `I'm a dynamic full-stack developer with a passion for backend development, driven by a relentless pursuit of growth. I love the challenge of creating impactful solutions that drive projects to success. My mission is to leave a lasting impression by delivering robust and efficient software solutions that elevate business performance. Constantly hungry for knowledge, I'm dedicated to honing my skills and consistently delivering exceptional results in the ever-evolving realm of software development.`

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