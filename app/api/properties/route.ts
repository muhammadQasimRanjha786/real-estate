// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getSession } from "@/lib/auth";
// import {
//   PropertyPurpose,
//   PropertyType,
//   AreaUnit,
// } from "@/app/generated/prisma/client";

// // ─────────────────────────────────────
// // GET
// // Cities / Areas / Amenities
// // ─────────────────────────────────────

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);

//     const cityId = searchParams.get("cityId");

//     // If city selected → return areas
//     if (cityId) {
//       const areas = await prisma.area.findMany({
//         where: {
//           cityId: Number(cityId),
//         },
//         orderBy: {
//           name: "asc",
//         },
//       });

//       return NextResponse.json({
//         areas,
//       });
//     }

//     // Initial page load
//     const [cities, amenities] = await Promise.all([
//       prisma.city.findMany({
//         orderBy: {
//           name: "asc",
//         },
//       }),

//       prisma.amenity.findMany({
//         orderBy: {
//           name: "asc",
//         },
//       }),
//     ]);

//     return NextResponse.json({
//       cities,
//       amenities,
//     });
//   } catch (error) {
//     console.error("GET PROPERTIES ERROR:", error);

//     return NextResponse.json(
//       {
//         error: "Failed to load property data",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// // ─────────────────────────────────────
// // POST
// // Create Property
// // ─────────────────────────────────────

// export async function POST(request: Request) {
//   try {
//     // Check authentication
//     const session = await getSession();

//     if (!session) {
//       return NextResponse.json(
//         {
//           error: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     const body = await request.json();

//     const {
//       title,
//       description,
//       purpose,
//       type,
//       price,
//       areaSize,
//       areaUnit,
//       bedrooms,
//       bathrooms,
//       floor,
//       cityId,
//       areaId,
//       featured,
//       published,
//       amenityIds,
//     } = body;

//     // ─────────────────────────────────
//     // VALIDATION
//     // ─────────────────────────────────

//     if (
//       !title ||
//       !description ||
//       !purpose ||
//       !type ||
//       price === undefined ||
//       price === null ||
//       !cityId
//     ) {
//       return NextResponse.json(
//         {
//           error:
//             "Please fill all required fields.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     // ─────────────────────────────────
//     // SLUG
//     // ─────────────────────────────────

//     const baseSlug = title
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-+|-+$/g, "");

//     const uniqueSlug = `${baseSlug}-${Date.now()}`;

//     // ─────────────────────────────────
//     // PROPERTY
//     // ─────────────────────────────────

//     const property = await prisma.property.create({
//       data: {
//         title,
//         slug: uniqueSlug,
//         description,

//         purpose: purpose as PropertyPurpose,

//         type: type as PropertyType,

//         price: Number(price),

//         areaSize:
//           areaSize !== null &&
//           areaSize !== undefined &&
//           areaSize !== ""
//             ? Number(areaSize)
//             : null,

//         areaUnit:
//           areaSize &&
//           areaUnit
//             ? (areaUnit as AreaUnit)
//             : null,

//         bedrooms:
//           bedrooms !== null &&
//           bedrooms !== undefined &&
//           bedrooms !== ""
//             ? Number(bedrooms)
//             : null,

//         bathrooms:
//           bathrooms !== null &&
//           bathrooms !== undefined &&
//           bathrooms !== ""
//             ? Number(bathrooms)
//             : null,

//         floor:
//           floor !== null &&
//           floor !== undefined &&
//           floor !== ""
//             ? Number(floor)
//             : null,

//         city: {
//           connect: {
//             id: Number(cityId),
//           },
//         },

//         ...(areaId
//           ? {
//               area: {
//                 connect: {
//                   id: Number(areaId),
//                 },
//               },
//             }
//           : {}),

//         agent: {
//           connect: {
//             id: session.userId,
//           },
//         },

//         featured: Boolean(featured),

//         published:
//           published !== false,

//         // Amenities
//         amenities: {
//           create: Array.isArray(amenityIds)
//             ? amenityIds.map(
//                 (amenityId: number) => ({
//                   amenity: {
//                     connect: {
//                       id: Number(amenityId),
//                     },
//                   },
//                 })
//               )
//             : [],
//         },
//       },

