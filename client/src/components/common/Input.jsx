export const Input = ({ label, error, className = "", ...props }) => (
  <label className="block text-sm font-semibold text-[#142235]">
    {label && <span className="mb-2 block">{label}{props.required && <span className="ml-1 text-[#b89225]">*</span>}</span>}
    <input className={`w-full rounded-lg border border-[#ded8ca] bg-white px-4 py-3 text-[#142235] outline-none transition placeholder:text-slate-400 focus:border-[#d4af37] focus:ring-2 focus:ring-[#d4af37]/20 ${className}`} {...props} />
    {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
  </label>
);
