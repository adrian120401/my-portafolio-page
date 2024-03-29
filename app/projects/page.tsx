import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { BadgeAnimated } from "../components/BadgeAnimated";

export default async function ProjectsPage() {

  const toShow = ["pov", "trekking-app", "crazy-grow-shop", "doggys-house"]
  const featured = allProjects.filter((project) => toShow.includes(project.slug))!.sort((a, b) => toShow.indexOf(a.slug) - toShow.indexOf(b.slug));;

  const sorted = allProjects
    .filter((p) => p.published)
    .filter(
      (project) =>
        !featured.includes(project)
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 md:grid-cols-2">
          {featured.map((project) => (
              <Card key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <article className="flex flex-col w-full h-full p-4 md:p-8">
                    <div className="flex w-full h-[80%]">
                      <img src={project.img} className="rounded-lg object-cover w-full h-full"></img>
                    </div>
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
                    <p className="line-clamp-2 my-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300 pb-[22px]">
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
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
        {sorted.map((project, i) => (
          <div key={project.slug} className={`grid grid-cols-1 gap-4`}>
            <Card>
              <Article project={project}/>
            </Card>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}
