import { useState } from 'react';
import { CATEGORIES, SUBCATEGORIES_BY_CATEGORY } from '../config/filters';
import { createProduct, updateProduct, uploadProductImage } from '../services/adminService';

const emptyProduct = {
  product_code: '',
  name: '',
  slug: '',
  category: 'men',
  subcategory: '',
  description: '',
  price: '',
  mrp: '',
  discount_percentage: 0,
  sizes: '',
  colours: '',
  fabric: '',
  care_instructions: '',
  main_image: '',
  additional_images: '',
  is_available: true,
  is_featured: false,
  is_new_arrival: false,
};

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export default function AdminProductForm({ initialProduct, onSaved }) {
  const isEdit = Boolean(initialProduct?.id);
  const [form, setForm] = useState(() => {
    if (!initialProduct) return emptyProduct;
    return {
      ...emptyProduct,
      ...initialProduct,
      sizes: (initialProduct.sizes || []).join(', '),
      colours: (initialProduct.colours || []).join(', '),
      additional_images: (initialProduct.additional_images || []).join(', '),
      price: initialProduct.price ?? '',
      mrp: initialProduct.mrp ?? '',
    };
  });
  const [colourImages, setColourImages] = useState(() => initialProduct?.colour_images || {});
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  function set(field, value) {
    setForm((prev) => {
      const next = { ...prev, [field]: value };
      if (field === 'name' && !isEdit) next.slug = slugify(`${value}-${prev.product_code || ''}`);
      return next;
    });
  }

  async function handleImageUpload(e, field) {
    const file = e.target.files?.[0];
    if (!file || !form.product_code) {
      setError('Enter a product code before uploading images.');
      return;
    }
    setUploading(true);
    setError('');
    const { data, error: uploadError } = await uploadProductImage(form.product_code, file);
    setUploading(false);
    if (uploadError) {
      setError(uploadError.message || 'Image upload failed.');
      return;
    }
    if (field === 'main_image') {
      set('main_image', data.publicUrl);
    } else {
      const existing = form.additional_images ? form.additional_images.split(',').map((s) => s.trim()).filter(Boolean) : [];
      set('additional_images', [...existing, data.publicUrl].join(', '));
    }
  }

  async function handleColourImageUpload(e, colourName) {
    const file = e.target.files?.[0];
    if (!file || !form.product_code) {
      setError('Enter a product code before uploading images.');
      return;
    }
    setUploading(true);
    setError('');
    const { data, error: uploadError } = await uploadProductImage(form.product_code, file);
    setUploading(false);
    if (uploadError) {
      setError(uploadError.message || 'Image upload failed.');
      return;
    }
    setColourImages((prev) => ({ ...prev, [colourName]: data.publicUrl }));
  }

  const colourList = form.colours.split(',').map((c) => c.trim()).filter(Boolean);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      product_code: form.product_code.trim(),
      name: form.name.trim(),
      slug: form.slug.trim() || slugify(`${form.name}-${form.product_code}`),
      category: form.category,
      subcategory: form.subcategory,
      description: form.description,
      price: Number(form.price) || 0,
      mrp: form.mrp ? Number(form.mrp) : null,
      discount_percentage: form.mrp && form.price ? Math.round((1 - Number(form.price) / Number(form.mrp)) * 100) : 0,
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
      colours: form.colours.split(',').map((s) => s.trim()).filter(Boolean),
      fabric: form.fabric,
      care_instructions: form.care_instructions,
      main_image: form.main_image,
      additional_images: form.additional_images.split(',').map((s) => s.trim()).filter(Boolean),
      // Only keep colour_images entries for colours that still exist on this product.
      colour_images: Object.fromEntries(
        Object.entries(colourImages).filter(([colour, url]) => colourList.includes(colour) && url)
      ),
      is_available: form.is_available,
      is_featured: form.is_featured,
      is_new_arrival: form.is_new_arrival,
    };

    const { error: saveError } = isEdit
      ? await updateProduct(initialProduct.id, payload)
      : await createProduct(payload);

    setSaving(false);
    if (saveError) {
      setError(saveError.message || 'Could not save product.');
      return;
    }
    onSaved?.();
  }

  const subcategoryOptions = SUBCATEGORIES_BY_CATEGORY[form.category] || [];

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 rounded-sm border border-ink/10 bg-white p-6 md:grid-cols-2">
      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Product Code *</span>
        <input required value={form.product_code} onChange={(e) => set('product_code', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
      </label>

      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Product Name *</span>
        <input required value={form.name} onChange={(e) => set('name', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
      </label>

      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">URL Slug *</span>
        <input required value={form.slug} onChange={(e) => set('slug', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
      </label>

      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Category</span>
        <select value={form.category} onChange={(e) => set('category', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm">
          {CATEGORIES.map((c) => (
            <option key={c.value} value={c.value}>{c.label}</option>
          ))}
        </select>
      </label>

      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Subcategory</span>
        <select value={form.subcategory} onChange={(e) => set('subcategory', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm">
          <option value="">Select…</option>
          {subcategoryOptions.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </label>

      <div className="grid grid-cols-2 gap-4">
        <label className="text-sm">
          <span className="mb-1 block text-xs font-medium text-ink-soft/70">Price (₹) *</span>
          <input required type="number" min="0" value={form.price} onChange={(e) => set('price', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
        </label>
        <label className="text-sm">
          <span className="mb-1 block text-xs font-medium text-ink-soft/70">MRP (₹)</span>
          <input type="number" min="0" value={form.mrp} onChange={(e) => set('mrp', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
        </label>
      </div>

      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Sizes (comma-separated)</span>
        <input value={form.sizes} onChange={(e) => set('sizes', e.target.value)} placeholder="S, M, L, XL" className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
      </label>

      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Colours (comma-separated)</span>
        <input value={form.colours} onChange={(e) => set('colours', e.target.value)} placeholder="Black, Navy" className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
      </label>

      {colourList.length > 0 && (
        <div className="text-sm md:col-span-2">
          <span className="mb-2 block text-xs font-medium text-ink-soft/70">
            Photo per colour (optional — shown when a customer selects that colour on the product page)
          </span>
          <div className="flex flex-col gap-3 rounded-sm border border-ink/10 bg-sand-50 p-3">
            {colourList.map((colour) => (
              <div key={colour} className="flex flex-wrap items-center gap-3">
                <span className="w-24 shrink-0 font-medium">{colour}</span>
                <input
                  value={colourImages[colour] || ''}
                  onChange={(e) => setColourImages((prev) => ({ ...prev, [colour]: e.target.value }))}
                  placeholder="Image URL, or upload below"
                  className="min-w-[200px] flex-1 rounded-sm border border-ink/15 px-3 py-2 text-sm"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleColourImageUpload(e, colour)}
                  disabled={uploading}
                  className="text-xs"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Fabric</span>
        <input value={form.fabric} onChange={(e) => set('fabric', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
      </label>

      <label className="text-sm">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Care Instructions</span>
        <input value={form.care_instructions} onChange={(e) => set('care_instructions', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
      </label>

      <label className="text-sm md:col-span-2">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Description</span>
        <textarea rows={3} value={form.description} onChange={(e) => set('description', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
      </label>

      <div className="text-sm md:col-span-2">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Main Image</span>
        <div className="flex items-center gap-3">
          <input value={form.main_image} onChange={(e) => set('main_image', e.target.value)} placeholder="Image URL, or upload below" className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
        </div>
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'main_image')} className="mt-2 text-xs" disabled={uploading} />
      </div>

      <div className="text-sm md:col-span-2">
        <span className="mb-1 block text-xs font-medium text-ink-soft/70">Additional Images (comma-separated URLs)</span>
        <textarea rows={2} value={form.additional_images} onChange={(e) => set('additional_images', e.target.value)} className="w-full rounded-sm border border-ink/15 px-3 py-2 text-sm" />
        <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, 'additional_images')} className="mt-2 text-xs" disabled={uploading} />
      </div>

      <div className="flex flex-wrap gap-6 md:col-span-2">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_available} onChange={(e) => set('is_available', e.target.checked)} />
          Available
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_featured} onChange={(e) => set('is_featured', e.target.checked)} />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={form.is_new_arrival} onChange={(e) => set('is_new_arrival', e.target.checked)} />
          New Arrival
        </label>
      </div>

      {error && <p className="text-sm text-rust md:col-span-2">{error}</p>}

      <div className="md:col-span-2">
        <button type="submit" disabled={saving || uploading} className="btn-primary disabled:opacity-60">
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Add Product'}
        </button>
      </div>
    </form>
  );
}
