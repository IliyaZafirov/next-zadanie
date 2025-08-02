type GlassButtonProps = {
    type: "button" | "submit";
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onSubmit?: React.FormEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
  };
  
  export default function GlassButton({
    type,
    children,
    onClick,
    onSubmit,
    disabled,
    className,
  }: GlassButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={disabled}
        className={`${className} group/button relative inline-flex items-center justify-center overflow-hidden backdrop-blur-lg text-base font-semibold text-white/60 hover:text-white/90 transition-all duration-300 ease-in-out  hover:shadow-gray-600/50 border border-white/20`}
      >
        <span className="text-sm uppercase">{children}</span>
        <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-13deg)_translateX(-100%)] group-hover/button:duration-1000 group-hover/button:[transform:skew(-13deg)_translateX(100%)]">
          <div className="relative h-full w-10 bg-white/20"></div>
        </div>
      </button>
    );
  }
  