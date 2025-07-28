

import type { Metadata } from 'next';
import type { IPostItem } from 'src/types/blog';

import { kebabCase } from 'es-toolkit';

import { CONFIG } from 'src/global-config';
import { getPost, getLatestPosts, getPosts } from 'src/actions/blog-ssr';

import { PostDetailsHomeView } from 'src/sections/blog/view';

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Post details - ${CONFIG.appName}` };

type Props = {
  params: { title: string };
};

export default async function Page({ params }: Props) {

  console.log('Page params:', params);
  const { title } = params;

  const { post } = await getPost(title);
  console.log('post:', post);
  const { latestPosts } = await getLatestPosts(title);
  // if (!post) {
  //   return <div>Post not found {JSON.stringify(params)}</div>;
  // }

  return <PostDetailsHomeView post={post} latestPosts={latestPosts} />;
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
  console.log(res);
  const data: IPostItem[] = CONFIG.isStaticExport ? res.posts : res?.posts?.slice(0, 1);

  return data.map((post) => ({
    title: kebabCase(post.title),
  }));
}
