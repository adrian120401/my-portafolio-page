"use client"
import Link from "next/link";
import { Card } from "../components/card";
import { allProjects } from "contentlayer/generated";
import { BadgeAnimated } from "./BadgeAnimated";

export const Projects = () => {
    const totalProjects:number | undefined = allProjects.length
    const toShow = ["la-mision-inscription", "trekking-app", "pov", "gestion-360"]
    const featured = allProjects.filter((project) => toShow.includes(project.slug))!.sort((a, b) => toShow.indexOf(a.slug) - toShow.indexOf(b.slug));;

    return(
        <div className="mt-16 animate-fade-in mx-[2rem] lg:mx-[4rem]">
            <Link href='/projects' className="text-sm text-zinc-500 hover:underline flex">
                Projects ({totalProjects}) {' ->'}
            </Link>
            
        
            <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 md:grid-cols-2 text-start mt-6 mb-4">
            {featured.map((project) => (
                <Card key={project.slug}>
                    <Link href={`/projects/${project.slug}`}>
                    <article className="flex flex-col w-full h-full p-4 md:p-8">
                        <img src={project.img} className="rounded-lg object-cover max-h-56  w-full h-[80%]"></img>
                        <div className="flex items-center justify-between gap-2 mt-2">
                        <div className="text-xs text-zinc-100">
                            {project.date ? (
                            <time dateTime={new Date(project.date).toISOString()}>
                                {Intl.DateTimeFormat(undefined, {
                                dateStyle: "medium",
                                }).format(new Date(project.date))}
                            </time>
                            ) : (
                            <span>SOON</span>
                            )}
                        </div>
                        <div className={`flex items-center ${project.work ? 'visible' : 'invisible'}`}>
                            <BadgeAnimated text="Real Work"></BadgeAnimated>
                        </div>
                        </div>
                        <h2
                        id="featured-post"
                        className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                        >
                        {project.title}
                        </h2>
                        <p className="line-clamp-2 my-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300 pb-[25px]">
                        {project.description}
                        </p>
                        <p className="text-zinc-200 hover:text-zinc-50">
                        Read more <span aria-hidden="true">&rarr;</span>
                        </p>
                    </article>
                    </Link>
                </Card>
                ))}
            </div>

            <Link href='/projects' className="text-sm text-zinc-500 text-center hover:underline">
                View more ({totalProjects}) {' ->'}
            </Link>  
        </div>
    )
}