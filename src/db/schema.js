import { integer } from 'drizzle-orm/gel-core';
import { pgTable, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';


export const favoritesTable = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userID: text("user_id").notNull(),
  recipeID:integer("recipe_id").notNull(),
  title: text("title").notNull(),
  image:text("image"),
  cooketime:text("cooke_time").notNull(),
  servings: text("servings"),
  createdAt:timestamp("created_at").defaultNow(),

})