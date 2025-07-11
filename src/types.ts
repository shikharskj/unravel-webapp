export interface Video {
  video_url: {
    med: string;
  };
}

export interface HotelImage {
  twoX: {
    [key: string]: string;
  };
}

export interface HotelInfo {
  display_name: string;
  address: {
    city: string;
    country: string;
  };
  description: string;
  images: HotelImage[];
  new_videos: Video[];
}

export interface DisplayProperty {
  name: string;
  value: string;
}

export interface TotalPrice {
  original_price?: number;
  discounted_price: number;
}

export interface Media {
  video_url?: string;
  room_images?: string[];
}


export interface Variant {
  name: string;
  display_properties?: DisplayProperty[];
  total_price?: TotalPrice;
  discount_percent?: string;
  [key: string]: unknown;
}

export interface Room {
  id: string;
  name: string;
  price: number;
  images: string[];
  properties?: {
    video_url?: {
      med: string;
    };
    room_images?: {
      image_urls: string[];
    }[];
  };
  description?: string;
  variants?: Variant[];
  [key: string]: unknown;
}

export interface MockData {
  hotel_details: HotelInfo;
  rooms_by_serial_no: {
    rooms: Room[];
  }[];
}
