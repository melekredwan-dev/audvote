import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { albums } from './albums';
import { artists } from './artists';

export const tracks = pgTable('tracks', {
  id: uuid('id').primaryKey().defaultRandom(),
  mbid: text('mbid').unique(),
  title: text('title').notNull(),
  albumId: uuid('album_id').references(() => albums.id, { onDelete: 'cascade' }),
  artistId: uuid('artist_id').references(() => artists.id, { onDelete: 'set null' }),
  trackNumber: integer('track_number'),
  discNumber: integer('disc_number').default(1),
  durationMs: integer('duration_ms'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const tracksRelations = relations(tracks, ({ one }) => ({
  album: one(albums, {
    fields: [tracks.albumId],
    references: [albums.id],
  }),
  artist: one(artists, {
    fields: [tracks.artistId],
    references: [artists.id],
  }),
}));

export type Track = typeof tracks.$inferSelect;
export type NewTrack = typeof tracks.$inferInsert;
