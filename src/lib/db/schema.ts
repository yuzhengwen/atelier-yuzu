import {
  pgTable,
  text,
  timestamp,
  boolean,
  uuid,
  integer,
  jsonb,
  index,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// Your custom tables
export const artworks = pgTable(
  "artworks",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    title: text("title").notNull(),
    description: text("description"),
    tags: text("tags").array(),
    imagePath: text("image_path").notNull(),
    variants: jsonb("variants").notNull(),
    originalWidth: integer("original_width").notNull(),
    originalHeight: integer("original_height").notNull(),
    fileSize: integer("file_size").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    isPublic: boolean("is_public").default(true),
    likesCount: integer("likes_count").default(0),
    commentsCount: integer("comments_count").default(0),
    uploaderUserId: text("uploader_user_id").references(() => user.id),
  },
  (table) => ({
    createdAtIdx: index("artworks_created_at_idx").on(table.createdAt),
    publicIdx: index("artworks_public_idx").on(table.isPublic),
  })
);

export const likes = pgTable(
  "likes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    artworkId: uuid("artwork_id")
      .references(() => artworks.id, { onDelete: "cascade" })
      .notNull(),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
    anonymousId: text("anonymous_id"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    artworkIdx: index("likes_artwork_idx").on(table.artworkId),
    userIdx: index("likes_user_idx").on(table.userId),
    uniqueUserLike: index("unique_user_like").on(table.artworkId, table.userId),
  })
);

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  artworkId: uuid("artwork_id")
    .references(() => artworks.id, { onDelete: "cascade" })
    .notNull(),
  userId: text("user_id").references(() => user.id, { onDelete: "cascade" }),
  anonymousId: text("anonymous_id"),
  content: text("content").notNull(),
  authorName: text("author_name"),
  authorEmail: text("author_email"),
  isApproved: boolean("is_approved").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
  artworks: many(artworks),
  likes: many(likes),
  comments: many(comments),
}));

export const artworksRelations = relations(artworks, ({ one, many }) => ({
  uploader: one(user, {
    fields: [artworks.uploaderUserId],
    references: [user.id],
  }),
  likes: many(likes),
  comments: many(comments),
}));
