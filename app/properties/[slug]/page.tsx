// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { prisma } from "@/lib/prisma";

// type Props = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// function formatPrice(price: unknown) {
//   const value = Number(price);

//   if (value >= 10000000) {
//     return `PKR ${(value / 10000000).toFixed(2)} Crore`;
//   }

//   if (value >= 100000) {
//     return `PKR ${(value / 100000).toFixed(2)} Lac`;
//   }

//   return `PKR ${value.toLocaleString()}`;
// }

// export default async function PropertyDetail({
//   params,
// }: Props) {
//   const { slug } = await params;

//   const property = await prisma.property.findUnique({
//     where: {
//       slug,
//     },
//     include: {
//       city: true,
//       area: true,
//       amenities: {
//         include: {
//           amenity: true,
//         },
//       },
//     },
//   });

//   if (!property) {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* NAVBAR */}

//       <nav className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
//           <Link
//             href="/"
//             className="text-2xl font-bold"
//           >
//             REAL<span className="text-gray-400">ESTATE</span>
//           </Link>

//           <Link
//             href="/"
//             className="text-sm font-medium hover:text-gray-500"
//           >
//             ← Back to Properties
//           </Link>
//         </div>
//       </nav>

//       {/* CONTENT */}

//       <section className="max-w-7xl mx-auto px-6 py-10">
//         {/* IMAGE */}

//         <div className="h-[420px] rounded-3xl bg-gray-200 flex items-center justify-center">
//           <div className="text-center">
//             <div className="text-7xl">
//               🏠
//             </div>

//             <p className="text-gray-500 mt-4">
//               Property images will appear here
//             </p>
//           </div>
//         </div>

//         {/* MAIN GRID */}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
//           {/* LEFT */}

//           <div className="lg:col-span-2 space-y-6">
//             {/* TITLE */}

//             <div className="bg-white rounded-2xl p-7">
//               <div className="flex flex-wrap gap-3">
//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                   {property.purpose === "SALE"
//                     ? "For Sale"
//                     : "For Rent"}
//                 </span>

//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                   {property.type}
//                 </span>

//                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                   {property.status}
//                 </span>
//               </div>

//               <h1 className="text-4xl font-bold mt-5">
//                 {property.title}
//               </h1>

//               <p className="text-gray-500 mt-3">
//                 📍{" "}
//                 {property.area
//                   ? `${property.area.name}, `
//                   : ""}
//                 {property.city.name}
//               </p>

//               <p className="text-3xl font-bold mt-6">
//                 {formatPrice(property.price)}
//               </p>
//             </div>

//             {/* DETAILS */}

//             <div className="bg-white rounded-2xl p-7">
//               <h2 className="text-2xl font-bold">
//                 Property Details
//               </h2>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
//                 {property.areaSize && (
//                   <Detail
//                     label="Size"
//                     value={`${property.areaSize} ${
//                       property.areaUnit ?? ""
//                     }`}
//                   />
//                 )}

//                 {property.bedrooms !== null && (
//                   <Detail
//                     label="Bedrooms"
//                     value={String(
//                       property.bedrooms
//                     )}
//                   />
//                 )}

//                 {property.bathrooms !== null && (
//                   <Detail
//                     label="Bathrooms"
//                     value={String(
//                       property.bathrooms
//                     )}
//                   />
//                 )}

//                 {property.floor !== null && (
//                   <Detail
//                     label="Floor"
//                     value={String(
//                       property.floor
//                     )}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* DESCRIPTION */}

//             <div className="bg-white rounded-2xl p-7">
//               <h2 className="text-2xl font-bold">
//                 Description
//               </h2>

//               <p className="text-gray-600 leading-8 mt-5 whitespace-pre-line">
//                 {property.description}
//               </p>
//             </div>

//             {/* AMENITIES */}

//             {property.amenities.length > 0 && (
//               <div className="bg-white rounded-2xl p-7">
//                 <h2 className="text-2xl font-bold">
//                   Amenities & Features
//                 </h2>

//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//                   {property.amenities.map(
//                     ({ amenity }) => (
//                       <div
//                         key={amenity.id}
//                         className="border rounded-xl p-4"
//                       >
//                         ✓ {amenity.name}
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* RIGHT — CONTACT */}

