
interface BadgeProps {
	text: string;
}

export const BadgeAnimated = ({text}: BadgeProps) => {
  return (
    <span className='inline-flex h-full cursor-default animate-background-shine items-center justify-center rounded-full border border-slate-800 bg-[linear-gradient(110deg,#F0F0F0,45%,#D4D7D0,55%,#F0F0F0)] bg-[length:250%_100%] px-3 py-1 text-sm text-slate-950 font-medium backdrop-blur-3xl'>
      {text}
    </span>
  );
  };
  