//       include: {
//         city: true,
//         area: true,
//         amenities: {
//           include: {
//             amenity: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         property,
//       },
//       {
//         status: 201,
//       }
//     );
//   } catch (error) {
//     console.error(
//       "CREATE PROPERTY ERROR:",
//       error
//     );

//     return NextResponse.json(
//       {
//         error:
//           "Failed to create property.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }


// import { NextResponse } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { getSession } from "@/lib/auth";
// import {
//   PropertyPurpose,
//   PropertyType,
//   AreaUnit,
// } from "@/app/generated/prisma/client";

// // ─────────────────────────────────────
// // GET
// // ─────────────────────────────────────

// export async function GET(request: Request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const cityId = searchParams.get("cityId");

//     // If city selected → return areas
//     if (cityId) {
//       const areas = await prisma.area.findMany({
//         where: {
//           cityId: Number(cityId),
//         },
//         orderBy: {
//           name: "asc",
//         },
//       });

//       return NextResponse.json({ areas });
//     }

//     // Load form data + properties
//     const [cities, amenities, properties] =
//       await Promise.all([
//         prisma.city.findMany({
//           orderBy: {
//             name: "asc",
//           },
//         }),

//         prisma.amenity.findMany({
//           orderBy: {
//             name: "asc",
//           },
//         }),

//         prisma.property.findMany({
//           orderBy: {
//             createdAt: "desc",
//           },
        
//           include: {
//   city: true,
//   area: true,

//   images: {
//     orderBy: {
//       sortOrder: "asc",
//     },
//   },

//   amenities: {
//     include: {
//       amenity: true,
//     },
//   },
// },
//         }),
//       ]);

//     return NextResponse.json({
//       cities,
//       amenities,
//       properties,
//     });
//   } catch (error) {
//     console.error("GET PROPERTIES ERROR:", error);

//     return NextResponse.json(
//       {
//         error: "Failed to load property data",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// // ─────────────────────────────────────
// // POST
// // CREATE PROPERTY
// // ─────────────────────────────────────

// export async function POST(request: Request) {
//   try {
//     const session = await getSession();

//     if (!session) {
//       return NextResponse.json(
//         {
//           error: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     const body = await request.json();

    
// const {
//   title,
//   description,
//   purpose,
//   type,
//   price,
//   areaSize,
//   areaUnit,
//   bedrooms,
//   bathrooms,
//   floor,
//   cityId,
//   areaId,
//   featured,
//   published,
//   amenityIds,
//   images,
// } = body;
//     // Validation
//     if (
//       !title ||
//       !description ||
//       !purpose ||
//       !type ||
//       price === undefined ||
//       price === null ||
//       !cityId
//     ) {
//       return NextResponse.json(
//         {
//           error:
//             "Please fill all required fields.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     // Slug
//     const baseSlug = title
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-+|-+$/g, "");

//     const uniqueSlug = `${baseSlug}-${Date.now()}`;

//     const property = await prisma.property.create({
//       data: {
//         title,
//         slug: uniqueSlug,
//         description,

//         purpose: purpose as PropertyPurpose,
//         type: type as PropertyType,

//         price: Number(price),

//         areaSize:
//           areaSize !== null &&
//           areaSize !== undefined &&
//           areaSize !== ""
//             ? Number(areaSize)
//             : null,

//         areaUnit:
//           areaSize && areaUnit
//             ? (areaUnit as AreaUnit)
//             : null,

//         bedrooms:
//           bedrooms !== null &&
//           bedrooms !== undefined &&
//           bedrooms !== ""
//             ? Number(bedrooms)
//             : null,

//         bathrooms:
//           bathrooms !== null &&
//           bathrooms !== undefined &&
//           bathrooms !== ""
//             ? Number(bathrooms)
//             : null,

//         floor:
//           floor !== null &&
//           floor !== undefined &&
//           floor !== ""
//             ? Number(floor)
//             : null,

//         city: {
//           connect: {
//             id: Number(cityId),
//           },
//         },

//         ...(areaId
//           ? {
//               area: {
//                 connect: {
//                   id: Number(areaId),
//                 },
//               },
//             }
//           : {}),

//         agent: {
//           connect: {
//             id: session.userId,
//           },
//         },

