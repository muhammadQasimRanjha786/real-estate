import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await getSession();

  if (!session) {
    redirect("/admin/login");
  }

  const [
    totalProperties,
    availableProperties,
    soldProperties,
    rentedProperties,
    totalInquiries,
    totalCities,
  ] = await Promise.all([
    prisma.property.count(),

    prisma.property.count({
      where: {
        status: "AVAILABLE",
      },
    }),

    prisma.property.count({
      where: {
        status: "SOLD",
      },
    }),

    prisma.property.count({
      where: {
        status: "RENTED",
      },
    }),

    prisma.inquiry.count(),

    prisma.city.count(),
  ]);

  return (
    <main className="min-h-screen bg-gray-100">
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">
              Real Estate Admin
            </h1>

            <p className="text-gray-500 text-sm">
              Property Management Dashboard
            </p>
          </div>

          <form
            action="/api/auth/logout"
            method="POST"
          >
            <button className="border px-4 py-2 rounded-lg hover:bg-gray-50">
              Logout
            </button>
          </form>
        </div>
      </header>

      <section className="max-w-7xl mx-auto p-6">
        <h2 className="text-xl font-semibold mb-6">
          Overview
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <Stat
            title="Properties"
            value={totalProperties}
          />

          <Stat
            title="Available"
            value={availableProperties}
          />

          <Stat
            title="Sold"
            value={soldProperties}
          />

          <Stat
            title="Rented"
            value={rentedProperties}
          />

          <Stat
            title="Inquiries"
            value={totalInquiries}
          />

          <Stat
            title="Cities"
            value={totalCities}
          />
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6">
          <h2 className="text-lg font-semibold">
            Property Management
          </h2>

          <p className="text-gray-500 mt-1">
            Add and manage your real estate listings.
          </p>

          <div className="mt-5 flex gap-3">
            <a
              href="/admin/properties/new"
              className="bg-black text-white px-5 py-3 rounded-xl font-medium"
            >
              + Add Property
            </a>

            <a
              href="/admin/properties"
              className="border px-5 py-3 rounded-xl font-medium"
            >
              View Properties
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </div>
  );
}