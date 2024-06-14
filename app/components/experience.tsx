import { experiences } from '@/content/experiences';

export const Experience = () => {
    return (
        <div className="mt-16 animate-fade-in mx-[2rem] lg:mx-[4rem]">
            <h2 className="text-sm text-zinc-500 text-start">Experience</h2>

            <div className="flex flex-col space-y-4">
                {experiences.map((experience, index) => (
                    <div key={experience.company} className="relative mt-6 text-start">
                        <div className="absolute top-0 left-0 w-[1px] h-full bg-zinc-500" />
                        <div
                            className={`absolute top-1/2 left-0 w-3 h-3 bg-zinc-500 rounded-full transform -translate-y-1/2 -translate-x-1/2`}
                        />
                        <div className="pl-8 my-6">
                            <h3 className="text-lg text-zinc-100">{experience.title}</h3>
                            <h4 className="text-sm text-zinc-200">{experience.company}</h4>
                            <h5 className="text-sm text-zinc-200">{experience.location}</h5>
                            <p className="text-sm text-zinc-200">
                                {experience.startDate} - {experience.endDate}
                            </p>
                            {experience.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
