import MOCK_DATA from "../mock_data.json"; // adjust path accordingly
import type { HotelInfo, MockData, Room } from "../types";

const typedMockData = MOCK_DATA as MockData;

export const fetchMockRooms = async (
  page: number,
  limit = 3
): Promise<Room[]> => {
  const start = (page - 1) * limit;
  const end = start + limit;
  const sliced =
    typedMockData?.rooms_by_serial_no[0]?.rooms.slice(start, end) || [];

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(sliced);
    }, 600);
  });
};

export const getHotelInfo = async (): Promise<HotelInfo> => {
  const hotelInfo = typedMockData?.hotel_details;

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(hotelInfo);
    }, 400);
  });
};
