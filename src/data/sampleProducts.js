/**
 * DEMO CONTENT — sample products.
 *
 * These are used only when Supabase is not yet configured, so you can see
 * the site working immediately. Once you add your Supabase credentials to
 * .env and run supabase/schema.sql + supabase/seed.sql, real data from your
 * database takes over automatically and this file is no longer used.
 *
 * Replace every item here with your own inventory when you're ready —
 * see supabase/seed.sql for the same data in SQL form.
 */

const img = (seed) => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=800&q=60`;

let id = 1;
const nextId = () => String(id++);

const product = (overrides) => ({
  id: nextId(),
  product_code: '',
  name: '',
  slug: '',
  category: 'men',
  subcategory: '',
  description: 'DEMO product description. Replace with your real product copy.',
  price: 999,
  mrp: null,
  discount_percentage: 0,
  sizes: ['S', 'M', 'L', 'XL'],
  colours: ['Black'],
  fabric: 'Cotton blend',
  care_instructions: 'Machine wash cold. Do not bleach. Line dry in shade.',
  main_image: img('photo-1521572163474-6864f9cf17ab'),
  additional_images: [],
  is_available: true,
  is_featured: false,
  is_new_arrival: false,
  created_at: new Date().toISOString(),
  ...overrides,
});

export const sampleProducts = [
  // ---------------- MEN (10) ----------------
  product({ product_code: 'MS101', name: 'Classic Oxford Shirt', slug: 'classic-oxford-shirt-ms101', category: 'men', subcategory: 'Shirts', price: 1299, mrp: 1799, discount_percentage: 28, colours: ['White', 'Sky Blue'], main_image: img('photo-1602810318383-e386cc2a3ccf'), is_featured: true }),
  product({ product_code: 'MT102', name: 'Everyday Crew Tee', slug: 'everyday-crew-tee-mt102', category: 'men', subcategory: 'T-Shirts', price: 499, mrp: 699, discount_percentage: 29, colours: ['Charcoal', 'Olive', 'White'], main_image: img('photo-1521572163474-6864f9cf17ab'), is_new_arrival: true }),
  product({ product_code: 'MJ103', name: 'Slim Fit Stretch Jeans', slug: 'slim-fit-stretch-jeans-mj103', category: 'men', subcategory: 'Jeans', price: 1899, mrp: 2499, discount_percentage: 24, colours: ['Indigo', 'Black'], main_image: img('photo-1542272604-787c3835535d'), is_featured: true }),
  product({ product_code: 'MTR104', name: 'Formal Tapered Trousers', slug: 'formal-tapered-trousers-mtr104', category: 'men', subcategory: 'Trousers', price: 1399, colours: ['Navy', 'Grey'], main_image: img('photo-1594938298603-c8148c4dae35') }),
  product({ product_code: 'MK105', name: 'Handwoven Cotton Kurta', slug: 'handwoven-cotton-kurta-mk105', category: 'men', subcategory: 'Kurtas', price: 1599, mrp: 1999, discount_percentage: 20, fabric: 'Handwoven cotton', colours: ['Beige', 'Rust'], main_image: img('photo-1622470953794-aa9c70b0fb9d'), is_featured: true }),
  product({ product_code: 'MS106', name: 'Linen Blend Casual Shirt', slug: 'linen-blend-casual-shirt-ms106', category: 'men', subcategory: 'Shirts', price: 1099, colours: ['Sand', 'White'], fabric: 'Linen blend', main_image: img('photo-1596755094514-f87e34085b2c'), is_new_arrival: true }),
  product({ product_code: 'MT107', name: 'Graphic Print Tee', slug: 'graphic-print-tee-mt107', category: 'men', subcategory: 'T-Shirts', price: 599, colours: ['Black', 'White'], main_image: img('photo-1503341504253-dff4815485f1') }),
  product({ product_code: 'MJ108', name: 'Relaxed Fit Denim Jeans', slug: 'relaxed-fit-denim-jeans-mj108', category: 'men', subcategory: 'Jeans', price: 1799, mrp: 2199, discount_percentage: 18, colours: ['Light Blue'], main_image: img('photo-1541099649105-f69ad21f3246') }),
  product({ product_code: 'MK109', name: 'Festive Silk Blend Kurta', slug: 'festive-silk-blend-kurta-mk109', category: 'men', subcategory: 'Kurtas', price: 2199, mrp: 2799, discount_percentage: 21, fabric: 'Silk blend', colours: ['Maroon', 'Gold'], main_image: img('photo-1610189844429-e3b28c9cf8f5'), is_featured: true }),
  product({ product_code: 'MTR110', name: 'Chino Trousers', slug: 'chino-trousers-mtr110', category: 'men', subcategory: 'Trousers', price: 1249, colours: ['Khaki', 'Navy', 'Black'], main_image: img('photo-1473966968600-fa801b869a1a'), is_new_arrival: true }),

  // ---------------- WOMEN (10) ----------------
  product({ product_code: 'WS201', name: 'Banarasi Silk Saree', slug: 'banarasi-silk-saree-ws201', category: 'women', subcategory: 'Sarees', price: 4999, mrp: 6999, discount_percentage: 29, fabric: 'Silk', colours: ['Maroon', 'Emerald'], main_image: img('photo-1610030469983-98e550d6193c'), is_featured: true }),
  product({ product_code: 'WK202', name: 'Embroidered A-Line Kurti', slug: 'embroidered-a-line-kurti-wk202', category: 'women', subcategory: 'Kurtis', price: 899, mrp: 1199, discount_percentage: 25, colours: ['Mustard', 'Teal'], main_image: img('photo-1583391733956-6c78276477e2'), is_new_arrival: true }),
  product({ product_code: 'WC203', name: 'Printed Cotton Chudidar Set', slug: 'printed-cotton-chudidar-set-wc203', category: 'women', subcategory: 'Chudidars', price: 1499, colours: ['Pink', 'Blue'], fabric: 'Cotton', main_image: img('photo-1585487000160-6ebcfceb0d03') }),
  product({ product_code: 'WD204', name: 'Floral Wrap Dress', slug: 'floral-wrap-dress-wd204', category: 'women', subcategory: 'Dresses', price: 1699, mrp: 2199, discount_percentage: 23, colours: ['Floral Print'], main_image: img('photo-1595777457583-95e059d581b8'), is_featured: true }),
  product({ product_code: 'WT205', name: 'Casual Knit Top', slug: 'casual-knit-top-wt205', category: 'women', subcategory: 'Tops', price: 699, colours: ['White', 'Black', 'Blush'], main_image: img('photo-1552902865-b72c031ac5ea'), is_new_arrival: true }),
  product({ product_code: 'WS206', name: 'Kanjeevaram Silk Saree', slug: 'kanjeevaram-silk-saree-ws206', category: 'women', subcategory: 'Sarees', price: 5999, mrp: 7999, discount_percentage: 25, fabric: 'Kanjeevaram silk', colours: ['Gold', 'Peacock Blue'], main_image: img('photo-1610189020750-9e5f8f4b3f6f'), is_featured: true }),
  product({ product_code: 'WK207', name: 'Straight Cut Rayon Kurti', slug: 'straight-cut-rayon-kurti-wk207', category: 'women', subcategory: 'Kurtis', price: 799, colours: ['Rust', 'Navy'], fabric: 'Rayon', main_image: img('photo-1594633312681-425c7b97ccd1') }),
  product({ product_code: 'WC208', name: 'Anarkali Chudidar Suit', slug: 'anarkali-chudidar-suit-wc208', category: 'women', subcategory: 'Chudidars', price: 2299, mrp: 2999, discount_percentage: 23, colours: ['Wine'], main_image: img('photo-1617627143750-d86bc21e42bb') }),
  product({ product_code: 'WD209', name: 'Evening Maxi Dress', slug: 'evening-maxi-dress-wd209', category: 'women', subcategory: 'Dresses', price: 1999, colours: ['Black', 'Deep Red'], main_image: img('photo-1595515106969-1ce29566ff1c'), is_new_arrival: true }),
  product({ product_code: 'WT210', name: 'Linen Blend Shirt Top', slug: 'linen-blend-shirt-top-wt210', category: 'women', subcategory: 'Tops', price: 899, colours: ['Beige', 'White'], fabric: 'Linen blend', main_image: img('photo-1551803091-e20673f15770') }),

  // ---------------- KIDS (5) ----------------
  product({ product_code: 'KB301', name: 'Boys Printed Casual Shirt', slug: 'boys-printed-casual-shirt-kb301', category: 'kids', subcategory: 'Boys', price: 599, sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y'], colours: ['Blue', 'Green'], main_image: img('photo-1519238263530-99bdd11df2ea'), is_new_arrival: true }),
  product({ product_code: 'KG302', name: 'Girls Floral Frock', slug: 'girls-floral-frock-kg302', category: 'kids', subcategory: 'Girls', price: 799, mrp: 999, discount_percentage: 20, sizes: ['2-3Y', '4-5Y', '6-7Y'], colours: ['Pink', 'Yellow'], main_image: img('photo-1519238360530-53e00a5e5926'), is_featured: true }),
  product({ product_code: 'KE303', name: 'Kids Ethnic Kurta Pyjama Set', slug: 'kids-ethnic-kurta-pyjama-set-ke303', category: 'kids', subcategory: 'Ethnic Wear', price: 999, mrp: 1299, discount_percentage: 23, sizes: ['3-4Y', '5-6Y', '7-8Y'], colours: ['Cream', 'Maroon'], main_image: img('photo-1591382696684-3dc154c99b34'), is_featured: true }),
  product({ product_code: 'KG304', name: 'Girls Ethnic Lehenga Set', slug: 'girls-ethnic-lehenga-set-kg304', category: 'kids', subcategory: 'Ethnic Wear', price: 1499, sizes: ['4-5Y', '6-7Y', '8-9Y'], colours: ['Pink', 'Orange'], main_image: img('photo-1622290291165-d95f2cf0d4c9') }),
  product({ product_code: 'KB305', name: 'Boys Denim Jacket', slug: 'boys-denim-jacket-kb305', category: 'kids', subcategory: 'Boys', price: 899, sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'], colours: ['Blue'], main_image: img('photo-1519457851681-e9f5c9b60d1b'), is_new_arrival: true }),
];

export default sampleProducts;
