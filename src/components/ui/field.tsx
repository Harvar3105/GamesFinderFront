import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

const controlBase =
  "w-full min-h-11 rounded-sm border border-transparent bg-component px-related-md font-sans text-base text-text";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export function Input({ className, ...rest }: InputProps) {
  return <input className={mergeClassNames(controlBase, className)} {...rest} />;
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...rest }: SelectProps) {
  return (
    <select
      className={mergeClassNames(
        controlBase,
        "appearance-auto transition-colors duration-150 hover:bg-component-hover",
        className,
      )}
      {...rest}
    />
  );
}

interface FieldProps {
  label: ReactNode;
  htmlFor?: string;
  labelId?: string;
  hint?: ReactNode;
  hintId?: string;
  className?: string;
  children: ReactNode;
}

export default function Field({
  label,
  htmlFor,
  labelId,
  hint,
  hintId,
  className,
  children,
}: FieldProps) {
  return (
    <div className={mergeClassNames("flex min-w-0 flex-col gap-related-xs", className)}>
      {htmlFor ? (
        <label htmlFor={htmlFor} className="typo-label">
          {label}
        </label>
      ) : (
        <span id={labelId} className="typo-label">
          {label}
        </span>
      )}
      {children}
      {hint && (
        <span id={hintId} className="typo-small">
          {hint}
        </span>
      )}
    </div>
  );
}

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label: ReactNode;
}

export function Checkbox({ label, className, ...rest }: CheckboxProps) {
  return (
    <label className={mergeClassNames("flex min-h-11 items-center gap-related-sm", className)}>
      <input type="checkbox" className="m-0 size-5 accent-primary" {...rest} />
      <span>{label}</span>
    </label>
  );
}
