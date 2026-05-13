import { useState, useEffect, useRef, type ReactElement } from "react";
import Panzoom, { type PanzoomObject } from "@panzoom/panzoom";
import { useTranslation } from "react-i18next";
import { logger } from "@/client/lib/logger";
import ButtonIconTogle from "@/client/UI/button-icon-togle/ButtonIconTogle";

const InteractiveMap = (): ReactElement => {
  const [showVideo, setShowVideo] = useState(false);
  const elemRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!elemRef.current) return;

    // Initialize Panzoom on the element
    const panzoom: PanzoomObject = Panzoom(elemRef.current, {
      contain: "outside",
      maxScale: 1,
      minScale: 1,
      startScale: 1,
    });

    const parent = elemRef.current.parentElement;
    if (parent) {
      parent.addEventListener("wheel", panzoom.zoomWithWheel);
    }

    return () => {
      panzoom.destroy();
      if (parent) {
        parent.removeEventListener("wheel", panzoom.zoomWithWheel);
      }
    };
  }, []);

  return (
    <div style={{ maxHeight: "600px" }}>
      <div ref={elemRef} style={{ width: "2000px", height: "957px", position: "relative" }}>
        <img
          src={t("map-image")}
          alt="Zoomable"
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
        />
        {!showVideo && (
          <ButtonIconTogle
            handleClick={() => setShowVideo(true)}
            styles={{ position: "absolute", top: "60%", left: "50%", zIndex: 10 }}
          />
        )}
        {showVideo && (
          <video
            autoPlay
            playsInline
            preload="auto"
            style={{
              width: "500px",
              height: "auto",
              position: "absolute",
              top: "62%",
              left: "47%",
            }}
            onEnded={() => {
              setShowVideo(false);
            }}
            onError={(e) => {
              logger.error("Video error:", e);
            }}
          >
            <source src={t("video-1")} type="video/webm" />
            <source src={t("video-1").replace(".webm", ".mp4")} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
