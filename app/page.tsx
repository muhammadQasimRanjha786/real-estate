// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert h-5 w-[100px]"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the{" "}
//             <code className="rounded bg-black/[.06] px-1.5 py-0.5 font-mono text-[0.9em] dark:bg-white/[.08]">
//               page.tsx
//             </code>{" "}
//             file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert h-[14px] w-4"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={14}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }


// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// type Property = {
//   id: number;
//   title: string;
//   slug: string;

//   purpose: "SALE" | "RENT";

//   type:
//     | "HOUSE"
//     | "FLAT"
//     | "PLOT"
//     | "COMMERCIAL";

//   status:
//     | "AVAILABLE"
//     | "SOLD"
//     | "RENTED";

//   price: string;

//   areaSize: string | null;
//   areaUnit: string | null;

//   bedrooms: number | null;
//   bathrooms: number | null;

//   featured: boolean;
//   published: boolean;

//   city: {
//     name: string;
//   };

//   area: {
//     name: string;
//   } | null;
// };

// type City = {
//   id: number;
//   name: string;
// };

// export default function Home() {
//   const [properties, setProperties] = useState<Property[]>([]);
//   const [cities, setCities] = useState<City[]>([]);
//   const [loading, setLoading] = useState(true);

//   const [purpose, setPurpose] = useState("");
//   const [type, setType] = useState("");
//   const [cityId, setCityId] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");

//   async function loadProperties() {
//     try {
//       setLoading(true);

//       const response = await fetch(
//         "/api/properties",
//         {
//           cache: "no-store",
//         }
//       );

//       const data = await response.json();

//       setProperties(
//         data.properties || []
//       );

//       setCities(data.cities || []);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   useEffect(() => {
//     loadProperties();
//   }, []);

//   function formatPrice(price: string) {
//     const value = Number(price);

//     if (value >= 10000000) {
//       return `PKR ${(value / 10000000).toFixed(
//         2
//       )} Cr`;
//     }

//     if (value >= 100000) {
//       return `PKR ${(value / 100000).toFixed(
//         2
//       )} Lac`;
//     }

//     return `PKR ${value.toLocaleString()}`;
//   }

//   const filteredProperties =
//     properties.filter((property) => {
//       if (
//         purpose &&
//         property.purpose !== purpose
//       ) {
//         return false;
//       }

//       if (
//         type &&
//         property.type !== type
//       ) {
//         return false;
//       }

//       if (
//         cityId &&
//         property.city.name !==
//           cities.find(
//             (city) =>
//               city.id === Number(cityId)
//           )?.name
//       ) {
//         return false;
//       }

//       if (
//         maxPrice &&
//         Number(property.price) >
//           Number(maxPrice)
//       ) {
//         return false;
//       }

//       return (
//         property.published &&
//         property.status ===
//           "AVAILABLE"
//       );
//     });

//   return (
//     <main className="min-h-screen bg-white">
//       {/* NAVBAR */}

//       <nav className="border-b bg-white">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
//           <Link
//             href="/"
//             className="text-2xl font-bold tracking-tight"
//           >
//             REAL<span className="text-gray-400">ESTATE</span>
//           </Link>

//           <div className="flex items-center gap-6">
//             <a
//               href="#properties"
//               className="text-sm font-medium hover:text-gray-500"
//             >
//               Properties
//             </a>

//             <a
//               href="#contact"
//               className="text-sm font-medium hover:text-gray-500"
//             >
//               Contact
//             </a>

//             <Link
//               href="/admin"
//               className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium"
//             >
//               Admin
//             </Link>
//           </div>
//         </div>
//       </nav>

//       {/* HERO */}

//       <section className="bg-gray-100">
//         <div className="max-w-7xl mx-auto px-6 py-24">
//           <div className="max-w-3xl">
//             <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
//               Find your next property
//             </p>

//             <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-4 leading-tight">
//               Find a place
//               <br />
//               you can call home.
//             </h1>

//             <p className="text-lg text-gray-600 mt-6 max-w-xl">
//               Explore premium houses, flats,
//               plots and commercial properties
//               across Lahore and Islamabad.
//             </p>
//           </div>

//           {/* SEARCH BOX */}

//           <div className="bg-white rounded-2xl shadow-xl mt-12 p-5">
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//               {/* PURPOSE */}

//               <select
//                 value={purpose}
//                 onChange={(e) =>
//                   setPurpose(e.target.value)
//                 }
//                 className="border rounded-xl px-4 py-3"
//               >
//                 <option value="">
//                   Buy or Rent
//                 </option>

//                 <option value="SALE">
//                   For Sale
//                 </option>

//                 <option value="RENT">
//                   For Rent
//                 </option>
//               </select>

//               {/* CITY */}

//               <select
//                 value={cityId}
//                 onChange={(e) =>
//                   setCityId(e.target.value)
//                 }
//                 className="border rounded-xl px-4 py-3"
//               >
//                 <option value="">
//                   Select City
//                 </option>

//                 {cities.map((city) => (
//                   <option
//                     key={city.id}
//                     value={city.id}
//                   >
//                     {city.name}
//                   </option>
//                 ))}
//               </select>

//               {/* TYPE */}

//               <select
//                 value={type}
//                 onChange={(e) =>
//                   setType(e.target.value)
//                 }
//                 className="border rounded-xl px-4 py-3"
//               >
//                 <option value="">
//                   Property Type
//                 </option>

//                 <option value="HOUSE">
//                   House
//                 </option>

//                 <option value="FLAT">
//                   Flat
//                 </option>

//                 <option value="PLOT">
//                   Plot
//                 </option>

//                 <option value="COMMERCIAL">
//                   Commercial
//                 </option>
//               </select>

//               {/* PRICE */}

//               <select
//                 value={maxPrice}
//                 onChange={(e) =>
//                   setMaxPrice(e.target.value)
//                 }
//                 className="border rounded-xl px-4 py-3"
//               >
//                 <option value="">
//                   Maximum Price
//                 </option>

//                 <option value="5000000">
//                   50 Lac
//                 </option>

//                 <option value="10000000">
//                   1 Crore
//                 </option>

//                 <option value="25000000">
//                   2.5 Crore
//                 </option>

//                 <option value="50000000">
//                   5 Crore
//                 </option>

//                 <option value="100000000">
//                   10 Crore
//                 </option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* PROPERTIES */}

//       <section
//         id="properties"
//         className="max-w-7xl mx-auto px-6 py-20"
//       >
//         <div className="flex items-end justify-between mb-8">
//           <div>
//             <p className="text-sm text-gray-500">
//               PROPERTY COLLECTION
//             </p>

//             <h2 className="text-3xl font-bold mt-2">
//               Available Properties
//             </h2>
//           </div>

//           <p className="text-gray-500">
//             {filteredProperties.length}{" "}
//             properties
//           </p>
//         </div>

//         {loading ? (
//           <div className="py-20 text-center text-gray-500">
//             Loading properties...
//           </div>
//         ) : filteredProperties.length ===
//           0 ? (
//           <div className="border rounded-2xl py-20 text-center">
//             <div className="text-5xl">
//               🏠
//             </div>

//             <h3 className="text-xl font-semibold mt-4">
//               No properties found
//             </h3>

//             <p className="text-gray-500 mt-2">
//               Try changing your search
//               filters.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {filteredProperties.map(
//               (property) => (
//                 <Link
//                   href={`/properties/${property.slug}`}
//                   key={property.id}
//                   className="group border rounded-2xl overflow-hidden hover:shadow-xl transition"
//                 >
//                   {/* IMAGE PLACEHOLDER */}

//                   <div className="h-56 bg-gray-200 flex items-center justify-center">
//                     <span className="text-gray-400 text-5xl">
//                       🏠
//                     </span>
//                   </div>

//                   <div className="p-5">
//                     <div className="flex items-center justify-between">
//                       <span className="text-xs font-semibold uppercase bg-gray-100 px-3 py-1 rounded-full">
//                         {property.purpose ===
//                         "SALE"
//                           ? "For Sale"
//                           : "For Rent"}
//                       </span>

//                       {property.featured && (
//                         <span className="text-xs font-semibold text-yellow-700">
//                           Featured
//                         </span>
//                       )}
//                     </div>

//                     <h3 className="text-xl font-semibold mt-4 group-hover:underline">
//                       {property.title}
//                     </h3>

//                     <p className="text-gray-500 mt-2">
//                       {property.area
//                         ? `${property.area.name}, `
//                         : ""}
//                       {property.city.name}
//                     </p>

//                     <p className="text-xl font-bold mt-4">
//                       {formatPrice(
//                         property.price
//                       )}
//                     </p>

//                     <div className="flex gap-5 mt-4 text-sm text-gray-500">
//                       {property.areaSize && (
//                         <span>
//                           {property.areaSize}{" "}
//                           {property.areaUnit}
//                         </span>
//                       )}

//                       {property.bedrooms !==
//                         null && (
//                         <span>
//                           🛏{" "}
//                           {property.bedrooms}
//                         </span>
//                       )}

//                       {property.bathrooms !==
//                         null && (
//                         <span>
//                           🚿{" "}
//                           {property.bathrooms}
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </Link>
//               )
//             )}
//           </div>
//         )}
//       </section>

//       {/* CTA */}

//       <section
//         id="contact"
//         className="bg-black text-white"
//       >
//         <div className="max-w-7xl mx-auto px-6 py-20 text-center">
//           <h2 className="text-4xl font-bold">
//             Looking for something specific?
//           </h2>

//           <p className="text-gray-400 mt-4">
//             Talk to our property experts and
//             find the right property for you.
//           </p>

//           <a
//             href="tel:+923000000000"
//             className="inline-block bg-white text-black px-7 py-3 rounded-xl mt-8 font-semibold"
//           >
//             Contact Us
//           </a>
//         </div>
//       </section>

//       {/* FOOTER */}

//       <footer className="bg-black text-gray-500 border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between">
//           <p>
//             © 2026 Real Estate. All rights
//             reserved.
//           </p>

//           <Link
//             href="/admin"
//             className="hover:text-white"
//           >
//             Admin
//           </Link>
//         </div>
//       </footer>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Property = {
  id: number;
  title: string;
  slug: string;

  purpose: "SALE" | "RENT";

  type:
    | "HOUSE"
    | "FLAT"
    | "PLOT"
    | "COMMERCIAL";

  status:
    | "AVAILABLE"
    | "SOLD"
    | "RENTED";

  price: string;

  areaSize: string | null;
  areaUnit: string | null;

  bedrooms: number | null;
  bathrooms: number | null;

  featured: boolean;
  published: boolean;

  city: {
    name: string;
  };

  area: {
    name: string;
  } | null;

  // Yahan images add kar di gayi hain
  images: {
    imageUrl: string;
  }[];
};

type City = {
  id: number;
  name: string;
};

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  const [purpose, setPurpose] = useState("");
  const [type, setType] = useState("");
  const [cityId, setCityId] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  async function loadProperties() {
    try {
      setLoading(true);

      const response = await fetch(
        "/api/properties",
        {
          cache: "no-store",
        }
      );

      const data = await response.json();

      setProperties(
        data.properties || []
      );

      setCities(data.cities || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  function formatPrice(price: string) {
    const value = Number(price);

    if (value >= 10000000) {
      return `PKR ${(value / 10000000).toFixed(
        2
      )} Cr`;
    }

    if (value >= 100000) {
      return `PKR ${(value / 100000).toFixed(
        2
      )} Lac`;
    }

    return `PKR ${value.toLocaleString()}`;
  }

  const filteredProperties =
    properties.filter((property) => {
      if (
        purpose &&
        property.purpose !== purpose
      ) {
        return false;
      }

      if (
        type &&
        property.type !== type
      ) {
        return false;
      }

      if (
        cityId &&
        property.city.name !==
          cities.find(
            (city) =>
              city.id === Number(cityId)
          )?.name
      ) {
        return false;
      }

      if (
        maxPrice &&
        Number(property.price) >
          Number(maxPrice)
      ) {
        return false;
      }

      return (
        property.published &&
        property.status ===
          "AVAILABLE"
      );
    });

  return (
    <main className="min-h-screen bg-white">
      {/* NAVBAR */}

      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight"
          >
            REAL<span className="text-gray-400">ESTATE</span>
          </Link>

          <div className="flex items-center gap-6">
            <a
              href="#properties"
              className="text-sm font-medium hover:text-gray-500"
            >
              Properties
            </a>

            <a
              href="#contact"
              className="text-sm font-medium hover:text-gray-500"
            >
              Contact
            </a>

            <Link
              href="/admin"
              className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-medium"
            >
              Admin
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}

      <section className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500">
              Find your next property
            </p>

            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mt-4 leading-tight">
              Find a place
              <br />
              you can call home.
            </h1>

            <p className="text-lg text-gray-600 mt-6 max-w-xl">
              Explore premium houses, flats,
              plots and commercial properties
              across Lahore and Islamabad.
            </p>
          </div>

          {/* SEARCH BOX */}

          <div className="bg-white rounded-2xl shadow-xl mt-12 p-5">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* PURPOSE */}

              <select
                value={purpose}
                onChange={(e) =>
                  setPurpose(e.target.value)
                }
                className="border rounded-xl px-4 py-3"
              >
                <option value="">
                  Buy or Rent
                </option>

                <option value="SALE">
                  For Sale
                </option>

                <option value="RENT">
                  For Rent
                </option>
              </select>

              {/* CITY */}

              <select
                value={cityId}
                onChange={(e) =>
                  setCityId(e.target.value)
                }
                className="border rounded-xl px-4 py-3"
              >
                <option value="">
                  Select City
                </option>

                {cities.map((city) => (
                  <option
                    key={city.id}
                    value={city.id}
                  >
                    {city.name}
                  </option>
                ))}
              </select>

              {/* TYPE */}

              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value)
                }
                className="border rounded-xl px-4 py-3"
              >
                <option value="">
                  Property Type
                </option>

                <option value="HOUSE">
                  House
                </option>

                <option value="FLAT">
                  Flat
                </option>

                <option value="PLOT">
                  Plot
                </option>

                <option value="COMMERCIAL">
                  Commercial
                </option>
              </select>

              {/* PRICE */}

              <select
                value={maxPrice}
                onChange={(e) =>
                  setMaxPrice(e.target.value)
                }
                className="border rounded-xl px-4 py-3"
              >
                <option value="">
                  Maximum Price
                </option>

                <option value="5000000">
                  50 Lac
                </option>

                <option value="10000000">
                  1 Crore
                </option>

                <option value="25000000">
                  2.5 Crore
                </option>

                <option value="50000000">
                  5 Crore
                </option>

                <option value="100000000">
                  10 Crore
                </option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTIES */}

      <section
        id="properties"
        className="max-w-7xl mx-auto px-6 py-20"
      >
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm text-gray-500">
              PROPERTY COLLECTION
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Available Properties
            </h2>
          </div>

          <p className="text-gray-500">
            {filteredProperties.length}{" "}
            properties
          </p>
        </div>

        {loading ? (
          <div className="py-20 text-center text-gray-500">
            Loading properties...
          </div>
        ) : filteredProperties.length ===
          0 ? (
          <div className="border rounded-2xl py-20 text-center">
            <div className="text-5xl">
              🏠
            </div>

            <h3 className="text-xl font-semibold mt-4">
              No properties found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search
              filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map(
              (property) => (
                <Link
                  href={`/properties/${property.slug}`}
                  key={property.id}
                  className="group border rounded-2xl overflow-hidden hover:shadow-xl transition"
                >
                  
                  {/* PROPERTY IMAGE UPDATE HERE */}
                  <div className="h-56 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                    {property.images && property.images.length > 0 ? (
                      <img
                        src={property.images[0].imageUrl}
                        alt={property.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-gray-400 text-5xl">🏠</span>
                    )}
                  </div>

                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold uppercase bg-gray-100 px-3 py-1 rounded-full">
                        {property.purpose ===
                        "SALE"
                          ? "For Sale"
                          : "For Rent"}
                      </span>

                      {property.featured && (
                        <span className="text-xs font-semibold text-yellow-700">
                          Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-xl font-semibold mt-4 group-hover:underline">
                      {property.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {property.area
                        ? `${property.area.name}, `
                        : ""}
                      {property.city.name}
                    </p>

                    <p className="text-xl font-bold mt-4">
                      {formatPrice(
                        property.price
                      )}
                    </p>

                    <div className="flex gap-5 mt-4 text-sm text-gray-500">
                      {property.areaSize && (
                        <span>
                          {property.areaSize}{" "}
                          {property.areaUnit}
                        </span>
                      )}

                      {property.bedrooms !==
                        null && (
                        <span>
                          🛏{" "}
                          {property.bedrooms}
                        </span>
                      )}

                      {property.bathrooms !==
                        null && (
                        <span>
                          🚿{" "}
                          {property.bathrooms}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </section>

      {/* CTA */}

      <section
        id="contact"
        className="bg-black text-white"
      >
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold">
            Looking for something specific?
          </h2>

          <p className="text-gray-400 mt-4">
            Talk to our property experts and
            find the right property for you.
          </p>

          <a
            href="tel:+923000000000"
            className="inline-block bg-white text-black px-7 py-3 rounded-xl mt-8 font-semibold"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* FOOTER */}

      <footer className="bg-black text-gray-500 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between">
          <p>
            © 2026 Real Estate. All rights
            reserved.
          </p>

          <Link
            href="/admin"
            className="hover:text-white"
          >
            Admin
          </Link>
        </div>
      </footer>
    </main>
  );
}