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
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  frontOverlayContent?: React.ReactNode;
  backOverlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
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
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "300px",
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  frontOverlayContent = null,
  backOverlayContent = null,
  displayOverlayContent = false,
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

  // 카드 플립 상태 관리
  const [isFlipped, setIsFlipped] = useState(false);
  const flipRotation = useSpring(0, {
    stiffness: 200,
    damping: 25,
    mass: 1,
  });

  // 틸트와 플립을 결합한 rotateY 값
  const combinedRotateY = useSpring(0, springValues);

  const [lastY, setLastY] = useState(0);

  // 카드 플립 토글 함수
  const handleCardClick = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const cardCenterX = rect.width / 2;

    // 클릭 위치에 따라 회전 방향 결정
    const isLeftSide = clickX < cardCenterX;
    const currentRotation = flipRotation.get();

    // 왼쪽 클릭: +180도, 오른쪽 클릭: -180도
    const rotationDelta = isLeftSide ? 180 : -180;
    const finalRotation = currentRotation + rotationDelta;

    setIsFlipped(!isFlipped);
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
      {showMobileWarning && (
        <div className="absolute top-4 text-center text-sm block sm:hidden">
          This effect is not optimized for mobile. Check on desktop.
        </div>
      )}

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

          {displayOverlayContent && frontOverlayContent && (
            <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
              {frontOverlayContent}
            </motion.div>
          )}
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

          {displayOverlayContent && backOverlayContent && (
            <motion.div className="absolute top-0 left-0 z-[2] will-change-transform [transform:translateZ(30px)]">
              {backOverlayContent}
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {showTooltip && (
        <motion.figcaption
          className="pointer-events-none absolute left-0 top-0 rounded-[4px] bg-white px-[10px] py-[4px] text-[10px] text-[#2d2d2d] opacity-0 z-[3] hidden sm:block"
          style={{
            x,
            y,
            opacity,
            rotate: rotateFigcaption,
          }}
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
