import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HiOutlineCloudArrowUp, HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { AdminHeader } from "../components/admin/AdminHeader";
import { AdminSidebar } from "../components/admin/AdminSidebar";
import { createService, deleteService, getPublicServices, updateService } from "../services/serviceService";
import { uploadGalleryImage } from "../services/galleryService";
import { useAuth } from "../hooks/useAuth";

const emptyForm = { name: "", description: "", category: "wedding", customCategory: "", price: "", duration: "", maxGuests: "", features: "", availability: true };
const defaultCategories = ["wedding", "corporate", "festival", "adventure"];
const fieldClass = "mt-2 w-full rounded-lg border border-[#ded8ca] bg-white px-4 py-3 outline-none focus:border-[#d4af37]";
const titleCase = (value) => value.replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function AdminServices() {
  const { admin, logoutAdmin } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const customCategories = useMemo(() => [...new Set(items.map((item) => item.customCategory).filter(Boolean))].sort(), [items]);

  const loadServices = async () => {
    try { setItems(await getPublicServices()); } catch (error) { toast.error(error.message); }
  };
  useEffect(() => { loadServices(); }, []);

  const resetForm = () => { setEditingId(null); setForm(emptyForm); setFile(null); setPreview(""); };
  const updateField = ({ target }) => setForm((current) => ({ ...current, [target.name]: target.type === "checkbox" ? target.checked : target.value }));
  const chooseCategory = ({ target }) => {
    const value = target.value;
    setForm((current) => value.startsWith("custom:") ? { ...current, category: "other", customCategory: value.slice(7) } : { ...current, category: value, customCategory: "" });
  };
  const chooseImage = ({ target }) => {
    const selected = target.files?.[0];
    if (!selected) return;
    if (selected.size > 5 * 1024 * 1024) return toast.error("Image must be 5 MB or smaller");
    setFile(selected); setPreview(URL.createObjectURL(selected));
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!file && !preview) return toast.error("Choose a service image");
    if (form.category === "other" && !form.customCategory.trim()) return toast.error("Enter a custom category");
    setSubmitting(true);
    try {
      const image = file ? (await uploadGalleryImage(file)).url : preview;
      const payload = { ...form, image, customCategory: form.category === "other" ? form.customCategory.trim() : null, price: Number(form.price), duration: Number(form.duration), maxGuests: Number(form.maxGuests), features: form.features.split("\n").map((entry) => entry.trim()).filter(Boolean) };
      const item = editingId ? await updateService(editingId, payload) : await createService(payload);
      setItems((current) => editingId ? current.map((service) => service._id === editingId ? item : service) : [...current, item]);
      toast.success(editingId ? "Service updated on the website" : "Service published and ready for packages");
      resetForm();
    } catch (error) { toast.error(error.message); } finally { setSubmitting(false); }
  };
  const startEdit = (item) => {
    setEditingId(item._id); setFile(null); setPreview(item.image);
    setForm({ name: item.name, description: item.description, category: item.category, customCategory: item.customCategory || "", price: String(item.price), duration: String(item.duration), maxGuests: String(item.maxGuests), features: (item.features || []).join("\n"), availability: item.availability });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const remove = async (item) => {
    if (!window.confirm(`Delete “${item.name}”? This removes it from the public Services page too.`)) return;
    try { await deleteService(item._id); setItems((current) => current.filter((service) => service._id !== item._id)); if (editingId === item._id) resetForm(); toast.success("Service deleted from the website"); } catch (error) { toast.error(error.message); }
  };
  const selectedCategory = form.category === "other" && customCategories.includes(form.customCategory) ? `custom:${form.customCategory}` : form.category;

  return <div className="min-h-screen bg-[#faf9f6] text-[#142235]"><div className="flex min-h-screen"><AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />{sidebarOpen && <button className="fixed inset-0 z-30 bg-[#142235]/40 lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close navigation" />}<div className="min-w-0 flex-1"><AdminHeader admin={admin} onMenu={() => setSidebarOpen(true)} onLogout={async () => { await logoutAdmin(); navigate("/admin/login", { replace: true }); }} /><main className="mx-auto max-w-7xl px-5 py-8 md:px-8"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#b89225]">Service management</p><h1 className="font-display mt-2 text-4xl">Create & manage event services</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">Create each event type once. Packages can link to it, and every change here appears on the client Services page.</p><section className="mt-8 rounded-2xl border border-[#e7e1d6] bg-white p-5 shadow-sm"><div className="flex flex-wrap items-end justify-between gap-3"><div><h2 className="font-display text-2xl">Published services</h2><p className="mt-1 text-sm text-slate-500">Scroll sideways to manage every service.</p></div><span className="rounded-full bg-[#fff7df] px-3 py-1 text-xs font-bold text-[#8c6d17]">{items.length} published</span></div>{items.length ? <div className="mt-5 flex snap-x gap-5 overflow-x-auto pb-3">{items.map((item) => <article key={item._id} className="w-72 shrink-0 snap-start overflow-hidden rounded-xl border border-[#eee8dd] bg-[#fffefd]"><img src={item.image} alt={item.name} className="h-40 w-full object-cover" /><div className="p-4"><p className="text-xs font-bold uppercase tracking-[.14em] text-[#b89225]">{item.customCategory || titleCase(item.category)}</p><h3 className="font-display mt-2 text-2xl leading-tight">{item.name}</h3><p className="mt-2 text-sm text-slate-600">From ₹{Number(item.price).toLocaleString("en-IN")} · Up to {item.maxGuests} guests</p><div className="mt-4 flex gap-2"><button type="button" onClick={() => startEdit(item)} className="inline-flex flex-1 items-center justify-center gap-1 rounded-full border border-[#d4af37] px-3 py-2 text-xs font-bold uppercase tracking-wide text-[#73580f]"><HiOutlinePencilSquare /> Edit</button><button type="button" onClick={() => remove(item)} className="inline-flex items-center justify-center gap-1 rounded-full border border-red-200 px-3 py-2 text-xs font-bold uppercase tracking-wide text-red-700"><HiOutlineTrash /> Delete</button></div></div></article>)}</div> : <p className="mt-5 rounded-xl bg-[#faf9f6] p-5 text-sm text-slate-500">No services published yet. Add your first service below.</p>}</section><section className="mt-8 max-w-2xl"><form onSubmit={submit} className="rounded-2xl bg-white p-6 shadow-sm"><div className="mb-5 flex items-center justify-between gap-4"><h2 className="font-display text-3xl">{editingId ? "Edit service" : "Create a service"}</h2>{editingId && <button type="button" onClick={resetForm} className="text-sm font-semibold text-slate-600 underline">Cancel edit</button>}</div><div className="grid gap-5"><label className="grid cursor-pointer place-items-center rounded-xl border border-dashed border-[#d4af37] bg-[#fffcf2] p-5 text-center"><input className="sr-only" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={chooseImage} />{preview ? <img src={preview} alt="Selected service preview" className="h-44 w-full rounded-lg object-cover" /> : <><HiOutlineCloudArrowUp className="text-3xl text-[#8c6d17]" /><span className="mt-2 font-semibold">Choose a separate service image</span><span className="mt-1 text-xs text-slate-500">JPEG, PNG, WebP, or AVIF · maximum 5 MB</span></>}</label><label className="text-sm font-semibold">Service name<input required name="name" value={form.name} onChange={updateField} placeholder="e.g. Haldi decoration" className={fieldClass} /></label><label className="text-sm font-semibold">Description<textarea required name="description" value={form.description} onChange={updateField} rows="3" placeholder="e.g. Bright yellow floral décor, seating, backdrop and welcome details for a Haldi celebration." className={fieldClass} /></label><label className="text-sm font-semibold">Category<select value={selectedCategory} onChange={chooseCategory} className={fieldClass}><optgroup label="Standard categories">{defaultCategories.map((category) => <option key={category} value={category}>{titleCase(category)}</option>)}</optgroup>{customCategories.length > 0 && <optgroup label="Your custom categories">{customCategories.map((category) => <option key={category} value={`custom:${category}`}>{category}</option>)}</optgroup>}<option value="other">Other / new custom category</option></select></label>{form.category === "other" && <label className="text-sm font-semibold">Custom category<input required name="customCategory" value={form.customCategory} onChange={updateField} placeholder="e.g. Haldi, Birthday, Guest visit" className={fieldClass} /></label>}<div className="grid gap-4 sm:grid-cols-3"><label className="text-sm font-semibold">Starting price<input required type="number" min="0" name="price" value={form.price} onChange={updateField} placeholder="e.g. 25000" className={fieldClass} /></label><label className="text-sm font-semibold">Duration (hours)<input required type="number" min="1" name="duration" value={form.duration} onChange={updateField} placeholder="e.g. 6" className={fieldClass} /></label><label className="text-sm font-semibold">Maximum guests<input required type="number" min="1" name="maxGuests" value={form.maxGuests} onChange={updateField} placeholder="e.g. 150" className={fieldClass} /></label></div><label className="text-sm font-semibold">Included features<textarea name="features" value={form.features} onChange={updateField} rows="4" placeholder={"e.g. Floral backdrop\nGuest seating\nLighting setup\nOn-site coordinator"} className={fieldClass} /></label><label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" name="availability" checked={form.availability} onChange={updateField} /> Available for booking</label><button disabled={submitting} className="rounded-full bg-[#d4af37] px-6 py-3 text-xs font-bold uppercase tracking-[.12em] disabled:opacity-50">{submitting ? "Saving…" : editingId ? "Save service changes" : "Publish service"}</button></div></form></section></main></div></div></div>;
}
