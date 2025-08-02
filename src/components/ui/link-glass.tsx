import Link from "next/link";

type GlassLinkProps = {
    href: string;
    children: React.ReactNode;
    className?: string;
    textSize?: string;
    target?: string;
  };
  
  export default function GlassLink({
    href,
    children,
    className,
    target,
    textSize
  }: GlassLinkProps) {
    return (
      <Link
        href={href}
        className={`${className} group/button relative inline-flex items-center justify-center overflow-hidden backdrop-blur-lg text-base font-semibold text-white/60 hover:text-white/90 transition-all duration-300 ease-in-out  hover:shadow-gray-600/50 border border-white/20`}
      target={target}
      >
        <span className={`${textSize} uppercase`}>{children}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-10 bg-white/20"></div>
        </div>
      </Link>
    );
  }
  