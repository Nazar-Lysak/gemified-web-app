import { useState, useEffect, useRef, type ReactElement } from "react";
import Panzoom, { type PanzoomObject } from "@panzoom/panzoom";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { logger } from "@/client/lib/logger";
import ButtonIconTogle from "@/client/UI/button-icon-togle/ButtonIconTogle";
import VideoPlayer from "@/client/UI/video-player/VideoPlayer";

const MapImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  display: block;
  object-fit: contain;
`;

const MapContainer = styled.div`
  width: 1253px;
  height: 600px;
  position: relative;
`;

const Wrapper = styled.div`
  max-width: 1253px;
  max-height: 600px;
`;

const InteractiveMap = (): ReactElement => {
  const [showVideo, setShowVideo] = useState(false);
  const elemRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const interactiveMapJourney = [
    {
      id: "map-1",
      checked: false,
    },
    {
      id: "map-2",
      checked: false,
    },
  ];

  logger.log("InteractiveMap journey:", interactiveMapJourney);

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
    <Wrapper>
      <MapContainer ref={elemRef}>
        <MapImage src={t("map-image")} alt="Zoomable" />
        {!showVideo && (
          <>
            <ButtonIconTogle
              handleClick={() => setShowVideo(true)}
              isWatched={false}
              styles={{ position: "absolute", top: "58%", left: "38%", zIndex: 10 }}
            />
            <ButtonIconTogle
              handleClick={() => setShowVideo(true)}
              isWatched={false}
              styles={{ position: "absolute", top: "45%", left: "49%", zIndex: 10 }}
            />
            <ButtonIconTogle
              handleClick={() => setShowVideo(true)}
              isWatched={false}
              styles={{ position: "absolute", top: "45%", left: "49%", zIndex: 10 }}
            />
            <ButtonIconTogle
              handleClick={() => setShowVideo(true)}
              isWatched={false}
              styles={{ position: "absolute", top: "40%", right: "20%", zIndex: 10 }}
            />
            <ButtonIconTogle
              handleClick={() => setShowVideo(true)}
              isWatched={false}
              styles={{ position: "absolute", top: "30%", right: "4%", zIndex: 10 }}
            />
            <ButtonIconTogle
              handleClick={() => setShowVideo(true)}
              isWatched={false}
              styles={{ position: "absolute", top: "65%", left: "14%", zIndex: 10 }}
            />
          </>
        )}
        {showVideo && (
          <>
            <VideoPlayer
              videoUrl={t("video-1")}
              onEnded={() => setShowVideo(false)}
              onError={(e) => logger.error("Video error:", e)}
              styles={{
                width: "360px",
                height: "auto",
                position: "absolute",
                top: "62%",
                left: "47%",
              }}
            />
            <VideoPlayer
              videoUrl={t("video-2")}
              onEnded={() => setShowVideo(false)}
              onError={(e) => logger.error("Video error:", e)}
              styles={{
                width: "660px",
                height: "auto",
                position: "absolute",
                top: "8%",
                left: "30%",
              }}
            />
            <VideoPlayer
              videoUrl={t("video-3")}
              onEnded={() => setShowVideo(false)}
              onError={(e) => logger.error("Video error:", e)}
              styles={{
                width: "440px",
                height: "auto",
                position: "absolute",
                top: "25%",
                right: "8%",
              }}
            />
            <VideoPlayer
              videoUrl={t("video-4")}
              onEnded={() => setShowVideo(false)}
              onError={(e) => logger.error("Video error:", e)}
              styles={{
                width: "340px",
                height: "auto",
                position: "absolute",
                top: "0",
                right: "0",
              }}
            />
            <VideoPlayer
              videoUrl={t("video-5")}
              onEnded={() => setShowVideo(false)}
              onError={(e) => logger.error("Video error:", e)}
              styles={{
                width: "340px",
                height: "auto",
                position: "absolute",
                top: "47%",
                left: "0%",
              }}
            />
          </>
        )}
      </MapContainer>
    </Wrapper>
  );
};

export default InteractiveMap;
