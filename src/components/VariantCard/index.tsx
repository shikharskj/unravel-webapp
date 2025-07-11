import React, { useEffect, useState } from "react";
import Carousel from "../Carousel";
import VariantSkeleton from "../VariantSkeleton";
import type { Media, Variant } from "../../types";

/**
 * VariantCard displays a hotel room variant (e.g. King Bed with Breakfast).
 * It shows associated media (images/videos), room details, pricing,
 * and a call-to-action button.
 */
const VariantCard: React.FC<{ variant: Variant; media: Media }> = ({
  variant,
  media,
}) => {
  // Extract videos and images from media
  const videos = media.video_url ? [media.video_url] : [];
  const images = media.room_images || [];

  // Loading state to simulate shimmer while media loads
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600); // Simulate ~600ms media loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <VariantSkeleton />;
  }

  // Helper to find a property value by name
  const getPropertyValue = (key: string): string =>
    variant.display_properties?.find((p) => p.name === key)?.value || "";

  return (
    <div className="rounded-lg bg-blue-50 border border-gray-200 overflow-hidden shadow">
      {/* Media Section (video or image carousel) */}
      {videos.length > 0 ? (
        <Carousel items={videos} type="videos" />
      ) : images.length > 0 ? (
        <Carousel items={images} type="images" />
      ) : null}

      {/* Variant Details Section */}
      <div className="p-4 space-y-2">
        <div className="text-sm text-gray-700 font-semibold">
          {variant.name}
        </div>

        {/* Room features */}
        <div className="text-sm">🛏 {getPropertyValue("bed_type")}</div>
        <div className="text-sm">👥 {getPropertyValue("adult_occupancy")}</div>
        <div className="text-sm">🍽 {getPropertyValue("meals_included")}</div>
        <div className="text-xs text-gray-500">Includes taxes & fees</div>

        {/* Pricing Section */}
        <div className="mt-2 flex items-center justify-between">
          <div>
            {variant.total_price && (
              <>
                {/* Strike-through original price if available */}
                {variant.total_price.original_price && (
                  <div className="line-through text-gray-400 text-sm">
                    RM{variant.total_price.original_price}
                  </div>
                )}
                <div className="text-xl font-bold text-gray-900">
                  RM{variant.total_price.discounted_price}
                </div>
              </>
            )}
          </div>

          {/* Discount Label */}
          <div className="text-green-700 font-medium text-sm">
            {variant.discount_percent || "28%"} off
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-4">
          <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

export default VariantCard;
