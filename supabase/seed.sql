-- =====================================================================
-- Aavaran clothing catalogue — demo seed data
-- Run AFTER schema.sql. Safe to skip or delete once you add real products.
-- Generated from src/data/sampleProducts.js — DEMO CONTENT, replace freely.
-- =====================================================================

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MS101', 'Classic Oxford Shirt', 'classic-oxford-shirt-ms101', 'men',
  'Shirts', 'DEMO product description. Replace with your real product copy.', 1299, 1799,
  28, '{"S","M","L","XL"}', '{"White","Sky Blue"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=60', '{}',
  true, true, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MT102', 'Everyday Crew Tee', 'everyday-crew-tee-mt102', 'men',
  'T-Shirts', 'DEMO product description. Replace with your real product copy.', 499, 699,
  29, '{"S","M","L","XL"}', '{"Charcoal","Olive","White"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, true
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MJ103', 'Slim Fit Stretch Jeans', 'slim-fit-stretch-jeans-mj103', 'men',
  'Jeans', 'DEMO product description. Replace with your real product copy.', 1899, 2499,
  24, '{"S","M","L","XL"}', '{"Indigo","Black"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=800&q=60', '{}',
  true, true, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MTR104', 'Formal Tapered Trousers', 'formal-tapered-trousers-mtr104', 'men',
  'Trousers', 'DEMO product description. Replace with your real product copy.', 1399, null,
  0, '{"S","M","L","XL"}', '{"Navy","Grey"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MK105', 'Handwoven Cotton Kurta', 'handwoven-cotton-kurta-mk105', 'men',
  'Kurtas', 'DEMO product description. Replace with your real product copy.', 1599, 1999,
  20, '{"S","M","L","XL"}', '{"Beige","Rust"}', 'Handwoven cotton',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?auto=format&fit=crop&w=800&q=60', '{}',
  true, true, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MS106', 'Linen Blend Casual Shirt', 'linen-blend-casual-shirt-ms106', 'men',
  'Shirts', 'DEMO product description. Replace with your real product copy.', 1099, null,
  0, '{"S","M","L","XL"}', '{"Sand","White"}', 'Linen blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, true
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MT107', 'Graphic Print Tee', 'graphic-print-tee-mt107', 'men',
  'T-Shirts', 'DEMO product description. Replace with your real product copy.', 599, null,
  0, '{"S","M","L","XL"}', '{"Black","White"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MJ108', 'Relaxed Fit Denim Jeans', 'relaxed-fit-denim-jeans-mj108', 'men',
  'Jeans', 'DEMO product description. Replace with your real product copy.', 1799, 2199,
  18, '{"S","M","L","XL"}', '{"Light Blue"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MK109', 'Festive Silk Blend Kurta', 'festive-silk-blend-kurta-mk109', 'men',
  'Kurtas', 'DEMO product description. Replace with your real product copy.', 2199, 2799,
  21, '{"S","M","L","XL"}', '{"Maroon","Gold"}', 'Silk blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1610189844429-e3b28c9cf8f5?auto=format&fit=crop&w=800&q=60', '{}',
  true, true, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'MTR110', 'Chino Trousers', 'chino-trousers-mtr110', 'men',
  'Trousers', 'DEMO product description. Replace with your real product copy.', 1249, null,
  0, '{"S","M","L","XL"}', '{"Khaki","Navy","Black"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, true
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WS201', 'Banarasi Silk Saree', 'banarasi-silk-saree-ws201', 'women',
  'Sarees', 'DEMO product description. Replace with your real product copy.', 4999, 6999,
  29, '{"S","M","L","XL"}', '{"Maroon","Emerald"}', 'Silk',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=60', '{}',
  true, true, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WK202', 'Embroidered A-Line Kurti', 'embroidered-a-line-kurti-wk202', 'women',
  'Kurtis', 'DEMO product description. Replace with your real product copy.', 899, 1199,
  25, '{"S","M","L","XL"}', '{"Mustard","Teal"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, true
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WC203', 'Printed Cotton Chudidar Set', 'printed-cotton-chudidar-set-wc203', 'women',
  'Chudidars', 'DEMO product description. Replace with your real product copy.', 1499, null,
  0, '{"S","M","L","XL"}', '{"Pink","Blue"}', 'Cotton',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WD204', 'Floral Wrap Dress', 'floral-wrap-dress-wd204', 'women',
  'Dresses', 'DEMO product description. Replace with your real product copy.', 1699, 2199,
  23, '{"S","M","L","XL"}', '{"Floral Print"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=800&q=60', '{}',
  true, true, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WT205', 'Casual Knit Top', 'casual-knit-top-wt205', 'women',
  'Tops', 'DEMO product description. Replace with your real product copy.', 699, null,
  0, '{"S","M","L","XL"}', '{"White","Black","Blush"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, true
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WS206', 'Kanjeevaram Silk Saree', 'kanjeevaram-silk-saree-ws206', 'women',
  'Sarees', 'DEMO product description. Replace with your real product copy.', 5999, 7999,
  25, '{"S","M","L","XL"}', '{"Gold","Peacock Blue"}', 'Kanjeevaram silk',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1610189020750-9e5f8f4b3f6f?auto=format&fit=crop&w=800&q=60', '{}',
  true, true, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WK207', 'Straight Cut Rayon Kurti', 'straight-cut-rayon-kurti-wk207', 'women',
  'Kurtis', 'DEMO product description. Replace with your real product copy.', 799, null,
  0, '{"S","M","L","XL"}', '{"Rust","Navy"}', 'Rayon',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WC208', 'Anarkali Chudidar Suit', 'anarkali-chudidar-suit-wc208', 'women',
  'Chudidars', 'DEMO product description. Replace with your real product copy.', 2299, 2999,
  23, '{"S","M","L","XL"}', '{"Wine"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WD209', 'Evening Maxi Dress', 'evening-maxi-dress-wd209', 'women',
  'Dresses', 'DEMO product description. Replace with your real product copy.', 1999, null,
  0, '{"S","M","L","XL"}', '{"Black","Deep Red"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, true
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'WT210', 'Linen Blend Shirt Top', 'linen-blend-shirt-top-wt210', 'women',
  'Tops', 'DEMO product description. Replace with your real product copy.', 899, null,
  0, '{"S","M","L","XL"}', '{"Beige","White"}', 'Linen blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'KB301', 'Boys Printed Casual Shirt', 'boys-printed-casual-shirt-kb301', 'kids',
  'Boys', 'DEMO product description. Replace with your real product copy.', 599, null,
  0, '{"2-3Y","4-5Y","6-7Y","8-9Y"}', '{"Blue","Green"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, true
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'KG302', 'Girls Floral Frock', 'girls-floral-frock-kg302', 'kids',
  'Girls', 'DEMO product description. Replace with your real product copy.', 799, 999,
  20, '{"2-3Y","4-5Y","6-7Y"}', '{"Pink","Yellow"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1519238360530-53e00a5e5926?auto=format&fit=crop&w=800&q=60', '{}',
  true, true, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'KE303', 'Kids Ethnic Kurta Pyjama Set', 'kids-ethnic-kurta-pyjama-set-ke303', 'kids',
  'Ethnic Wear', 'DEMO product description. Replace with your real product copy.', 999, 1299,
  23, '{"3-4Y","5-6Y","7-8Y"}', '{"Cream","Maroon"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1591382696684-3dc154c99b34?auto=format&fit=crop&w=800&q=60', '{}',
  true, true, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'KG304', 'Girls Ethnic Lehenga Set', 'girls-ethnic-lehenga-set-kg304', 'kids',
  'Ethnic Wear', 'DEMO product description. Replace with your real product copy.', 1499, null,
  0, '{"4-5Y","6-7Y","8-9Y"}', '{"Pink","Orange"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1622290291165-d95f2cf0d4c9?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, false
) on conflict (product_code) do nothing;

insert into public.products (
  product_code, name, slug, category, subcategory, description, price, mrp,
  discount_percentage, sizes, colours, fabric, care_instructions, main_image,
  additional_images, is_available, is_featured, is_new_arrival
) values (
  'KB305', 'Boys Denim Jacket', 'boys-denim-jacket-kb305', 'kids',
  'Boys', 'DEMO product description. Replace with your real product copy.', 899, null,
  0, '{"4-5Y","6-7Y","8-9Y","10-11Y"}', '{"Blue"}', 'Cotton blend',
  'Machine wash cold. Do not bleach. Line dry in shade.', 'https://images.unsplash.com/photo-1519457851681-e9f5c9b60d1b?auto=format&fit=crop&w=800&q=60', '{}',
  true, false, true
) on conflict (product_code) do nothing;
