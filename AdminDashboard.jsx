import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listAllProducts, deleteProduct, updateProduct } from '../../services/adminService';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function load() {
    setLoading(true);
    listAllProducts().then(({ data, error: err }) => {
      setProducts(data);
      setError(err);
      setLoading(false);
    });
  }

  useEffect(load, []);

  async function toggleField(product, field) {
    await updateProduct(product.id, { [field]: !product[field] });
    load();
  }

  async function handleDelete(product) {
    if (!window.confirm(`Delete "${product.name}"? This cannot be undone.`)) return;
    await deleteProduct(product.id);
    load();
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl">Products ({products.length})</h1>
        <Link to="/admin/products/new" className="btn-primary">Add Product</Link>
      </div>

      {loading && <p className="mt-8 text-sm text-ink-soft/60">Loading…</p>}
      {error && <p className="mt-8 text-sm text-rust">{error.message}</p>}

      {!loading && !error && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink-soft/60">
                <th className="py-2 pr-4">Product</th>
                <th className="py-2 pr-4">Code</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Available</th>
                <th className="py-2 pr-4">Featured</th>
                <th className="py-2 pr-4">New</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-ink/5">
                  <td className="py-2 pr-4">{p.name}</td>
                  <td className="py-2 pr-4">{p.product_code}</td>
                  <td className="py-2 pr-4">₹{Number(p.price).toLocaleString('en-IN')}</td>
                  <td className="py-2 pr-4">
                    <button onClick={() => toggleField(p, 'is_available')} className={p.is_available ? 'text-green-700' : 'text-ink-soft/40'}>
                      {p.is_available ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="py-2 pr-4">
                    <button onClick={() => toggleField(p, 'is_featured')} className={p.is_featured ? 'text-green-700' : 'text-ink-soft/40'}>
                      {p.is_featured ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="py-2 pr-4">
                    <button onClick={() => toggleField(p, 'is_new_arrival')} className={p.is_new_arrival ? 'text-green-700' : 'text-ink-soft/40'}>
                      {p.is_new_arrival ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="py-2 pr-4">
                    <div className="flex gap-3">
                      <Link to={`/admin/products/${p.id}/edit`} className="text-rust hover:underline">Edit</Link>
                      <button onClick={() => handleDelete(p)} className="text-ink-soft/60 hover:text-rust hover:underline">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-ink-soft/60">
                    No products yet — add your first one.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
