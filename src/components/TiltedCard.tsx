import type { SpringOptions } from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

interface TiltedCardProps {
  frontImageSrc: React.ComponentProps<"img">["src"];
  backImageSrc: React.ComponentProps<"img">["src"];
  frontAltText?: string;
  backAltText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties["height"];
  containerWidth?: React.CSSProperties["width"];
  imageHeight?: React.CSSProperties["height"];
  imageWidth?: React.CSSProperties["width"];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  disableFlip?: boolean;
  isFlipped?: boolean;
  defaultFlipRotation?: number;
}

const springValues: SpringOptions = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  frontImageSrc,
  backImageSrc,
  frontAltText = "Front card image",
  backAltText = "Back card image",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  disableFlip = false,
  isFlipped,
  defaultFlipRotation = 0,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const scale = useSpring(1, springValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1,
  });

  const flipRotation = useSpring(defaultFlipRotation, {
    stiffness: 200,
    damping: 25,
    mass: 1,
  });

  // 틸트와 플립을 결합한 rotateY 값
  const combinedRotateY = useSpring(defaultFlipRotation, springValues);

  const [lastY, setLastY] = useState(0);

  // 카드 플립 토글 함수
  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current || disableFlip) return;

    const rect = ref.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const cardCenterX = rect.width / 2;

    // 클릭 위치에 따라 회전 방향 결정
    const isLeftSide = clickX < cardCenterX;
    const currentRotation = flipRotation.get();

    // 왼쪽 클릭: +180도, 오른쪽 클릭: -180도
    const rotationDelta = isLeftSide ? 180 : -180;
    const finalRotation = currentRotation + rotationDelta;

    flipRotation.set(finalRotation);
  };

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
  }

  // 틸트와 플립 효과를 결합하여 combinedRotateY 업데이트
  useEffect(() => {
    const unsubscribeRotateY = rotateY.on("change", () => {
      combinedRotateY.set(rotateY.get() + flipRotation.get());
    });

    const unsubscribeFlipRotation = flipRotation.on("change", () => {
      combinedRotateY.set(rotateY.get() + flipRotation.get());
    });

    return () => {
      unsubscribeRotateY();
      unsubscribeFlipRotation();
    };
  }, [rotateY, flipRotation, combinedRotateY]);

  useEffect(() => {
    if (isFlipped !== undefined) {
      const currentRotation = flipRotation.get();
      const targetRotation = isFlipped ? 0 : 180;

      // 현재 회전값과 목표 회전값이 다르면 회전
      if (Math.abs(currentRotation - targetRotation) > 1) {
        flipRotation.set(targetRotation);
      }
    }
  }, [isFlipped, flipRotation]);

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center cursor-pointer"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >

      <motion.div
        className="relative [transform-style:preserve-3d] w-full h-full"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY: combinedRotateY,
          scale,
        }}
      >
        {/* 카드 앞면 */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full [backface-visibility:hidden]"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        >
          <motion.img
            src={frontImageSrc}
            alt={frontAltText}
            draggable={false}
            className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)] select-none"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        </motion.div>

        {/* 카드 뒷면 */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        >
          <motion.img
            src={backImageSrc}
            alt={backAltText}
            draggable={false}
            className="absolute top-0 left-0 object-cover rounded-[15px] will-change-transform [transform:translateZ(0)] select-none"
            style={{
              width: imageWidth,
              height: imageHeight,
            }}
          />
        </motion.div>
      </motion.div>
    </figure>
  );
}
