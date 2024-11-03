import { allProjects } from 'contentlayer/generated';

export default async function sitemap() {
    const projects = allProjects.map((project) => ({
        url: `https://adriandelosreyes.vercel.app/projects/${project.slug}`,
        lastModified: project.date,
    }));

    const routes = ['', '/projects', '/contact'].map((route) => ({
        url: `https://adriandelosreyes.vercel.app${route}`,
        lastModified: new Date().toISOString(),
    }));

    return [...routes, ...projects];
}
