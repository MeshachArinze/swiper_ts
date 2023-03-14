import { SwiperItemType } from "../types";

export type Props = SwiperItemType;

export default function SwiperItem({
  imageSrc, 
  imageUrl,
}: Props) {
  return (
    <li className="swiper-item">
      <img src={imageSrc} alt={imageUrl} className="swiper-img"  draggable={false }/>
    </li>
  );
}
