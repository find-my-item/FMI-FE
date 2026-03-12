/**
 * @author jikwon
 *
 * @description VWorldAddressSearch API의 응답 데이터 타입
 */

export interface VWorldAddressItem {
  address: {
    road: string;
    parcel: string;
  };
  point: {
    x: string;
    y: string;
  };
  title: string;
}
