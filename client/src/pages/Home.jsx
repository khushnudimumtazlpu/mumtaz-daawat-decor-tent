import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowRight, HiCheck } from "react-icons/hi2";
import { MainLayout } from "../layouts/MainLayout";
import { Button } from "../components/common";
import { SectionHeading } from "../components/SectionHeading";
import { services, gallery } from "../data/siteContent";

export default function Home() {
  return <MainLayout>
    <section className="relative isolate min-h-[680px] overflow-hidden bg-[#142235] text-white">
      <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-55" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=2000&q=90)" }} />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#142235] via-[#142235]/80 to-transparent" />
      <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="mx-auto flex min-h-[680px] max-w-7xl flex-col justify-center px-5 lg:px-8">
        <p className="mb-6 text-xs font-bold uppercase tracking-[.24em] text-[#d4af37]">Tentscapes with soul · Since 2009</p>
        <h1 className="font-display max-w-4xl text-5xl leading-[1.04] md:text-7xl">Gather beautifully. <em className="text-[#e4c860]">Celebrate fully.</em></h1>
        <p className="mt-7 max-w-xl text-lg leading-8 text-slate-200">Bespoke tented experiences for weddings, celebrations, and elevated corporate occasions across India.</p>
        <div className="mt-9 flex flex-wrap gap-4">
          <Link to="/login" state={{ from: "/booking" }}><Button size="lg">Start planning <HiArrowRight /></Button></Link>
          <Link to="/login" state={{ from: "/gallery" }}><Button variant="light" size="lg">Explore our work</Button></Link>
        </div>
      </motion.div>
    </section>

    <section className="mx-auto grid max-w-7xl gap-8 px-5 py-20 lg:grid-cols-[.75fr_1.25fr] lg:px-8">
      <SectionHeading align="left" eyebrow="The Aurelia way" title="Remarkable occasions feel effortless." copy="We pair refined tent architecture with detail-led hospitality, so your guests experience the magic and you can stay present for every moment." />
      <div className="grid gap-5 sm:grid-cols-3">{[["15+", "years of celebration"], ["500+", "events delivered"], ["4.9/5", "client experience"]].map(([number, label]) => <div key={label} className="border-l border-[#d4af37] pl-5"><p className="font-display text-4xl">{number}</p><p className="mt-1 text-sm text-slate-600">{label}</p></div>)}</div>
    </section>

    <section className="bg-white px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl">
      <SectionHeading eyebrow="What we create" title="A setting for every kind of joy." copy="Tailored environments that are as seamless behind the scenes as they are memorable in front of your guests." />
      <div className="grid gap-6 md:grid-cols-3">{services.map(({ icon: Icon, title, copy, image }, index) => <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} key={title} className="group overflow-hidden rounded-[1.5rem] bg-[#142235]"><img src={image} alt="" className="h-60 w-full object-cover transition duration-500 group-hover:scale-105" /><div className="p-7 text-white"><Icon className="text-3xl text-[#d4af37]" /><h3 className="font-display mt-5 text-2xl">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{copy}</p></div></motion.article>)}</div>
    </div></section>

    <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-8">
      <img className="h-[480px] w-full rounded-[1.5rem] object-cover" src={gallery[0][2]} alt="Elegant wedding celebration beneath a canopy" />
      <div><SectionHeading align="left" eyebrow="Thoughtfully managed" title="A dedicated team, from first idea to final farewell." copy="Your planning lead coordinates every operational detail while our design and hospitality teams bring your celebration to life." /><ul className="grid gap-4 text-sm text-slate-700">{["A clear, considered proposal", "Personalised design direction", "On-site event coordination"].map((item) => <li className="flex items-center gap-3" key={item}><HiCheck className="text-xl text-[#b89225]" />{item}</li>)}</ul><Link className="mt-8 inline-block" to="/about"><Button variant="outline">Meet Aurelia <HiArrowRight /></Button></Link></div>
    </section>
  </MainLayout>;
}
