import { integer, pgTable, timestamp, unique, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { users } from './users';
import { albums } from './albums';

export const ratings = pgTable(
  'ratings',
  {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    albumId: uuid('album_id')
      .notNull()
      .references(() => albums.id, { onDelete: 'cascade' }),
    score: integer('score').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique().on(table.userId, table.albumId)]
);

export const ratingsRelations = relations(ratings, ({ one }) => ({
  user: one(users, {
    fields: [ratings.userId],
    references: [users.id],
  }),
  album: one(albums, {
    fields: [ratings.albumId],
    references: [albums.id],
  }),
}));

export type Rating = typeof ratings.$inferSelect;
export type NewRating = typeof ratings.$inferInsert;
