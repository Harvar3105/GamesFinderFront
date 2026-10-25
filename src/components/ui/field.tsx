import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

const controlBase =
  "w-full min-h-11 rounded-sm border bg-component px-related-md font-sans text-base text-text";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ invalid, className, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={mergeClassNames(
        controlBase,
        invalid ? "border-error" : "border-transparent",
        className,
      )}
      {...rest}
    />
  );
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, ...rest }: SelectProps) {
  return (
    <select
      className={mergeClassNames(
        controlBase,
        "border-transparent appearance-auto transition-colors duration-150 hover:bg-component-hover",
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
  /** Shown under the control. Wire `errorId` to the control's `aria-describedby`. */
  error?: ReactNode;
  errorId?: string;
  className?: string;
  children: ReactNode;
}

export default function Field({
  label,
  htmlFor,
  labelId,
  hint,
  hintId,
  error,
  errorId,
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
      {error && (
        <span id={errorId} className="font-sans text-sm/[1.5] font-semibold text-error">
          {error}
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
