import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';

export const artists = pgTable('artists', {
  id: uuid('id').primaryKey().defaultRandom(),
  mbid: text('mbid').unique(),
  name: text('name').notNull(),
  sortName: text('sort_name'),
  disambiguation: text('disambiguation'),
  country: text('country'),
  bio: text('bio'),
  imageUrl: text('image_url'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export type Artist = typeof artists.$inferSelect;
export type NewArtist = typeof artists.$inferInsert;
