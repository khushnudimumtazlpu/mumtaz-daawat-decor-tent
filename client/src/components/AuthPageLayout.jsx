import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

export const AuthPageLayout = ({ eyebrow, title, copy, icon: Icon, children }) => (
  <main className="grid min-h-screen place-items-center bg-[#142235] px-5 py-10">
    <section className="w-full max-w-md rounded-[1.5rem] bg-white p-8 shadow-2xl md:p-10">
      <Link to="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em] text-slate-500 hover:text-[#b89225]"><HiArrowLeft /> Back to website</Link>
      <div className="mt-10">
        <span className="inline-grid rounded-full bg-[#d4af37]/15 p-3 text-[#8c6d17]"><Icon className="text-2xl" /></span>
        <p className="mt-6 text-xs font-bold uppercase tracking-[.18em] text-[#b89225]">{eyebrow}</p>
        <h1 className="font-display mt-3 text-4xl text-[#142235]">{title}</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">{copy}</p>
      </div>
      {children}
    </section>
  </main>
);
