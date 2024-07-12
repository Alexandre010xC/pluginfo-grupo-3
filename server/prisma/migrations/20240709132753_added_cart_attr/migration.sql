-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "description" TEXT,
    "tags" TEXT,
    "image_source" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "in_cart" BOOLEAN NOT NULL DEFAULT false,
    "in_favorites" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Product" ("brand", "color", "description", "id", "image_source", "name", "price", "tags") SELECT "brand", "color", "description", "id", "image_source", "name", "price", "tags" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
