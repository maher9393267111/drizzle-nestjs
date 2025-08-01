import type { Metadata } from 'next';
import type { IProductItem } from 'src/types/product';

import { CONFIG } from 'src/global-config';
import { getProduct, getProducts } from 'src/actions/product-ssr';

import { ProductEditView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Product edit | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const { product } = await getProduct(id);

  return <ProductEditView product={product} />;
}

// ----------------------------------------------------------------------

/**
 * Static Exports in Next.js
 *
 * 1. Set `isStaticExport = true` in `next.config.{mjs|ts}`.
 * 2. This allows `generateStaticParams()` to pre-render dynamic routes at build time.
 *
 * For more details, see:
 * https://nextjs.org/docs/app/building-your-application/deploying/static-exports
 *
 * NOTE: Remove all "generateStaticParams()" functions if not using static exports.
 */
export async function generateStaticParams() {
  const res = await getProducts();
  const data: IProductItem[] = CONFIG.isStaticExport
    ? res.products
    : res.products.slice(0, 1);

  return data.map((product) => ({
    id: product.id,
  }));
}
