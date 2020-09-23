# Migration `20200922213822`

This migration has been generated by Albert Luganga at 9/23/2020, 12:38:22 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "Sales" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "region" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "itemType" TEXT NOT NULL,
    "salesChannel" TEXT NOT NULL,
    "orderPriority" TEXT NOT NULL,
    "orderDate" DATETIME NOT NULL,
    "orderId" INTEGER NOT NULL,
    "shipDate" DATETIME NOT NULL,
    "units" REAL NOT NULL,
    "unitPrice" REAL NOT NULL,
    "unitCost" REAL NOT NULL,
    "total" REAL NOT NULL
)

CREATE TABLE "Report" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "fileHash" TEXT NOT NULL,
    "records" INTEGER NOT NULL,
    "dateCreated" DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200922213822
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,34 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Sales {
+  id            Int      @default(autoincrement()) @id
+  region        String
+  country       String
+  itemType      String
+  salesChannel  String
+  orderPriority String
+  orderDate     DateTime
+  orderId       Int
+  shipDate      DateTime
+  units         Float
+  unitPrice     Float
+  unitCost      Float
+  total         Float
+}
+
+model Report {
+  id          Int      @default(autoincrement()) @id
+  fileHash    String
+  records     Int
+  dateCreated DateTime? @default(now())
+}
```

