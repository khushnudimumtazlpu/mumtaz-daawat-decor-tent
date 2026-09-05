export const Button = ({ children, variant = "gold", size = "md", className = "", ...props }) => {
  const variants = {
    gold: "bg-[#d4af37] text-[#142235] hover:bg-[#e4c860]",
    navy: "bg-[#142235] text-white hover:bg-[#223a58]",
    light: "border border-white/60 text-white hover:bg-white hover:text-[#142235]",
    outline: "border border-[#d4af37] text-[#8c6d17] hover:bg-[#d4af37] hover:text-[#142235]",
  };
  const sizes = { sm: "px-4 py-2 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-sm" };
  return <button className={`inline-flex items-center justify-center gap-2 rounded-full font-bold uppercase tracking-[0.13em] transition duration-300 disabled:opacity-60 ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
};