//         featured: Boolean(featured),
//         published: published !== false,

//         amenities: {
//           create: Array.isArray(amenityIds)
//             ? amenityIds.map(
//                 (amenityId: number) => ({
//                   amenity: {
//                     connect: {
//                       id: Number(amenityId),
//                     },
//                   },
//                 })
//               )
//             : [],
//         },
//       },

//       include: {
//         city: true,
//         area: true,
//         amenities: {
//           include: {
//             amenity: true,
//           },
//         },
//       },
//     });

//     return NextResponse.json(
//       {
//         success: true,
//         property,
//       },
//       {
//         status: 201,
//       }
//     );
//   } catch (error) {
//     console.error(
//       "CREATE PROPERTY ERROR:",
//       error
//     );

//     return NextResponse.json(
//       {
//         error: "Failed to create property.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }

// // ─────────────────────────────────────
// // DELETE PROPERTY
// // ─────────────────────────────────────

// export async function DELETE(request: Request) {
//   try {
//     const session = await getSession();

//     if (!session) {
//       return NextResponse.json(
//         {
//           error: "Unauthorized",
//         },
//         {
//           status: 401,
//         }
//       );
//     }

//     const { searchParams } =
//       new URL(request.url);

//     const id = searchParams.get("id");

//     if (!id) {
//       return NextResponse.json(
//         {
//           error: "Property ID is required.",
//         },
//         {
//           status: 400,
//         }
//       );
//     }

//     await prisma.property.delete({
//       where: {
//         id: Number(id),
//       },
//     });

//     return NextResponse.json({
//       success: true,
//     });
//   } catch (error) {
//     console.error(
//       "DELETE PROPERTY ERROR:",
//       error
//     );

//     return NextResponse.json(
//       {
//         error: "Failed to delete property.",
//       },
//       {
//         status: 500,
//       }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

import {
  PropertyPurpose,
  PropertyType,
  AreaUnit,
} from "@/app/generated/prisma/client";

