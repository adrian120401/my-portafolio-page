
interface BadgeProps {
	text: string;
}

export const BadgeAnimated = ({text}: BadgeProps) => {
  return (
    <span className='inline-flex h-full animate-background-shine cursor-pointer items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#FFF,45%,#DDDBDB,55%,#FFF)] bg-[length:250%_100%] px-3 py-1 text-sm text-slate-950 font-medium backdrop-blur-3xl'>
      {text}
    </span>
  );
  };
  