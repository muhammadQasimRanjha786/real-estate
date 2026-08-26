"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type City = {
  id: number;
  name: string;
};

type Area = {
  id: number;
  name: string;
};

type Amenity = {
  id: number;
  name: string;
};

export default function AddPropertyPage() {
  const router = useRouter();

  const [cities, setCities] = useState<City[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    description: "",
    purpose: "SALE",
    type: "HOUSE",
    price: "",
    areaSize: "",
    areaUnit: "MARLA",
    bedrooms: "",
    bathrooms: "",
    floor: "",
    cityId: "",
    areaId: "",
    featured: false,
    published: true,
  });

  const [selectedAmenities, setSelectedAmenities] = useState<number[]>(
    []
  );

  // ─────────────────────────────────────
  // LOAD CITIES + AMENITIES
  // ─────────────────────────────────────

  useEffect(() => {
    async function loadData() {
      try {
        const response = await fetch("/api/properties");

        if (!response.ok) {
          throw new Error("Failed to load data");
        }

        const data = await response.json();

        setCities(data.cities);
        setAmenities(data.amenities);
      } catch {
        setError("Unable to load property data.");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // ─────────────────────────────────────
  // LOAD AREAS WHEN CITY CHANGES
  // ─────────────────────────────────────

  useEffect(() => {
    if (!form.cityId) {
      setAreas([]);
      return;
    }

    async function loadAreas() {
      try {
        const response = await fetch(
          `/api/properties?cityId=${form.cityId}`
        );

        const data = await response.json();

        setAreas(data.areas || []);
      } catch {
        setAreas([]);
      }
    }

    loadAreas();
  }, [form.cityId]);

  // ─────────────────────────────────────
  // INPUT HANDLER
  // ─────────────────────────────────────

  function updateField(
    field: string,
    value: string | boolean
  ) {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  // ─────────────────────────────────────
  // AMENITY HANDLER
  // ─────────────────────────────────────

  function toggleAmenity(id: number) {
    setSelectedAmenities((previous) => {
      if (previous.includes(id)) {
        return previous.filter((item) => item !== id);
      }

      return [...previous, id];
    });
  }

  // ─────────────────────────────────────
  // SUBMIT
  // ─────────────────────────────────────

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          cityId: Number(form.cityId),
          areaId: form.areaId
            ? Number(form.areaId)
            : null,
          price: Number(form.price),
          areaSize: form.areaSize
            ? Number(form.areaSize)
            : null,
          bedrooms: form.bedrooms
            ? Number(form.bedrooms)
            : null,
          bathrooms: form.bathrooms
            ? Number(form.bathrooms)
            : null,
          floor: form.floor
            ? Number(form.floor)
            : null,
          amenityIds: selectedAmenities,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create property.");
        return;
      }

      router.push("/admin/properties");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">
          Loading...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">
      {/* HEADER */}

      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-6 py-5">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="text-sm text-gray-500 hover:text-black"
          >
            ← Back to Dashboard
          </button>

          <h1 className="text-3xl font-bold mt-3">
            Add Property
          </h1>

          <p className="text-gray-500 mt-1">
            Create a new property listing
          </p>
        </div>
      </header>

      {/* FORM */}

      <section className="max-w-5xl mx-auto p-6">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* BASIC INFORMATION */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Basic Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              {/* PURPOSE */}

              <div>
                <label className="label">
                  Purpose
                </label>

                <select
                  value={form.purpose}
                  onChange={(e) =>
                    updateField(
                      "purpose",
                      e.target.value
                    )
                  }
                  className="input"
                >
                  <option value="SALE">
                    For Sale
                  </option>

                  <option value="RENT">
                    For Rent
                  </option>
                </select>
              </div>

              {/* TYPE */}

              <div>
                <label className="label">
                  Property Type
                </label>

                <select
                  value={form.type}
                  onChange={(e) =>
                    updateField(
                      "type",
                      e.target.value
                    )
                  }
                  className="input"
                >
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
              </div>

              {/* TITLE */}

              <div className="md:col-span-2">
                <label className="label">
                  Property Title
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(e) =>
                    updateField(
                      "title",
                      e.target.value
                    )
                  }
                  placeholder="Modern 5 Marla House in Bahria Town"
                  className="input"
                  required
                />
              </div>

              {/* PRICE */}

              <div>
                <label className="label">
                  Price (PKR)
                </label>

                <input
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    updateField(
                      "price",
                      e.target.value
                    )
                  }
                  placeholder="25000000"
                  className="input"
                  required
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* LOCATION */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Location
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">
              {/* CITY */}

              <div>
                <label className="label">
                  City
                </label>

                <select
                  value={form.cityId}
                  onChange={(e) => {
                    updateField(
                      "cityId",
                      e.target.value
                    );

                    updateField(
                      "areaId",
                      ""
                    );
                  }}
                  className="input"
                  required
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
              </div>

              {/* AREA */}

              <div>
                <label className="label">
                  Area
                </label>

                <select
                  value={form.areaId}
                  onChange={(e) =>
                    updateField(
                      "areaId",
                      e.target.value
                    )
                  }
                  className="input"
                  disabled={!form.cityId}
                >
                  <option value="">
                    Select Area
                  </option>

                  {areas.map((area) => (
                    <option
                      key={area.id}
                      value={area.id}
                    >
                      {area.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* PROPERTY DETAILS */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Property Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
              {/* SIZE */}

              <div>
                <label className="label">
                  Size
                </label>

                <input
                  type="number"
                  value={form.areaSize}
                  onChange={(e) =>
                    updateField(
                      "areaSize",
                      e.target.value
                    )
                  }
                  placeholder="5"
                  className="input"
                  min="0"
                />
              </div>

              {/* UNIT */}

              <div>
                <label className="label">
                  Unit
                </label>

                <select
                  value={form.areaUnit}
                  onChange={(e) =>
                    updateField(
                      "areaUnit",
                      e.target.value
                    )
                  }
                  className="input"
                >
                  <option value="MARLA">
                    Marla
                  </option>

                  <option value="KANAL">
                    Kanal
                  </option>

                  <option value="SQ_FT">
                    Sq. Ft.
                  </option>

                  <option value="SQ_YD">
                    Sq. Yd.
                  </option>

                  <option value="SQ_M">
                    Sq. M
                  </option>
                </select>
              </div>

              {/* BEDROOMS */}

              <div>
                <label className="label">
                  Bedrooms
                </label>

                <input
                  type="number"
                  value={form.bedrooms}
                  onChange={(e) =>
                    updateField(
                      "bedrooms",
                      e.target.value
                    )
                  }
                  className="input"
                  min="0"
                />
              </div>

              {/* BATHROOMS */}

              <div>
                <label className="label">
                  Bathrooms
                </label>

                <input
                  type="number"
                  value={form.bathrooms}
                  onChange={(e) =>
                    updateField(
                      "bathrooms",
                      e.target.value
                    )
                  }
                  className="input"
                  min="0"
                />
              </div>

              {/* FLOOR */}

              <div>
                <label className="label">
                  Floor
                </label>

                <input
                  type="number"
                  value={form.floor}
                  onChange={(e) =>
                    updateField(
                      "floor",
                      e.target.value
                    )
                  }
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Description
            </h2>

            <textarea
              value={form.description}
              onChange={(e) =>
                updateField(
                  "description",
                  e.target.value
                )
              }
              placeholder="Describe the property..."
              className="input mt-5 min-h-40 resize-y"
              required
            />
          </div>

          {/* AMENITIES */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Amenities
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-5">
              {amenities.map((amenity) => (
                <label
                  key={amenity.id}
                  className="flex items-center gap-3 border rounded-xl p-3 cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={selectedAmenities.includes(
                      amenity.id
                    )}
                    onChange={() =>
                      toggleAmenity(
                        amenity.id
                      )
                    }
                    className="w-4 h-4"
                  />

                  <span className="text-sm">
                    {amenity.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* WEBSITE SETTINGS */}

          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold">
              Website Settings
            </h2>

            <div className="flex flex-col gap-4 mt-5">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) =>
                    updateField(
                      "featured",
                      e.target.checked
                    )
                  }
                  className="w-4 h-4"
                />

                <span>
                  Featured Property
                </span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) =>
                    updateField(
                      "published",
                      e.target.checked
                    )
                  }
                  className="w-4 h-4"
                />

                <span>
                  Publish on Website
                </span>
              </label>
            </div>
          </div>

          {/* ERROR */}

          {error && (
            <div className="bg-red-50 text-red-600 rounded-xl p-4">
              {error}
            </div>
          )}

          {/* SAVE */}

          <div className="flex justify-end gap-3 pb-10">
            <button
              type="button"
              onClick={() =>
                router.push("/admin")
              }
              className="border bg-white px-6 py-3 rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="bg-black text-white px-8 py-3 rounded-xl font-semibold disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : "Publish Property"}
            </button>
          </div>
        </form>
      </section>

      {/* SIMPLE TAILWIND CLASSES */}

      <style jsx global>{`
        .label {
          display: block;
          font-size: 0.875rem;
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .input {
          width: 100%;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          padding: 0.75rem 1rem;
          outline: none;
          background: white;
        }

        .input:focus {
          border-color: #000;
          box-shadow: 0 0 0 1px #000;
        }
      `}</style>
    </main>
  );
}