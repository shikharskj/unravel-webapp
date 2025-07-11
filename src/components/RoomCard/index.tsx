import React, { useMemo } from "react";
import VariantCard from "../VariantCard";
import { useExpandable } from "../../hooks/useExpandable";
import type { Room } from "../../types";

/**
 * RoomCard displays basic information about a hotel room,
 * including a list of variants (e.g., room sizes or bed types),
 * and allows expanding/collapsing to show more.
 */
const RoomCard: React.FC<{ room: Room }> = React.memo(({ room }) => {
  // Hook to manage expanded/collapsed state
  const { expanded, toggle } = useExpandable();

  // Use memoization to avoid recalculating variants on re-render
  const variants = useMemo(() => room?.variants || [], [room]);

  // Show either all or just 2 variants depending on expansion state
  const visibleVariants = expanded ? variants : variants?.slice(0, 2);

  // Extract media info from room properties
  const video = room.properties?.video_url?.med;
  const images = room.properties?.room_images?.[0]?.image_urls || [];

  return (
    <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
      {/* Room Header */}
      <div className="mb-4">
        <h3 className="text-2xl font-bold text-gray-800">{room.name}</h3>
        <p className="text-sm text-gray-500">
          {room.description ||
            "Beautifully appointed room with essential amenities."}
        </p>
      </div>

      {/* Room Variants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {visibleVariants.map((variant, idx) => (
          <VariantCard
            key={idx}
            variant={variant}
            media={{ video_url: video, room_images: images }}
          />
        ))}
      </div>

      {/* Expand/Collapse Button */}
      {variants.length > 2 && (
        <button
          onClick={toggle}
          className="mt-4 text-sm text-blue-600 hover:underline"
        >
          {expanded ? "See less" : "Click to see more"}
        </button>
      )}
    </div>
  );
});

export default RoomCard;
