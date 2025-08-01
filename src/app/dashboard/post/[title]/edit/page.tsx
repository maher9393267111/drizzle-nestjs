import type { Metadata } from 'next';
import type { IPostItem } from 'src/types/blog';

import { kebabCase } from 'es-toolkit';

import { CONFIG } from 'src/global-config';
import { getPost, getPosts } from 'src/actions/blog-ssr';

import { PostEditView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post edit | Dashboard - ${CONFIG.appName}` };

type Props = {
  params: Promise<{ title: string }>;
};

export default async function Page({ params }: Props) {
  const { title } = await params;

  const { post } = await getPost(title);

  return <PostEditView post={post} />;
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
  const res = await getPosts();
  const data: IPostItem[] = CONFIG.isStaticExport ? res.posts : res?.posts?.slice(0, 1);

  return data.map((post) => ({
    title: kebabCase(post.title),
  }));
}
