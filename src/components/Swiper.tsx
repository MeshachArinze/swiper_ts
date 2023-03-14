import React, { useRef, useState } from "react";
import { getTouchEventData } from "../lib/dom";
import { getRefValue, useStateRef } from "../lib/hooks";
import { SwiperItemType } from "../types";
import SwiperItem from "./SwiperItem";

export type Props = {
  items: Array<SwiperItemType>;
};

const MIN_SWIPE_EEQUIRED = 40;

export default function Swiper({ items }: Props) {
  const containerRef = useRef<HTMLUListElement>(null);
  const containerWidthRef = useRef(0);
  const minOffsetXRef = useRef(0);
  const currentOffsetXRef: React.MutableRefObject<number> = useRef(0);

  const startXRef: React.MutableRefObject<number> = useRef(0);
  const [isSwiping, setIsSwiping] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const [offsetX, setOffsetX, offSetRef] = useStateRef(-770);

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX: number = getTouchEventData(e).clientX;
    const diff: number = getRefValue(startXRef) - currentX;
    let newOffsetX: number = getRefValue(currentOffsetXRef) - diff;

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
    const currentOffsetX = getRefValue(currentOffsetXRef);

    let newOffsetX = getRefValue(offSetRef);

    const diff = currentOffsetX - newOffsetX;

    if (Math.abs(diff) > MIN_SWIPE_EEQUIRED) {
      // swipe to the right if diff is positive
      if (diff > 0) {
        newOffsetX = Math.floor(newOffsetX / containerWidth) * containerWidth;
      }

      // swipe to the right if diff is negative
      else {
        newOffsetX = Math.ceil(newOffsetX / containerWidth) * containerWidth;
      }
    } else {
      newOffsetX = Math.round(newOffsetX / containerWidth) * containerWidth;
    }

    setIsSwiping(false);
    setOffsetX(newOffsetX);
    setCurrentIdx(Math.abs(newOffsetX / containerWidth));

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mousemove", onTouchMove);
    window.addEventListener("mouseup", onTouchEnd);
  };

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsSwiping(true);

    currentOffsetXRef.current = getRefValue(offSetRef);

    startXRef.current = getTouchEventData(e).clientX;

    const containerEl = getRefValue(containerRef);

    const containerWidth = containerEl.offsetWidth;

    containerWidthRef.current = containerWidth;

    minOffsetXRef.current = containerWidth - containerEl.scrollWidth;

    window.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("mousemove", onTouchMove);
    window.addEventListener("mouseup", onTouchEnd);
  };

  const indicatorOnClick = (idx: number) => {
    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    setCurrentIdx(idx);
    setOffsetX(-(containerWidth * idx));
  };

  return (
    <div
      className="swiper_container"
      onMouseDown={onTouchStart}
      onTouchStart={onTouchStart}
    >
      <ul
        ref={containerRef}
        className={`swiper_list ${isSwiping ? "swiping" : ""}`}
        style={{ transform: `translate3d${offsetX}px, 0, 0` }}
      >
        {items.map((item, idx) => (
          <SwiperItem key={idx} {...item} />
        ))}
      </ul>
      <ul className="swiper-indicator">
        {items.map((_item, idx) => (
          <li
            key={idx}
            className={`swiper-indicator-item ${
              idx === currentIdx ? "active" : ""
            }`}
            onClick={() => indicatorOnClick(idx)}
          />
        ))}
      </ul>
    </div>
  );
}
