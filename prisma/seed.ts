// import { PrismaClient } from "../app/generated/prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// const databaseUrl = new URL(process.env.DATABASE_URL!);

// const adapter = new PrismaMariaDb({
//   host: databaseUrl.hostname,
//   port: Number(databaseUrl.port || 3306),
//   user: decodeURIComponent(databaseUrl.username),
//   password: decodeURIComponent(databaseUrl.password),
//   database: databaseUrl.pathname.replace("/", ""),
// });

// const prisma = new PrismaClient({ adapter });

// async function main() {
//   console.log("🌱 Seeding database...");

//   // 1. Create Amenities
//   const amenitiesList = [
//     "Parking",
//     "Security",
//     "Electricity Backup",
//     "Gas",
//     "Water",
//     "Furnished",
//     "Swimming Pool",
//     "Gym",
//   ];

//   console.log("Creating amenities...");
//   for (const name of amenitiesList) {
//     await prisma.amenity.upsert({
//       where: { name },
//       update: {},
//       create: { name },
//     });
//   }

//   // 2. Create Cities and Areas
//   const citiesData = [
//     {
//       name: "Lahore",
//       areas: ["DHA", "Bahria Town", "Gulberg", "Johar Town", "Model Town"],
//     },
//     {
//       name: "Islamabad",
//       areas: ["F-6", "F-7", "F-8", "G-11", "G-13"],
//     },
//   ];

//   console.log("Creating cities and areas...");
//   for (const cityData of citiesData) {
//     const city = await prisma.city.upsert({
//       where: { name: cityData.name },
//       update: {},
//       create: { name: cityData.name },
//     });

//     for (const areaName of cityData.areas) {
//       await prisma.area.upsert({
//         where: {
//           cityId_name: {
//             cityId: city.id,
//             name: areaName,
//           },
//         },
//         update: {},
//         create: {
//           name: areaName,
//           cityId: city.id,
//         },
//       });
//     }
//   }

//   console.log("✅ Seeding completed successfully!");
// }

// main()
//   .catch((e) => {
//     console.error("❌ Error during seeding:", e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

// import "dotenv/config";
// import { PrismaClient } from "../app/generated/prisma/client";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";

// const databaseUrl = new URL(process.env.DATABASE_URL!);

// const adapter = new PrismaMariaDb({
//   host: databaseUrl.hostname,
//   port: Number(databaseUrl.port || 3306),
//   user: decodeURIComponent(databaseUrl.username),
//   password: decodeURIComponent(databaseUrl.password),
//   database: databaseUrl.pathname.replace("/", ""),
// });

// const prisma = new PrismaClient({
//   adapter,
// });

// async function main() {
//   console.log("🌱 Starting database seed...");

//   // ─────────────────────────────────────
//   // CITIES & AREAS
//   // ─────────────────────────────────────

//   const lahore = await prisma.city.upsert({
//     where: {
//       name: "Lahore",
//     },
//     update: {},
//     create: {
//       name: "Lahore",
//       areas: {
//         create: [
//           { name: "DHA" },
//           { name: "Bahria Town" },
//           { name: "Gulberg" },
//           { name: "Johar Town" },
//           { name: "Model Town" },
//           { name: "Wapda Town" },
//         ],
//       },
//     },
//   });

//   const islamabad = await prisma.city.upsert({
//     where: {
//       name: "Islamabad",
//     },
//     update: {},
//     create: {
//       name: "Islamabad",
//       areas: {
//         create: [
//           { name: "F-6" },
//           { name: "F-7" },
//           { name: "F-8" },
//           { name: "G-11" },
//           { name: "G-13" },
//           { name: "DHA Islamabad" },
//           { name: "Bahria Town Islamabad" },
//         ],
//       },
//     },
//   });

//   console.log(
//     `✓ Cities created: ${lahore.name}, ${islamabad.name}`
//   );

//   // ─────────────────────────────────────
//   // AMENITIES
//   // ─────────────────────────────────────

//   const amenities = [
//     "Parking",
//     "Security",
//     "Electricity Backup",
//     "Gas",
//     "Water",
//     "Furnished",
//     "Swimming Pool",
//     "Gym",
//     "Elevator",
//     "Garden",
//     "Park",
//     "CCTV",
//   ];

//   for (const name of amenities) {
//     await prisma.amenity.upsert({
//       where: {
//         name,
//       },
//       update: {},
//       create: {
//         name,
//       },
//     });
//   }

//   console.log(`✓ Amenities created: ${amenities.length}`);

//   console.log("🎉 Database seed completed successfully!");
// }

// main()
//   .catch((error) => {
//     console.error("❌ Seed failed:", error);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });

import "dotenv/config";
import bcrypt from "bcryptjs";
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

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  console.log("🌱 Starting database seed...");

  // ─────────────────────────────────────
  // CITIES & AREAS
  // ─────────────────────────────────────

  const lahore = await prisma.city.upsert({
    where: {
      name: "Lahore",
    },
    update: {},
    create: {
      name: "Lahore",
      areas: {
        create: [
          { name: "DHA" },
          { name: "Bahria Town" },
          { name: "Gulberg" },
          { name: "Johar Town" },
          { name: "Model Town" },
          { name: "Wapda Town" },
        ],
      },
    },
  });

  const islamabad = await prisma.city.upsert({
    where: {
      name: "Islamabad",
    },
    update: {},
    create: {
      name: "Islamabad",
      areas: {
        create: [
          { name: "F-6" },
          { name: "F-7" },
          { name: "F-8" },
          { name: "G-11" },
          { name: "G-13" },
          { name: "DHA Islamabad" },
          { name: "Bahria Town Islamabad" },
        ],
      },
    },
  });

  console.log(
    `✓ Cities created: ${lahore.name}, ${islamabad.name}`
  );

  // ─────────────────────────────────────
  // AMENITIES
  // ─────────────────────────────────────

  const amenities = [
    "Parking",
    "Security",
    "Electricity Backup",
    "Gas",
    "Water",
    "Furnished",
    "Swimming Pool",
    "Gym",
    "Elevator",
    "Garden",
    "Park",
    "CCTV",
  ];

  for (const name of amenities) {
    await prisma.amenity.upsert({
      where: {
        name,
      },
      update: {},
      create: {
        name,
      },
    });
  }

  console.log(`✓ Amenities created: ${amenities.length}`);

  // ─────────────────────────────────────
  // ADMIN USER
  // ─────────────────────────────────────

  const hashedPassword = await bcrypt.hash(
    "Admin@12345",
    12
  );

  const admin = await prisma.user.upsert({
    where: {
      email: "admin@realestate.com",
    },
    update: {
      password: hashedPassword,
      role: "ADMIN",
    },
    create: {
      name: "Administrator",
      email: "admin@realestate.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log(`✓ Admin created: ${admin.email}`);

  // ─────────────────────────────────────
  // COMPLETE
  // ─────────────────────────────────────

  console.log("🎉 Database seed completed successfully!");
}

main()
  .catch((error) => {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });