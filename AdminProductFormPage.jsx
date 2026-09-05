import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AdminProductForm from '../../components/AdminProductForm';
import { listAllProducts } from '../../services/adminService';

export default function AdminProductFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    if (!isEdit) return;
    listAllProducts().then(({ data }) => {
      setProduct(data.find((p) => p.id === id) || null);
      setLoading(false);
    });
  }, [id, isEdit]);

  if (loading) return <p className="text-sm text-ink-soft/60">Loading…</p>;

  return (
    <div>
      <h1 className="font-display text-2xl">{isEdit ? 'Edit Product' : 'Add Product'}</h1>
      <div className="mt-6">
        <AdminProductForm initialProduct={product} onSaved={() => navigate('/admin')} />
      </div>
    </div>
  );
}