//           <aside>
//             <div className="bg-white rounded-2xl p-7 sticky top-6 shadow-sm">
//               <h2 className="text-2xl font-bold">
//                 Interested?
//               </h2>

//               <p className="text-gray-500 mt-2">
//                 Contact us about this property.
//               </p>

//               <a
//                 href="tel:+923000000000"
//                 className="block text-center bg-black text-white rounded-xl py-4 mt-7 font-semibold"
//               >
//                 📞 Call Agent
//               </a>

//               <a
//                 href={`https://wa.me/923000000000?text=${encodeURIComponent(
//                   `Hi, I'm interested in ${property.title}`
//                 )}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-center border rounded-xl py-4 mt-3 font-semibold"
//               >
//                 WhatsApp
//               </a>

//               <button
//                 className="w-full border rounded-xl py-4 mt-3 font-semibold"
//               >
//                 Send Inquiry
//               </button>

//               <div className="border-t mt-7 pt-6">
//                 <p className="text-sm text-gray-500">
//                   Property ID
//                 </p>

//                 <p className="font-semibold mt-1">
//                   #{property.id}
//                 </p>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </section>
//     </main>
//   );
// }

// function Detail({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="border rounded-xl p-4">
//       <p className="text-sm text-gray-500">
//         {label}
//       </p>

//       <p className="font-semibold text-lg mt-1">
//         {value}
//       </p>
//     </div>
//   );
// }

// import { notFound } from "next/navigation";
// import Link from "next/link";
// import { prisma } from "@/lib/prisma";

// type Props = {
//   params: Promise<{
//     slug: string;
//   }>;
// };

// function formatPrice(price: unknown) {
//   const value = Number(price);

//   if (value >= 10000000) {
//     return `PKR ${(value / 10000000).toFixed(2)} Crore`;
//   }

//   if (value >= 100000) {
//     return `PKR ${(value / 100000).toFixed(2)} Lac`;
//   }

//   return `PKR ${value.toLocaleString()}`;
// }

// export default async function PropertyDetail({
//   params,
// }: Props) {
//   const { slug } = await params;

//   const property = await prisma.property.findUnique({
//     where: {
//       slug,
//     },
//     include: {
//       city: true,
//       area: true,
//       amenities: {
//         include: {
//           amenity: true,
//         },
//       },
//       // 👇 YAHAN IMAGES MANGWANE KA CODE ADD KIYA HAI 👇
//       images: {
//         orderBy: {
//           sortOrder: "asc",
//         },
//       },
//     },
//   });

//   if (!property) {
//     notFound();
//   }

//   return (
//     <main className="min-h-screen bg-gray-50">
//       {/* NAVBAR */}

//       <nav className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
//           <Link
//             href="/"
//             className="text-2xl font-bold"
//           >
//             REAL<span className="text-gray-400">ESTATE</span>
//           </Link>

//           <Link
//             href="/"
//             className="text-sm font-medium hover:text-gray-500"
//           >
//             ← Back to Properties
//           </Link>
//         </div>
//       </nav>

//       {/* CONTENT */}

//       <section className="max-w-7xl mx-auto px-6 py-10">
        
//         {/* 👇 YAHAN IMAGE GALLERY ADD KI GAYI HAI 👇 */}
//         <div className="space-y-4">
//           {/* Main Large Image */}
//           <div className="h-[420px] rounded-3xl bg-gray-200 overflow-hidden relative flex items-center justify-center">
//             {property.images && property.images.length > 0 ? (
//              <img
//   src={property.images[0].imageUrl}
//   alt={property.title}
//   className="w-full h-full object-contain" 
// />
//             ) : (
//               <div className="text-center">
//                 <div className="text-7xl">🏠</div>
//                 <p className="text-gray-500 mt-4">
//                   No images available
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Thumbnails (Agar 1 se zyada images hon) */}
//           {property.images && property.images.length > 1 && (
//             <div className="flex gap-4 overflow-x-auto pb-2">
//               {property.images.slice(1).map((img) => (
//                 <div 
//                   key={img.id} 
//                   className="h-24 w-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 border-2 border-transparent hover:border-black transition cursor-pointer"
//                 >
//                   <img
//                     src={img.imageUrl}
//                     alt="Thumbnail"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//         {/* 👆 IMAGE GALLERY KHATAM 👆 */}

//         {/* MAIN GRID */}

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
//           {/* LEFT */}

