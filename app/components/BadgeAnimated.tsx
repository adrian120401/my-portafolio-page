
interface BadgeProps {
	text: string;
}

export const BadgeAnimated = ({text}: BadgeProps) => {
    return (
      <span className='relative inline-block overflow-hidden rounded-full p-[1px]'>
        <span className='absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#00d4ff_0%,#009fff_50%,#00d4ff_100%)]' />
        <div className='inline-flex h-full w-full items-center justify-center rounded-full bg-slate-200 px-3 py-1 text-sm font-medium backdrop-blur-3xl'>
          {text}
        </div>
      </span>
    );
  };
  