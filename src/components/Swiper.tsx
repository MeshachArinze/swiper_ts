import React from "react";
import { SwiperItemType } from "../types";
import "./Swiper.css";
import SwiperItem from "./SwiperItem";

export type Props = {
  items: Array<SwiperItemType>;
};

export default function Swiper({ items }: Props): JSX.Element {
  return (
    <div className="Swiper-container">
      <ul className="Swiper_list">{items.map((item, idx) => (<SwiperItem key={idx} {...item} />))}</ul>
    </div>
  );
}
