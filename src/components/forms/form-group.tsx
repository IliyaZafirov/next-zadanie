type FormGroupProps = {
    children: React.ReactNode;
    className?: React.ReactNode;
    htmlFor: string;
    elementType: "input"
    type?: string;
    min?: number;
    max?: number;
    name: string;
    value?: string;
    onChange: (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => void;
    minLength?: number;
    maxLength?: number;
    describedBy?: string;
    helperText?: React.ReactNode;
    placeholder?: string;
    required: boolean;
  };
  
  export default function FormGroup({
    children,
    className,
    htmlFor,
    elementType,
    type,
    min,
    max,
    name,
    value,
    onChange,
    describedBy,
    minLength,
    maxLength,
    helperText,
    placeholder,
    required,
  }: FormGroupProps) {
    return (
      <div className={"mb-3 flex flex-col max-w-xs text-white/45"}>
        <label htmlFor={htmlFor}>{children}</label>
  
        {elementType === "input" && (
          <input
            className={`${
              className ? className : ""
            } bg-white/5 autofill:bg-white/5 h-9 w-[320px] my-2 text-xs md:text-sm pl-2 outline-none transition focus:bg-white/15 hover:bg-white/10`}
            type={type}
            min={min}
            max={max}
            name={name}
            onChange={onChange}
            id={htmlFor}
            value={value}
            aria-describedby={describedBy}
            minLength={minLength}
            maxLength={maxLength}
            autoComplete="off"
            spellCheck={false}
            placeholder={placeholder}
            required={required}
          />
        )}
  
        <small className="text-xs text-white/25 h-8" id={describedBy}>
          {helperText}
        </small>
      </div>
    );
  }
  