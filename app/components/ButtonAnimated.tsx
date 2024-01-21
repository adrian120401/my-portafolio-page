import { ReactNode } from "react";

interface ButtonProps {
	children: ReactNode;
    onClick: () => void;
}

export const ButtonAnimated = ({children, onClick}: ButtonProps) => {
    return(
        <button className='inline-flex h-12 animate-background-shine items-center
         justify-center rounded-3xl border border-slate-800 bg-[linear-gradient(110deg,rgb(0,0,0,0.1),45%,#202020,55%,rgb(0,0,0,0.1))]
          bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors' onClick={onClick}>
            {children}
        </button>
    )
}