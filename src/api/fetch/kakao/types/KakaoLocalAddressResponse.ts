export interface KakaoLocalAddressResponse {
  documents: {
    address_name: string;
    y: string;
    x: string;
    address: {
      address_name: string;
      b_code: string;
      b_name: string;
      h_code: string;
      h_name: string;
      main_address_no: string;
      mountain_yn: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_h_name: string;
      region_3depth_name: string;
      sub_address_no: string;
      x: string;
      y: string;
    };
    road_address: {
      address_name: string;
      building_name: string;
      main_building_no: string;
      region_1depth_name: string;
      region_2depth_name: string;
      region_3depth_name: string;
      road_name: string;
      sub_building_no: string;
      underground_yn: string;
      x: string;
      y: string;
      zone_no: string;
    } | null;
  }[];
  meta: {
    is_end: boolean;
    pageable_count: number;
    total_count: number;
  };
}
