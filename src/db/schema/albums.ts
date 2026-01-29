import { date, integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

import { artists } from './artists';

export const albums = pgTable('albums', {
  id: uuid('id').primaryKey().defaultRandom(),
  mbid: text('mbid').unique(),
  title: text('title').notNull(),
  artistId: uuid('artist_id').references(() => artists.id, { onDelete: 'set null' }),
  releaseDate: date('release_date'),
  releaseType: text('release_type'),
  coverArtUrl: text('cover_art_url'),
  totalTracks: integer('total_tracks'),
  durationMs: integer('duration_ms'),
  label: text('label'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
});

export const albumsRelations = relations(albums, ({ one }) => ({
  artist: one(artists, {
    fields: [albums.artistId],
    references: [artists.id],
  }),
}));

export type Album = typeof albums.$inferSelect;
export type NewAlbum = typeof albums.$inferInsert;
