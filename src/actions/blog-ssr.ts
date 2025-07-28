import type { IPostItem } from 'src/types/blog';

import { kebabCase } from 'es-toolkit';

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

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

export async function getPosts() {
  return Promise.resolve({ posts: _posts as IPostItem[] });
}

// ----------------------------------------------------------------------

export async function getPost(title: string) {
  const post = _posts.find((p) => kebabCase(p.title) === title);
  return Promise.resolve({ post: post as IPostItem });
}

// ----------------------------------------------------------------------

export async function getLatestPosts(title: string) {
  const latestPosts = _posts.slice(0, 4);
  return Promise.resolve({ latestPosts: latestPosts as IPostItem[] });
}
