// Edit these lists to match the categories, sizes and colours you actually
// stock. They power the catalogue filter dropdowns.

export const CATEGORIES = [
  { value: 'men', label: 'Men' },
];

export const SUBCATEGORIES_BY_CATEGORY = {
  men: ['Shirts', 'T-Shirts', 'Jeans', 'Trousers', 'Cotton Pants'],
};

export const SIZES = ['M', 'L', 'XL'];

export const COLOURS = [
  'Black', 'White', 'Navy', 'Blue', 'Maroon', 'Beige', 'Olive', 'Pink', 'Green', 'Gold', 'Grey',
];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Popular' },
];

export const PRICE_RANGES = [
  { label: 'Under ₹1,000', min: 0, max: 999 },
  { label: '₹1,000 – ₹2,000', min: 1000, max: 2000 },
  { label: '₹2,000 – ₹5,000', min: 2000, max: 5000 },
  { label: 'Above ₹5,000', min: 5000, max: null },
];
