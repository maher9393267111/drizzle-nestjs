import type { IProductItem } from 'src/types/product';

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

const _products = Array.from({ length: 8 }).map((_, index) => ({
  id: _mock.id(index),
  sku: `SKU-${index}`,
  name: _mock.productName(index),
  code: `CODE-${index}`,
  price: _mock.number.price(index),
  taxes: 10,
  tags: ['Tag 1', 'Tag 2'],
  sizes: ['Small', 'Medium'],
  publish: 'published',
  gender: ['Men'],
  coverUrl: _mock.image.product(index),
  images: [_mock.image.product(index)],
  colors: ['#FF0000', '#0000FF'],
  quantity: 100,
  category: 'Category',
  available: 50,
  totalSold: 50,
  description: _mock.description(index),
  totalRatings: _mock.number.rating(index),
  totalReviews: _mock.number.nativeL(index),
  createdAt: _mock.time(index),
  inventoryType: 'in_stock',
  subDescription: _mock.description(index),
  priceSale: null,
  reviews: [],
  newLabel: { content: 'New', enabled: true },
  saleLabel: { content: 'Sale', enabled: false },
  ratings: [],
}));

// ----------------------------------------------------------------------

export async function getProducts() {
  return Promise.resolve({
    products: _products as IProductItem[],
  });
}

// ----------------------------------------------------------------------

export async function getProduct(id: string) {
  const product = _products.find((p) => p.id === id);

  return Promise.resolve({
    product: product as IProductItem,
  });
}
