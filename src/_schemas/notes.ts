import {
  mysqlTable,
  serial,
  timestamp,
  varchar,
  text,
} from 'drizzle-orm/mysql-core';
import { InferModel } from 'drizzle-orm';

export const notes = mysqlTable('notes', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).default('').notNull(),
  body: text('body').default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});



export const posts2 = mysqlTable('posts2', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).default('').notNull(),
  body: text('body').default('').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().onUpdateNow().notNull(),
});




export type Note = InferModel<typeof notes>;
export type NewNote = InferModel<typeof notes, 'insert'>;


export type Post = InferModel<typeof posts2>;
export type NewPost = InferModel<typeof posts2, 'insert'>;