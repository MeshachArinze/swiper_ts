import React from "react";
import { SwiperItemProps } from "../types";
import "./SwiperItem.css";

export default function SwiperItem({
  imageSrc,
  imageUrl,
}: SwiperItemProps): JSX.Element {
  return (
    <li className="swiper-item">
      <img src={imageSrc} alt={imageUrl} className="swiper-img" />
    </li>
  );
}
