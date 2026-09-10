import { cva, type VariantProps } from "class-variance-authority";
import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-opacity duration-150 disabled:opacity-40 disabled:pointer-events-none active:scale-[0.98] min-h-11",
  {
    variants: {
      variant: {
        primary: "bg-pine text-surface hover:opacity-90",
        ink: "bg-ink text-surface hover:opacity-90",
        outline: "border border-line bg-surface text-ink hover:bg-pine-soft/40",
        ghost: "text-ink hover:bg-pine-soft/50",
      },
      size: {
        md: "rounded-md px-4 text-sm",
        lg: "rounded-lg px-5 text-base",
        sm: "rounded-sm px-3 text-sm min-h-9",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export function Button({
  className,
  variant,
  size,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>) {
  return <button type={type} className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export function Badge({
  children,
  tone = "default",
  className,
}: {
  children: ReactNode;
  tone?: "default" | "ok" | "warn" | "muted";
  className?: string;
}) {
  const tones = {
    default: "bg-pine-soft text-pine-deep",
    ok: "bg-pine-soft text-pine",
    warn: "bg-border text-warn",
    muted: "bg-border/60 text-muted",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={cn(
        "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink placeholder:text-subtle outline-none focus:border-pine",
        props.className,
      )}
    />
  );
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className={cn(
        "h-11 w-full rounded-md border border-line bg-surface px-3 text-sm text-ink outline-none focus:border-pine",
        props.className,
      )}
    />
  );
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        "w-full rounded-md border border-line bg-surface px-3 py-2 text-sm text-ink placeholder:text-subtle outline-none focus:border-pine",
        props.className,
      )}
    />
  );
}

export function Label({ children, htmlFor }: { children: ReactNode; htmlFor?: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-medium tracking-wide text-muted uppercase">
      {children}
    </label>
  );
}

export function Card({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-xl border border-border bg-surface shadow-card", className)}>
      {children}
    </div>
  );
}
