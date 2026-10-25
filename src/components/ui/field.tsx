import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from "react";
import { mergeClassNames } from "@/components/helpers/mergeClassNames";

export type ControlSize = "md" | "sm";

const controlBase = "rounded-sm border bg-component px-related-md text-text";

const controlSizes: Record<ControlSize, string> = {
  md: "min-h-11 text-base",
  sm: "min-h-9 text-sm",
};

interface ControlProps {
  controlSize?: ControlSize;
  fullWidth?: boolean;
  /** Code font, for prices and IDs. */
  mono?: boolean;
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, ControlProps {
  invalid?: boolean;
}

export function Input({
  invalid,
  controlSize = "md",
  fullWidth = true,
  mono = false,
  className,
  ...rest
}: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={mergeClassNames(
        controlBase,
        controlSizes[controlSize],
        fullWidth ? "w-full" : "w-auto",
        mono ? "font-code" : "font-sans",
        invalid ? "border-error" : "border-transparent",
        className,
      )}
      {...rest}
    />
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, ControlProps {}

export function Select({
  controlSize = "md",
  fullWidth = true,
  mono = false,
  className,
  ...rest
}: SelectProps) {
  return (
    <select
      className={mergeClassNames(
        controlBase,
        controlSizes[controlSize],
        fullWidth ? "w-full" : "w-auto",
        mono ? "font-code" : "font-sans",
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
