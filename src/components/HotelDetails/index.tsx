import { useEffect, useState, useMemo } from "react";
import { getHotelInfo } from "../../services/apis";
import Tabs from "../Tabs";
import Carousel from "../Carousel";
import HotelDetailsSkeleton from "../HotelDetailsSkeleton"; // new shimmer component
import type { HotelInfo } from "../../types";

/**
 * HotelDetails component
 * - Fetches and displays information about a hotel
 * - Includes tab-based carousel to show either videos or images
 * - Uses shimmer while loading and error state handling
 */
const HotelDetails: React.FC = () => {
  // Stores fetched hotel data
  const [hotel, setHotel] = useState<HotelInfo | null>(null);

  // Tracks loading state during data fetch
  const [loading, setLoading] = useState<boolean>(true);

  // Stores any error messages
  const [error, setError] = useState<string | null>(null);

  // Controls active tab between "videos" and "images"
  const [activeTab, setActiveTab] = useState<"videos" | "images">("videos");

  // Controls whether the full description is shown
  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);

  /**
   * Fetch hotel data on initial component mount
   */
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const result = await getHotelInfo();
        setHotel(result);
      } catch (err) {
        setError("Failed to load hotel details");
        console.log("ERROR = ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, []);

  /**
   * Extract video URLs from hotel data
   */
  const videos = useMemo<string[]>(
    () => hotel?.new_videos?.map((v) => v.video_url.med) || [],
    [hotel]
  );

  /**
   * Extract image URLs from hotel data
   */
  const images = useMemo<string[]>(() => {
    const imgObj = hotel?.images?.[0]?.twoX;
    return imgObj ? Object.values(imgObj) : [];
  }, [hotel]);

  // Render shimmer component while loading
  if (loading) return <HotelDetailsSkeleton />;

  // Show error message if fetch failed
  if (error)
    return <div className="text-red-500 text-center py-4">{error}</div>;

  return (
    <section className="bg-gradient-to-r from-[#000328] to-[#00458e] text-white rounded-2xl shadow-xl p-8 mb-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* LEFT CONTENT - Hotel Info */}
      <div>
        {/* Hotel Name */}
        <h2 className="text-4xl font-extrabold mb-2 tracking-tight">
          {hotel?.display_name}
        </h2>

        {/* Static Rating and Address */}
        <p className="text-lg mb-1 font-medium">
          ⭐⭐⭐⭐⭐ 5-Star Luxury Hotel
        </p>
        <p className="text-md mb-4">
          📍 {hotel?.address?.city}, {hotel?.address?.country}
        </p>

        {/* Hotel Description (expandable) */}
        <p className="text-white text-opacity-90 leading-relaxed md:mt-10">
          {showFullDesc
            ? hotel?.description.slice(0, 640)
            : hotel?.description.slice(0, 280) + "..."}
        </p>
        <button
          onClick={() => setShowFullDesc((prev) => !prev)}
          className="mt-2 text-sm underline text-white/80 hover:text-white"
        >
          {showFullDesc ? "See less" : "See more"}
        </button>

        {/* Amenities */}
        <div className="flex flex-wrap gap-4 text-sm text-white mt-4">
          <span className="flex items-center gap-1">📶 Free WiFi</span>
          <span className="flex items-center gap-1">🚗 Parking</span>
          <span className="flex items-center gap-1">🍽 Restaurant</span>
          <span className="flex items-center gap-1">💪 Fitness Center</span>
        </div>
      </div>

      {/* RIGHT CONTENT - Media Carousel */}
      <div className="bg-transparent rounded-lg p-4">
        {/* Tabs for switching between videos and images */}
        <Tabs
          activeTab={activeTab}
          onChange={setActiveTab}
          tabs={["videos", "images"]}
        />

        {/* Media Carousel */}
        <div className="mt-2 rounded overflow-hidden">
          <Carousel
            items={activeTab === "videos" ? videos : images}
            type={activeTab}
          />
        </div>
      </div>
    </section>
  );
};

export default HotelDetails;
