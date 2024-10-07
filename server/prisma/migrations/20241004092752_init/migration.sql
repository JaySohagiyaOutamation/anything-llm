/*
  Warnings:

  - You are about to drop the column `docId` on the `supervisor_documents` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_supervisor_documents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "workspaceId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "supervisor_documents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "supervisor_documents_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspaces" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_supervisor_documents" ("id", "userId", "workspaceId") SELECT "id", "userId", "workspaceId" FROM "supervisor_documents";
DROP TABLE "supervisor_documents";
ALTER TABLE "new_supervisor_documents" RENAME TO "supervisor_documents";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