//           <div className="lg:col-span-2 space-y-6">
//             {/* TITLE */}

//             <div className="bg-white rounded-2xl p-7">
//               <div className="flex flex-wrap gap-3">
//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                   {property.purpose === "SALE"
//                     ? "For Sale"
//                     : "For Rent"}
//                 </span>

//                 <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
//                   {property.type}
//                 </span>

//                 <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
//                   {property.status}
//                 </span>
//               </div>

//               <h1 className="text-4xl font-bold mt-5">
//                 {property.title}
//               </h1>

//               <p className="text-gray-500 mt-3">
//                 📍{" "}
//                 {property.area
//                   ? `${property.area.name}, `
//                   : ""}
//                 {property.city.name}
//               </p>

//               <p className="text-3xl font-bold mt-6">
//                 {formatPrice(property.price)}
//               </p>
//             </div>

//             {/* DETAILS */}

//             <div className="bg-white rounded-2xl p-7">
//               <h2 className="text-2xl font-bold">
//                 Property Details
//               </h2>

//               <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
//                 {property.areaSize && (
//                   <Detail
//                     label="Size"
//                     value={`${property.areaSize} ${
//                       property.areaUnit ?? ""
//                     }`}
//                   />
//                 )}

//                 {property.bedrooms !== null && (
//                   <Detail
//                     label="Bedrooms"
//                     value={String(
//                       property.bedrooms
//                     )}
//                   />
//                 )}

//                 {property.bathrooms !== null && (
//                   <Detail
//                     label="Bathrooms"
//                     value={String(
//                       property.bathrooms
//                     )}
//                   />
//                 )}

//                 {property.floor !== null && (
//                   <Detail
//                     label="Floor"
//                     value={String(
//                       property.floor
//                     )}
//                   />
//                 )}
//               </div>
//             </div>

//             {/* DESCRIPTION */}

//             <div className="bg-white rounded-2xl p-7">
//               <h2 className="text-2xl font-bold">
//                 Description
//               </h2>

//               <p className="text-gray-600 leading-8 mt-5 whitespace-pre-line">
//                 {property.description}
//               </p>
//             </div>

//             {/* AMENITIES */}

//             {property.amenities.length > 0 && (
//               <div className="bg-white rounded-2xl p-7">
//                 <h2 className="text-2xl font-bold">
//                   Amenities & Features
//                 </h2>

//                 <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
//                   {property.amenities.map(
//                     ({ amenity }) => (
//                       <div
//                         key={amenity.id}
//                         className="border rounded-xl p-4"
//                       >
//                         ✓ {amenity.name}
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* RIGHT — CONTACT */}

//           <aside>
//             <div className="bg-white rounded-2xl p-7 sticky top-6 shadow-sm">
//               <h2 className="text-2xl font-bold">
//                 Interested?
//               </h2>

//               <p className="text-gray-500 mt-2">
//                 Contact us about this property.
//               </p>

//               <a
//                 href="tel:+923000000000"
//                 className="block text-center bg-black text-white rounded-xl py-4 mt-7 font-semibold"
//               >
//                 📞 Call Agent
//               </a>

//               <a
//                 href={`https://wa.me/923000000000?text=${encodeURIComponent(
//                   `Hi, I'm interested in ${property.title}`
//                 )}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="block text-center border rounded-xl py-4 mt-3 font-semibold"
//               >
//                 WhatsApp
//               </a>

//               <button
//                 className="w-full border rounded-xl py-4 mt-3 font-semibold"
//               >
//                 Send Inquiry
//               </button>

//               <div className="border-t mt-7 pt-6">
//                 <p className="text-sm text-gray-500">
//                   Property ID
//                 </p>

//                 <p className="font-semibold mt-1">
//                   #{property.id}
//                 </p>
//               </div>
//             </div>
//           </aside>
//         </div>
//       </section>
//     </main>
//   );
// }

// function Detail({
//   label,
//   value,
// }: {
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="border rounded-xl p-4">
//       <p className="text-sm text-gray-500">
//         {label}
//       </p>

//       <p className="font-semibold text-lg mt-1">
//         {value}
//       </p>
//     </div>
//   );
// }

import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ImageGallery from "@/components/ImageGallery";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPrice(price: unknown) {
  const value = Number(price);

  if (value >= 10000000) {
    return `PKR ${(value / 10000000).toFixed(2)} Crore`;
  }

  if (value >= 100000) {
    return `PKR ${(value / 100000).toFixed(2)} Lac`;
  }

  return `PKR ${value.toLocaleString()}`;
}

