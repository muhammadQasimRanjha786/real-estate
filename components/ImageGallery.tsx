"use client";

import { useState, useEffect } from "react";

export default function ImageGallery({
  images,
  title,
}: {
  images: any[];
  title: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Yeh code har 3 second baad image change karega
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // 3000 ms = 3 seconds

    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) {
    return (
      <div className="h-[420px] rounded-3xl bg-gray-200 flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl">🏠</div>
          <p className="text-gray-500 mt-4">No images available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Badi Image (Auto-changing) */}
      <div className="h-[420px] rounded-3xl bg-gray-100 overflow-hidden relative flex items-center justify-center border">
        <img
          src={images[currentIndex].imageUrl}
          alt={title}
          className="w-full h-full object-contain transition-opacity duration-500"
        />
      </div>

      {/* Choti Images (Thumbnails) */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <div
              key={img.id || index}
              onClick={() => setCurrentIndex(index)}
              className={`h-24 w-32 flex-shrink-0 rounded-xl overflow-hidden bg-gray-200 border-2 transition cursor-pointer ${
                currentIndex === index
                  ? "border-black shadow-md opacity-100" // Jo image chal rahi hai wo highlight hogi
                  : "border-transparent hover:border-gray-400 opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={img.imageUrl}
                alt="Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}