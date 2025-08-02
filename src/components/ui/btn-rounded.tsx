
type RoundButtonProps = {
    type: "button" | "submit";
    children: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onSubmit?: React.FormEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    className?: string;
  };
  
  export default function RoundedButton({
    type,
    children,
    disabled,
    onClick,
    onSubmit,
    className,
  }: RoundButtonProps) {
    return (
      <button
        type={type}
        onClick={onClick}
        onSubmit={onSubmit}
        disabled={disabled}
        className={`${
          className ? className : ""
        } text-xs text-white px-5 py-3 rounded-md  bg-white/5 opacity-75 active:bg-black/5 active:scale-105 hover:scale-110 hover:opacity-100 transition`}
      >
        {children}
      </button>
    );
  }
  