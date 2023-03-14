import React from "react";
import { useRef } from "react";
import { getTouchEventData } from "../lib/dom";
import { getRefValue, useStateRef } from "../lib/hooks";
import { SwiperItemType } from "../types";
import SwiperItem from "./SwiperItem";

export type Props = {
  items: Array<SwiperItemType>;
};

export default function Swiper({ items }: Props) {
  const containerRef = useRef<HTMLUListElement>(null);
  const containerWidthRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const currentOffsetRef: React.MutableRefObject<number> = useRef(0);

  const startRef: React.MutableRefObject<number> = useRef(0);

  const [offsetX, setOffsetX, offSetRef] = useStateRef(-770);

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX: number = getTouchEventData(e).clientX;
    const diff: number = getRefValue(startRef) - currentX;
    let newOffsetX: number = getRefValue(currentOffsetRef) - diff;

    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = 0;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const onTouchEnd = () => {
    const containerWidth = getRefValue(containerWidthRef);

    let newOffsetX = getRefValue(offSetRef);

    newOffsetX = Math.round(offsetX / containerWidth) * containerWidth;

    setOffsetX(newOffsetX);

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mousemove", onTouchMove);
    window.addEventListener("mouseup", onTouchEnd);
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    //client x
    const currentOffestX: number = getRefValue(offSetRef);

    currentOffsetRef.current = currentOffestX;

    startRef.current = getTouchEventData(e).clientX;

    const containerEl = getRefValue(containerRef);

    const containerWidth = containerEl.offsetWidth;

    containerWidthRef.current = containerEl.offsetWidth;

    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mousemove", onTouchMove);
    window.addEventListener("mouseup", onTouchEnd);
  };

  return (
    <div
      className="Swiper-container"
      onMouseDown={onTouchStart}
      onTouchStart={onTouchStart}
    >
      <ul
        ref={containerRef}
        className="Swiper_list"
        style={{ transform: `translate3d${offsetX}px, 0, 0` }}
      >
        {items.map((item, idx) => (
          <SwiperItem key={idx} {...item} />
        ))}
      </ul>
    </div>
  );
}
