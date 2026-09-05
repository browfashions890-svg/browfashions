// Run with: node scripts/generate-seed.mjs > supabase/seed.sql
// Converts src/data/sampleProducts.js into SQL INSERT statements so the
// same demo catalogue can be loaded straight into Supabase.
import { sampleProducts } from '../src/data/sampleProducts.js';

function sqlString(value) {
  if (value === null || value === undefined) return 'null';
  return `'${String(value).replace(/'/g, "''")}'`;
}

function sqlArray(arr) {
  if (!arr || arr.length === 0) return "'{}'";
  const escaped = arr.map((v) => `"${String(v).replace(/"/g, '\\"')}"`).join(',');
  return `'{${escaped}}'`;
}

const header = `-- =====================================================================
-- Aavaran clothing catalogue — demo seed data
-- Run AFTER schema.sql. Safe to skip or delete once you add real products.
-- Generated from src/data/sampleProducts.js — DEMO CONTENT, replace freely.
-- =====================================================================

`;

const rows = sampleProducts
  .map((p) => {
    return `insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  ${sqlString(p.product_code)}, ${sqlString(p.name)}, ${sqlString(p.slug)}, ${sqlString(p.category)},
  ${sqlString(p.subcategory)}, ${sqlString(p.description)}, ${p.price}, ${p.mrp ?? 'null'},
  ${p.discount_percentage || 0}, ${sqlArray(p.sizes)}, ${sqlArray(p.colours)}, ${sqlString(p.fabric)},
  ${sqlString(p.care_instructions)}, ${sqlString(p.main_image)}, ${sqlArray(p.additional_images)},
  ${p.is_available}, ${p.is_featured}, ${p.is_new_arrival}
) on conflict (product_code) do nothing;`;
  })
  .join('\n\n');

process.stdout.write(header + rows + '\n');
