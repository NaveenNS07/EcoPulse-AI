import React from "react"
import { cn } from "../../utils/cn"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#16A34A] disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          {
            "bg-gradient-to-r from-[#16A34A] to-[#22C55E] text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 hover:from-[#15803d] hover:to-[#16A34A] border-0": variant === "default",
            "border-2 border-slate-200 bg-white/50 hover:bg-white hover:text-slate-900 hover:shadow-sm backdrop-blur-sm": variant === "outline",
            "hover:bg-slate-100/50 hover:text-slate-900": variant === "ghost",
            "bg-gradient-to-r from-red-500 to-rose-600 text-white shadow-lg shadow-red-500/25 hover:shadow-red-500/40": variant === "destructive",
            "h-11 px-6 py-2.5": size === "default",
            "h-9 rounded-lg px-4 text-xs": size === "sm",
            "h-14 rounded-2xl px-10 text-base shadow-xl": size === "lg",
            "h-11 w-11": size === "icon",
          },
          className
        )}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
