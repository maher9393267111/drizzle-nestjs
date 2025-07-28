import type { SWRConfiguration } from 'swr';
import type { IProductItem } from 'src/types/product';

import { useMemo } from 'react';

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

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
  colors: ['Red', 'Blue'],
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

type ProductsData = {
  products: IProductItem[];
};

export function useGetProducts() {
  // const url = endpoints.product.list;

  // const { data, isLoading, error, isValidating } = useSWR<ProductsData>(url, fetcher, swrOptions);
  const isLoading = false;
  const error = null;
  const isValidating = false;
  const data = { products: _products };

  const memoizedValue = useMemo(
    () => ({
      products: data?.products || [],
      productsLoading: isLoading,
      productsError: error,
      productsValidating: isValidating,
      productsEmpty: !isLoading && !isValidating && !data?.products.length,
    }),
    [data?.products, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type ProductData = {
  product: IProductItem;
};

export function useGetProduct(productId: string) {
  // const url = productId ? [endpoints.product.details, { params: { productId } }] : '';

  // const { data, isLoading, error, isValidating } = useSWR<ProductData>(url, fetcher, swrOptions);
  const isLoading = false;
  const error = null;
  const isValidating = false;
  const data = { product: _products[0] };

  const memoizedValue = useMemo(
    () => ({
      product: data?.product,
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
    }),
    [data?.product, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type SearchResultsData = {
  results: IProductItem[];
};

export function useSearchProducts(query: string) {
  // const url = query ? [endpoints.product.search, { params: { query } }] : '';

  /*
  const { data, isLoading, error, isValidating } = useSWR<SearchResultsData>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });
  */
  const isLoading = false;
  const error = null;
  const isValidating = false;
  const data = { results: _products };

  const memoizedValue = useMemo(
    () => ({
      searchResults: data?.results || [],
      searchLoading: isLoading,
      searchError: error,
      searchValidating: isValidating,
      searchEmpty: !isLoading && !isValidating && !data?.results.length,
    }),
    [data?.results, error, isLoading, isValidating]
  );

  return memoizedValue;
}