// =====================================================
// GET
// =====================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cityId = searchParams.get("cityId");

    // -----------------------------------------------
    // GET AREAS BY CITY
    // -----------------------------------------------

    if (cityId) {
      const areas = await prisma.area.findMany({
        where: {
          cityId: Number(cityId),
        },
        orderBy: {
          name: "asc",
        },
      });

      return NextResponse.json({
        areas,
      });
    }

    // -----------------------------------------------
    // GET ALL DATA
    // -----------------------------------------------

    const [cities, amenities, properties] =
      await Promise.all([
        prisma.city.findMany({
          orderBy: {
            name: "asc",
          },
        }),

        prisma.amenity.findMany({
          orderBy: {
            name: "asc",
          },
        }),

        prisma.property.findMany({
          orderBy: {
            createdAt: "desc",
          },

          include: {
            city: true,
            area: true,

            images: {
              orderBy: {
                sortOrder: "asc",
              },
            },

            amenities: {
              include: {
                amenity: true,
              },
            },
          },
        }),
      ]);

    return NextResponse.json({
      cities,
      amenities,
      properties,
    });
  } catch (error) {
    console.error("GET PROPERTIES ERROR:", error);

    return NextResponse.json(
      {
        error: "Failed to load property data.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// POST
// CREATE PROPERTY
// =====================================================

export async function POST(request: Request) {
  try {
    // -----------------------------------------------
    // AUTH
    // -----------------------------------------------

    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    // -----------------------------------------------
    // BODY
    // -----------------------------------------------

    const body = await request.json();

    const {
      title,
      description,
      purpose,
      type,
      price,
      areaSize,
      areaUnit,
      bedrooms,
      bathrooms,
      floor,
      cityId,
      areaId,
      featured,
      published,
      amenityIds,
      images,
    } = body;

    console.log("CREATE PROPERTY");
    console.log("Images received:", images);

    // -----------------------------------------------
    // VALIDATION
    // -----------------------------------------------

    if (
      !title ||
      !description ||
      !purpose ||
      !type ||
      price === undefined ||
      price === null ||
      !cityId
    ) {
      return NextResponse.json(
        {
          error: "Please fill all required fields.",
        },
        {
          status: 400,
        }
      );
    }

    // -----------------------------------------------
    // CLEAN IMAGE URLS
    // -----------------------------------------------

    const imageUrls: string[] = Array.isArray(images)
      ? images
          .filter(
            (url: unknown): url is string =>
              typeof url === "string" &&
              url.trim().length > 0
          )
          .map((url: string) => url.trim())
      : [];

    console.log("Clean image URLs:", imageUrls);

    // -----------------------------------------------
    // SLUG
    // -----------------------------------------------

    const baseSlug = title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const uniqueSlug = `${baseSlug}-${Date.now()}`;

    // -----------------------------------------------
    // CREATE PROPERTY
    // -----------------------------------------------

    const property = await prisma.property.create({
      data: {
        title,
        slug: uniqueSlug,
        description,

        purpose: purpose as PropertyPurpose,
        type: type as PropertyType,

        price: Number(price),

        // -------------------------------------------
        // SIZE
        // -------------------------------------------

        areaSize:
          areaSize !== null &&
          areaSize !== undefined &&
          areaSize !== ""
            ? Number(areaSize)
            : null,

        areaUnit:
          areaSize &&
          areaUnit
            ? (areaUnit as AreaUnit)
            : null,

        // -------------------------------------------
        // BEDROOMS
        // -------------------------------------------

        bedrooms:
          bedrooms !== null &&
          bedrooms !== undefined &&
          bedrooms !== ""
            ? Number(bedrooms)
            : null,

        // -------------------------------------------
        // BATHROOMS
        // -------------------------------------------

        bathrooms:
          bathrooms !== null &&
          bathrooms !== undefined &&
          bathrooms !== ""
            ? Number(bathrooms)
            : null,

        // -------------------------------------------
        // FLOOR
        // -------------------------------------------

        floor:
          floor !== null &&
          floor !== undefined &&
          floor !== ""
            ? Number(floor)
            : null,

        // -------------------------------------------
        // CITY
        // -------------------------------------------

        city: {
          connect: {
            id: Number(cityId),
          },
        },

        // -------------------------------------------
        // AREA
        // -------------------------------------------

        ...(areaId
          ? {
              area: {
                connect: {
                  id: Number(areaId),
                },
              },
            }
          : {}),

        // -------------------------------------------
        // AGENT
        // -------------------------------------------

        agent: {
          connect: {
            id: Number(session.userId),
          },
        },

        // -------------------------------------------
        // WEBSITE
        // -------------------------------------------

        featured: Boolean(featured),

        published: published !== false,

        // -------------------------------------------
        // AMENITIES
        // -------------------------------------------

        amenities: {
          create: Array.isArray(amenityIds)
            ? amenityIds.map((amenityId: number) => ({
                amenity: {
                  connect: {
                    id: Number(amenityId),
                  },
                },
              }))
            : [],
        },

        // -------------------------------------------
        // IMAGES
        // -------------------------------------------

        images: {
          create: imageUrls.map(
            (imageUrl: string, index: number) => ({
              imageUrl,

              isPrimary: index === 0,

              sortOrder: index,
            })
          ),
        },
      },

      // ---------------------------------------------
      // RETURN COMPLETE PROPERTY
      // ---------------------------------------------

      include: {
        city: true,
        area: true,

        images: {
          orderBy: {
            sortOrder: "asc",
          },
        },

        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    console.log(
      `✓ Property created: ${property.id}`
    );

    console.log(
      `✓ Images saved: ${property.images.length}`
    );

    // -----------------------------------------------
    // RESPONSE
    // -----------------------------------------------

    return NextResponse.json(
      {
        success: true,
        property,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "CREATE PROPERTY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to create property.",
      },
      {
        status: 500,
      }
    );
  }
}

// =====================================================
// DELETE
// =====================================================

export async function DELETE(request: Request) {
  try {
    const session = await getSession();

    if (!session) {
      return NextResponse.json(
        {
          error: "Unauthorized.",
        },
        {
          status: 401,
        }
      );
    }

    const { searchParams } =
      new URL(request.url);

    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          error: "Property ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    await prisma.property.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "DELETE PROPERTY ERROR:",
      error
    );

    return NextResponse.json(
      {
        error: "Failed to delete property.",
      },
      {
        status: 500,
      }
    );
  }
}