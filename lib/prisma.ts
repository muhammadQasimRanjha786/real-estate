// import { PrismaClient } from "../app/generated/prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// const databaseUrl = new URL(process.env.DATABASE_URL!);

// const adapter = new PrismaMariaDb({
//   host: databaseUrl.hostname,
//   port: Number(databaseUrl.port || 3306),
//   user: decodeURIComponent(databaseUrl.username),
//   // password: decodeURIComponent(databaseUrl.password),
//   database: databaseUrl.pathname.replace("/", ""),
// });

// const globalForPrisma = globalThis as unknown as {
//   prisma: PrismaClient | undefined;
// };

// export const prisma =
//   globalForPrisma.prisma ??
//   new PrismaClient({
//     adapter,
//     // Yahan agar koi aur default options chahiye hon toh de sakte hain,
//     // warna adapter pass karne se error khatam ho jayega.
//   });

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

import { PrismaClient } from "../app/generated/prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

const databaseUrl = new URL(process.env.DATABASE_URL!);

const adapter = new PrismaMariaDb({
  host: databaseUrl.hostname,
  port: Number(databaseUrl.port || 3306),
  user: decodeURIComponent(databaseUrl.username),
  password: decodeURIComponent(databaseUrl.password),
  database: databaseUrl.pathname.replace("/", ""),
});

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}