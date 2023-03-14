import React from "react";
import { Props, SwiperItemType } from "../types";
import "./SwiperItem.css";



export default function SwiperItem({
  imageSrc,
  imageUrl,
}: Props): JSX.Element {
  return (
    <li className="swiper-item">
      <img src={imageSrc} alt={imageUrl} className="swiper-img" />
    </li>
  );
}