export default async function PropertyDetail({
  params,
}: Props) {
  const { slug } = await params;

  const property = await prisma.property.findUnique({
    where: {
      slug,
    },
    include: {
      city: true,
      area: true,
      amenities: {
        include: {
          amenity: true,
        },
      },
      images: {
        orderBy: {
          sortOrder: "asc",
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      {/* NAVBAR */}

      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold"
          >
            REAL<span className="text-gray-400">ESTATE</span>
          </Link>

          <Link
            href="/"
            className="text-sm font-medium hover:text-gray-500"
          >
            ← Back to Properties
          </Link>
        </div>
      </nav>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto px-6 py-10">
        
        {/* YAHAN HUMNE NAYA AUTO-SLIDER LAGA DIYA HAI */}
        <ImageGallery images={property.images} title={property.title} />

        {/* MAIN GRID */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* LEFT */}

          <div className="lg:col-span-2 space-y-6">
            {/* TITLE */}

            <div className="bg-white rounded-2xl p-7">
              <div className="flex flex-wrap gap-3">
                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {property.purpose === "SALE"
                    ? "For Sale"
                    : "For Rent"}
                </span>

                <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {property.type}
                </span>

                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                  {property.status}
                </span>
              </div>

              <h1 className="text-4xl font-bold mt-5">
                {property.title}
              </h1>

              <p className="text-gray-500 mt-3">
                📍{" "}
                {property.area
                  ? `${property.area.name}, `
                  : ""}
                {property.city.name}
              </p>

              <p className="text-3xl font-bold mt-6">
                {formatPrice(property.price)}
              </p>
            </div>

            {/* DETAILS */}

            <div className="bg-white rounded-2xl p-7">
              <h2 className="text-2xl font-bold">
                Property Details
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6">
                {property.areaSize && (
                  <Detail
                    label="Size"
                    value={`${property.areaSize} ${
                      property.areaUnit ?? ""
                    }`}
                  />
                )}

                {property.bedrooms !== null && (
                  <Detail
                    label="Bedrooms"
                    value={String(
                      property.bedrooms
                    )}
                  />
                )}

                {property.bathrooms !== null && (
                  <Detail
                    label="Bathrooms"
                    value={String(
                      property.bathrooms
                    )}
                  />
                )}

                {property.floor !== null && (
                  <Detail
                    label="Floor"
                    value={String(
                      property.floor
                    )}
                  />
                )}
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="bg-white rounded-2xl p-7">
              <h2 className="text-2xl font-bold">
                Description
              </h2>

              <p className="text-gray-600 leading-8 mt-5 whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* AMENITIES */}

            {property.amenities.length > 0 && (
              <div className="bg-white rounded-2xl p-7">
                <h2 className="text-2xl font-bold">
                  Amenities & Features
                </h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
                  {property.amenities.map(
                    ({ amenity }) => (
                      <div
                        key={amenity.id}
                        className="border rounded-xl p-4"
                      >
                        ✓ {amenity.name}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — CONTACT */}

          <aside>
            <div className="bg-white rounded-2xl p-7 sticky top-6 shadow-sm">
              <h2 className="text-2xl font-bold">
                Interested?
              </h2>

              <p className="text-gray-500 mt-2">
                Contact us about this property.
              </p>

              <a
                href="tel:+923000000000"
                className="block text-center bg-black text-white rounded-xl py-4 mt-7 font-semibold"
              >
                📞 Call Agent
              </a>

              <a
                href={`https://wa.me/923000000000?text=${encodeURIComponent(
                  `Hi, I'm interested in ${property.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center border rounded-xl py-4 mt-3 font-semibold"
              >
                WhatsApp
              </a>

              <button
                className="w-full border rounded-xl py-4 mt-3 font-semibold"
              >
                Send Inquiry
              </button>

              <div className="border-t mt-7 pt-6">
                <p className="text-sm text-gray-500">
                  Property ID
                </p>

                <p className="font-semibold mt-1">
                  #{property.id}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border rounded-xl p-4">
      <p className="text-sm text-gray-500">
        {label}
      </p>

      <p className="font-semibold text-lg mt-1">
        {value}
      </p>
    </div>
  );
}