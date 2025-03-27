'use client';
import { Stack } from './stack';
import { Projects } from './projects';
import { ButtonAnimated } from './ButtonAnimated';
import { ExternalLink } from 'lucide-react';
import { Experience } from './experience';

export const AboutMe: React.FC = () => {
    const cvRoute =
        'https://drive.google.com/file/d/1ilh5UvBI0IZg7qXbUhitckZgl1Avhcba/view?usp=sharing';
    const cvRouteSpanish =
        'https://drive.google.com/file/d/1SelQ1_uiN0UZBivWV30jrgRakpQz-D4x/view?usp=sharing';

    const about = `I'm a full-stack developer with a strong focus on backend, driven by a commitment to growth and impactful solutions. My goal is to create efficient software that enhances business performance. Eager to keep learning, I strive to deliver reliable, high-quality results in every project.`;

    const openPDF = (route: string) => {
        window.open(route, '_blank');
    };

    return (
        <div className="mt-16 animate-fade-in text-center mx-[2rem] lg:mx-[8rem]">
            <div className='max-w-[620px] mx-auto'>
                <h2 className="text-zinc-200">{about}</h2>
            </div>
            <div className="items-center mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 mx-[4rem] md:mx-[8rem] lg:mx-[10rem] xl:mx-[16rem]">
                <ButtonAnimated onClick={() => openPDF(cvRoute)}>
                    <ExternalLink className="mr-1" />
                    <p>Resume</p>
                </ButtonAnimated>
                <ButtonAnimated onClick={() => openPDF(cvRouteSpanish)}>
                    <ExternalLink className="mr-1" />
                    <p>Resume-Spanish</p>
                </ButtonAnimated>
            </div>
            <Projects />
            <Experience />
            {/* <Stack /> */}
        </div>
    );
};
