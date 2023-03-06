/*
  Warnings:

  - Added the required column `amount` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "space_id" INTEGER NOT NULL,
    CONSTRAINT "Item_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "Space" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Item" ("id", "name", "space_id") SELECT "id", "name", "space_id" FROM "Item";
DROP TABLE "Item";
ALTER TABLE "new_Item" RENAME TO "Item";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
