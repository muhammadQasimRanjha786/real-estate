"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Property = {
  id: number;
  title: string;
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
};

export default function PropertiesPage() {
  const router = useRouter();

  const [properties, setProperties] =
    useState<Property[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [deleting, setDeleting] =
    useState<number | null>(null);

  // ─────────────────────────────────
  // LOAD PROPERTIES
  // ─────────────────────────────────

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

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to load properties."
        );
      }

      setProperties(
        data.properties || []
      );
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load properties."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  // ─────────────────────────────────
  // DELETE
  // ─────────────────────────────────

  async function deleteProperty(
    id: number
  ) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(id);

      const response = await fetch(
        `/api/properties?id=${id}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Failed to delete property."
        );
      }

      setProperties((previous) =>
        previous.filter(
          (property) =>
            property.id !== id
        )
      );
    } catch (error) {
      console.error(error);

      alert(
        "Unable to delete property."
      );
    } finally {
      setDeleting(null);
    }
  }

  // ─────────────────────────────────
  // PRICE FORMAT
  // ─────────────────────────────────

  function formatPrice(
    price: string
  ) {
    const number = Number(price);

    if (number >= 10000000) {
      return `PKR ${(number / 10000000).toFixed(
        2
      )} Cr`;
    }

    if (number >= 100000) {
      return `PKR ${(number / 100000).toFixed(
        2
      )} Lac`;
    }

    return `PKR ${number.toLocaleString()}`;
  }

  // ─────────────────────────────────
  // EMPTY / LOADING
  // ─────────────────────────────────

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-gray-600">
          Loading properties...
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* HEADER */}

      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <button
              onClick={() =>
                router.push("/admin")
              }
              className="text-sm text-gray-500 hover:text-black"
            >
              ← Dashboard
            </button>

            <h1 className="text-3xl font-bold mt-2">
              Properties
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all your property
              listings.
            </p>
          </div>

          <button
            onClick={() =>
              router.push(
                "/admin/properties/new"
              )
            }
            className="bg-black text-white px-5 py-3 rounded-xl font-medium hover:bg-gray-800"
          >
            + Add Property
          </button>
        </div>
      </header>

      {/* CONTENT */}

      <section className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-5">
            {error}
          </div>
        )}

        {/* SUMMARY */}

        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <div className="flex flex-wrap gap-8">
            <div>
              <p className="text-gray-500 text-sm">
                Total Properties
              </p>

              <p className="text-2xl font-bold mt-1">
                {properties.length}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                Available
              </p>

              <p className="text-2xl font-bold mt-1">
                {
                  properties.filter(
                    (p) =>
                      p.status ===
                      "AVAILABLE"
                  ).length
                }
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                For Sale
              </p>

              <p className="text-2xl font-bold mt-1">
                {
                  properties.filter(
                    (p) =>
                      p.purpose === "SALE"
                  ).length
                }
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">
                For Rent
              </p>

              <p className="text-2xl font-bold mt-1">
                {
                  properties.filter(
                    (p) =>
                      p.purpose === "RENT"
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        {/* TABLE */}

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {properties.length === 0 ? (
            <div className="p-12 text-center">
              <div className="text-5xl mb-4">
                🏠
              </div>

              <h2 className="text-xl font-semibold">
                No properties yet
              </h2>

              <p className="text-gray-500 mt-2">
                Add your first property
                listing.
              </p>

              <button
                onClick={() =>
                  router.push(
                    "/admin/properties/new"
                  )
                }
                className="mt-5 bg-black text-white px-6 py-3 rounded-xl"
              >
                + Add Property
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold">
                      Property
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Location
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Type
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Price
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Status
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold">
                      Website
                    </th>

                    <th className="px-6 py-4 text-sm font-semibold text-right">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y">
                  {properties.map(
                    (property) => (
                      <tr
                        key={property.id}
                        className="hover:bg-gray-50"
                      >
                        {/* PROPERTY */}

                        <td className="px-6 py-5">
                          <div>
                            <p className="font-semibold">
                              {property.title}
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                              ID: #
                              {property.id}
                            </p>

                            {property.featured && (
                              <span className="inline-block mt-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>

                        {/* LOCATION */}

                        <td className="px-6 py-5">
                          <p className="font-medium">
                            {property.city.name}
                          </p>

                          {property.area && (
                            <p className="text-sm text-gray-500">
                              {
                                property.area
                                  .name
                              }
                            </p>
                          )}
                        </td>

                        {/* TYPE */}

                        <td className="px-6 py-5">
                          <p className="font-medium">
                            {property.type}
                          </p>

                          <span className="text-xs text-gray-500">
                            {property.purpose ===
                            "SALE"
                              ? "For Sale"
                              : "For Rent"}
                          </span>
                        </td>

                        {/* PRICE */}

                        <td className="px-6 py-5 font-semibold">
                          {formatPrice(
                            property.price
                          )}
                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              property.status ===
                              "AVAILABLE"
                                ? "bg-green-100 text-green-700"
                                : property.status ===
                                  "SOLD"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {property.status}
                          </span>
                        </td>

                        {/* PUBLISHED */}

                        <td className="px-6 py-5">
                          <span
                            className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                              property.published
                                ? "bg-blue-100 text-blue-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {property.published
                              ? "Published"
                              : "Hidden"}
                          </span>
                        </td>

                        {/* ACTION */}

                        <td className="px-6 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              onClick={() =>
                                alert(
                                  "Edit feature coming next."
                                )
                              }
                              className="px-3 py-2 border rounded-lg text-sm hover:bg-gray-100"
                            >
                              Edit
                            </button>

                            <button
                              onClick={() =>
                                deleteProperty(
                                  property.id
                                )
                              }
                              disabled={
                                deleting ===
                                property.id
                              }
                              className="px-3 py-2 border border-red-200 text-red-600 rounded-lg text-sm hover:bg-red-50 disabled:opacity-50"
                            >
                              {deleting ===
                              property.id
                                ? "..."
                                : "Delete"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}