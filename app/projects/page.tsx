'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { allProjects } from 'contentlayer/generated';
import { Navigation } from '../components/nav';
import { Card } from '../components/card';
import { BadgeAnimated } from '../components/BadgeAnimated';

export default function ProjectsPage() {
    const [projects, setProjects] = useState(allProjects);
    const [workProjects, setWorkProjects] = useState(false);
    const [selectedTechs, setSelectedTechs] = useState<string[]>([]);

    const TECHNOLOGIES = useMemo(
        () =>
            Array.from(
                new Set(
                    allProjects.reduce(
                        (techs, project) => (project.tags ? [...techs, ...project.tags] : techs),
                        [] as string[]
                    )
                )
            ).sort(),
        [allProjects]
    );

    const handleClick = useCallback(() => {
        setWorkProjects((prev) => !prev);
    }, []);

    const handleTechClick = useCallback((tech: string) => {
        setSelectedTechs((prevTechs) =>
            prevTechs.includes(tech) ? prevTechs.filter((t) => t !== tech) : [...prevTechs, tech]
        );
    }, []);

    useEffect(() => {
        const filterProjects = () => {
            return allProjects.filter((project) => {
                if (workProjects && !project.work) {
                    return false;
                }

                if (selectedTechs.length > 0) {
                    const projectTags = project.tags || [];
                    return selectedTechs.every((tech) => projectTags.includes(tech));
                }

                return true;
            });
        };

        setProjects(filterProjects());
    }, [workProjects, selectedTechs, allProjects]);

    projects.sort((a, b) => {
        if (a.date && b.date) {
            return a.date > b.date ? -1 : 1;
        }
        return 0;
    });

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
                    <div className="mt-4 flex items-center text-zinc-400">
                        <label className="cursor-pointer flex items-center text-zinc-400">
                            <input type="checkbox" className="mr-1" onChange={handleClick} />
                            <BadgeAnimated text="Real Work"></BadgeAnimated>
                        </label>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-x-4">
                        <p className="cursor-pointer flex items-center text-zinc-400">
                            Technologies:
                        </p>
                        {TECHNOLOGIES.map((tech) => (
                            <label
                                key={tech}
                                className="cursor-pointer flex items-center text-zinc-400"
                                onClick={() => handleTechClick(tech)}
                            >
                                <input type="checkbox" className="mr-1" />
                                <p className="text-zinc-400" onClick={(e) => e.stopPropagation()}>
                                    {tech}
                                </p>
                            </label>
                        ))}
                    </div>
                </div>
                <div className="w-full h-px bg-zinc-800" />
                <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 md:grid-cols-2">
                    {projects.map((project) => (
                        <Card key={project.slug}>
                            <Link href={`/projects/${project.slug}`}>
                                <article className="flex flex-col w-full h-full p-4 md:p-8">
                                    {project.img && (
                                        <div className="flex w-full h-[80%] max-h-56">
                                            <img
                                                src={project.img}
                                                className="rounded-lg object-cover w-full h-full"
                                            />
                                        </div>
                                    )}
                                    <div className="flex flex-col flex-grow">
                                        <div className="flex items-center justify-between gap-2 mt-2 text-zinc-100">
                                            {project.date ? (
                                                <time
                                                    dateTime={new Date(project.date).toISOString()}
                                                >
                                                    {Intl.DateTimeFormat(undefined, {
                                                        dateStyle: 'medium',
                                                    }).format(new Date(project.date))}
                                                </time>
                                            ) : (
                                                <span>SOON</span>
                                            )}

                                            <div
                                                className={`flex items-center ${
                                                    project.work ? 'visible' : 'invisible'
                                                }`}
                                            >
                                                <BadgeAnimated text="Real Work"></BadgeAnimated>
                                            </div>
                                        </div>
                                        <h2
                                            id="featured-post"
                                            className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                                        >
                                            {project.title}
                                        </h2>
                                        <div className="flex flex-col flex-grow justify-between">
                                            {project.img ? (
                                                <p className="line-clamp-2 mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                                                    {project.description}
                                                </p>
                                            ) : (
                                                <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                                                    {project.description}
                                                </p>
                                            )}
                                            <p className="text-zinc-200 hover:text-zinc-50 mt-4">
                                                Read more <span aria-hidden="true">&rarr;</span>
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </Card>
                    ))}
                </div>
                <div className="hidden w-full h-px md:block bg-zinc-800" />
            </div>
        </div>
    );
}
