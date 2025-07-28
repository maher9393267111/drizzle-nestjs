import type { SWRConfiguration } from 'swr';
import type { IPostItem } from 'src/types/blog';
import axios, { endpoints } from 'src/lib/axios';

import { useMemo } from 'react';

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const _posts = Array.from({ length: 8 }).map((_, index) => ({
  id: _mock.id(index),
  title: _mock.postTitle(index),
  tags: ['Tag 1', 'Tag 2', 'Tag 3'],
  publish: 'published',
  content: _mock.description(index),
  coverUrl: _mock.image.cover(index),
  metaTitle: _mock.postTitle(index),
  totalViews: _mock.number.nativeL(index),
  totalShares: _mock.number.nativeL(index),
  description: _mock.description(index),
  totalComments: _mock.number.nativeL(index),
  createdAt: _mock.time(index),
  totalFavorites: _mock.number.nativeL(index),
  metaKeywords: ['Keyword 1', 'Keyword 2'],
  metaDescription: _mock.description(index),
  comments: [],
  author: {
    name: _mock.fullName(index),
    avatarUrl: _mock.image.avatar(index),
  },
  favoritePerson: [],
}));

// ----------------------------------------------------------------------

type PostsData = {
  posts: IPostItem[];
};

export function useGetPosts() {
  const url = '';

  // const { data, isLoading, error, isValidating } = useSWR<PostsData>(url, fetcher, swrOptions);
  const isLoading = false;
  const error = null;
  const isValidating = false;
  const data = { posts: _posts };

  const memoizedValue = useMemo(
    () => ({
      posts: data?.posts || [],
      postsLoading: isLoading,
      postsError: error,
      postsValidating: isValidating,
      postsEmpty: !isLoading && !data?.posts.length,
    }),
    [data?.posts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type PostData = {
  post: IPostItem;
};

export function useGetPost(title: string) {
  const url = title ? [endpoints.post.details, { params: { title } }] : '';

  // const { data, isLoading, error, isValidating } = useSWR<PostData>(url, fetcher, swrOptions);
  const isLoading = false;
  const error = null;
  const isValidating = false;
  const data = { post: _posts[0] };

  const memoizedValue = useMemo(
    () => ({
      post: data?.post,
      postLoading: isLoading,
      postError: error,
      postValidating: isValidating,
    }),
    [data?.post, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type LatestPostsData = {
  latestPosts: IPostItem[];
};

export function useGetLatestPosts(title: string) {
  const url = title ? [endpoints.post.latest, { params: { title } }] : '';

  /*
  const { data, isLoading, error, isValidating } = useSWR<LatestPostsData>(
    url,
    fetcher,
    swrOptions
  );
  */
  const isLoading = false;
  const error = null;
  const isValidating = false;
  const data = { latestPosts: _posts.slice(0, 4) };

  const memoizedValue = useMemo(
    () => ({
      latestPosts: data?.latestPosts || [],
      latestPostsLoading: isLoading,
      latestPostsError: error,
      latestPostsValidating: isValidating,
      latestPostsEmpty: !isLoading && !data?.latestPosts.length,
    }),
    [data?.latestPosts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type SearchResultsData = {
  results: IPostItem[];
};

export function useSearchPosts(query: string) {
  const url = query ? [endpoints.post.search, { params: { query } }] : '';

  /*
  const { data, isLoading, error, isValidating } = useSWR<SearchResultsData>(url, fetcher, {
    ...swrOptions,
    keepPreviousData: true,
  });
  */
  const isLoading = false;
  const error = null;
  const isValidating = false;
  const data = { results: _posts };

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
