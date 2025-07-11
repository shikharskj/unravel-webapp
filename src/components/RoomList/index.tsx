import { useState, useRef, useCallback } from "react";
import RoomCard from "../RoomCard";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll";
import { fetchMockRooms } from "../../services/apis";
import type { Room } from "../../types";

/**
 * RoomList component
 * - Displays a list of hotel rooms with infinite scrolling.
 * - Fetches paginated data from a mock API (`fetchMockRooms`).
 */
const RoomList: React.FC = () => {
  // Stores the list of rooms loaded so far
  const [rooms, setRooms] = useState<Room[]>([]);

  // Tracks the current page number for pagination
  const [page, setPage] = useState<number>(1);

  // Indicates whether data is currently being loaded
  const [loading, setLoading] = useState<boolean>(false);

  // Ref to the loader element at the bottom of the list (for infinite scroll)
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Ref to prevent overlapping fetches (acts like a lock)
  const isFetchingRef = useRef<boolean>(false);

  /**
   * Callback to load more rooms when user scrolls near bottom
   */
  const loadMore = useCallback(async () => {
    // Prevent multiple simultaneous fetches
    if (loading || isFetchingRef.current) return;

    isFetchingRef.current = true;
    setLoading(true);

    try {
      // Fetch next page of rooms
      const newRooms = await fetchMockRooms(page);

      // Append new rooms to the existing list
      setRooms((prevRooms) => [...prevRooms, ...(newRooms as Room[])]);

      // Move to the next page for the following request
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error loading more rooms:", error);
    } finally {
      // Reset loading flags
      setLoading(false);
      isFetchingRef.current = false;
    }
  }, [page, loading]);

  // Custom hook to detect when the loaderRef is visible (i.e., user has scrolled to bottom)
  useInfiniteScroll(loaderRef, loadMore);

  return (
    <div className="w-11/12 lg:w-8/12 mx-auto grid grid-cols-1 gap-6">
      {/* Render each room using RoomCard */}
      {rooms.map((room, idx) => (
        <RoomCard key={`${room.name}-${idx}`} room={room} />
      ))}

      {loading && (
        <div className="text-center text-sm text-gray-800 py-4 animate-pulse">
          Loading more rooms...
        </div>
      )}

      {/* Invisible div used as scroll trigger for infinite scroll */}
      <div ref={loaderRef} className="h-10" />
    </div>
  );
};

export default RoomList;
