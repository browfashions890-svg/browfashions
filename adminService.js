import { supabase, isSupabaseConfigured } from '../lib/supabase';

/**
 * Admin auth + product CRUD. All calls require an authenticated Supabase
 * session — Row Level Security policies on the `products` table (see
 * supabase/schema.sql) only allow INSERT/UPDATE/DELETE for authenticated
 * users, so even if someone reads this frontend code they cannot write to
 * the database without valid admin credentials.
 */

export async function signIn(email, password) {
  if (!isSupabaseConfigured()) {
    return { error: { message: 'Supabase is not configured. Add your credentials to .env first.' } };
  }
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  return { data, error };
}

export async function signOut() {
  if (!isSupabaseConfigured()) return { error: null };
  return supabase.auth.signOut();
}

export async function getSession() {
  if (!isSupabaseConfigured()) return { data: { session: null }, error: null };
  return supabase.auth.getSession();
}

export function onAuthStateChange(callback) {
  if (!isSupabaseConfigured()) return { data: { subscription: { unsubscribe() {} } } };
  return supabase.auth.onAuthStateChange((_event, session) => callback(session));
}

export async function listAllProducts() {
  if (!isSupabaseConfigured()) return { data: [], error: { message: 'Supabase not configured.' } };
  const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
  return { data: data || [], error };
}

export async function createProduct(product) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured.' } };
  const { data, error } = await supabase.from('products').insert(product).select().single();
  return { data, error };
}

export async function updateProduct(id, updates) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured.' } };
  const { data, error } = await supabase
    .from('products')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  return { data, error };
}

export async function deleteProduct(id) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured.' } };
  const { error } = await supabase.from('products').delete().eq('id', id);
  return { error };
}

/**
 * Uploads a product image to the `product-images` storage bucket under
 * products/{product_code}/{filename}, and returns its public URL.
 */
export async function uploadProductImage(productCode, file) {
  if (!isSupabaseConfigured()) return { error: { message: 'Supabase not configured.' } };
  const path = `products/${productCode}/${Date.now()}-${file.name}`;
  const { error: uploadError } = await supabase.storage.from('product-images').upload(path, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (uploadError) return { error: uploadError };

  const { data } = supabase.storage.from('product-images').getPublicUrl(path);
  return { data: { path, publicUrl: data.publicUrl }, error: null };
}
