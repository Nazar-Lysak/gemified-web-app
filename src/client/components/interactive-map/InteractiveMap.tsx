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

const ButtonWrapper = styled.div<{ $delay: number }>`
  position: absolute;
  animation: fadeInScale 0.4s ease-out forwards;
  animation-delay: ${props => props.$delay}s;
  opacity: 0;

  @keyframes fadeInScale {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;

interface JourneyItem {
  id: string;
  checked: boolean;
  videoKey: string;
  buttonPosition: { top: string; left?: string; right?: string };
  videoPosition: { top: string; left?: string; right?: string; width: string };
}

const InteractiveMap = (): ReactElement => {
  const [activeVideoId, setActiveVideoId] = useState<string | null>(null);
  const elemRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const [journeyItems, setJourneyItems] = useState<JourneyItem[]>([
    {
      id: "map-1",
      checked: false,
      videoKey: "video-1",
      buttonPosition: { top: "58%", left: "38%" },
      videoPosition: { top: "60%", left: "47%", width: "360px" },
    },
    {
      id: "map-2",
      checked: false,
      videoKey: "video-2",
      buttonPosition: { top: "45%", left: "49%" },
      videoPosition: { top: "8%", left: "30%", width: "660px" },
    },
    {
      id: "map-3",
      checked: false,
      videoKey: "video-3",
      buttonPosition: { top: "40%", right: "20%" },
      videoPosition: { top: "25%", right: "8%", width: "440px" },
    },
    {
      id: "map-4",
      checked: false,
      videoKey: "video-4",
      buttonPosition: { top: "30%", right: "4%" },
      videoPosition: { top: "0", right: "0", width: "340px" },
    },
    {
      id: "map-5",
      checked: false,
      videoKey: "video-5",
      buttonPosition: { top: "65%", left: "14%" },
      videoPosition: { top: "47%", left: "0%", width: "340px" },
    },
  ]);

  const handleButtonClick = (id: string) => {
    setActiveVideoId(id);
  };

  const handleVideoEnd = (id: string) => {
    setJourneyItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: true } : item))
    );
    setActiveVideoId(null);
  };

  logger.log("InteractiveMap journey:", journeyItems);

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

        {!activeVideoId &&
          journeyItems.map((item, index) => (
            <ButtonWrapper 
              key={item.id} 
              $delay={index * 0.3}
              style={{
                ...item.buttonPosition,
                zIndex: 10,
              }}
            >
              <ButtonIconTogle
                handleClick={() => handleButtonClick(item.id)}
                isWatched={item.checked}
              />
            </ButtonWrapper>
          ))}

        {activeVideoId &&
          journeyItems.map((item) => {
            if (activeVideoId !== item.id) return null;
            return (
              <VideoPlayer
                key={`video-${item.id}`}
                videoUrl={t(item.videoKey)}
                onEnded={() => handleVideoEnd(item.id)}
                onError={(e) => logger.error("Video error:", e)}
                styles={{
                  height: "auto",
                  position: "absolute",
                  ...item.videoPosition,
                }}
              />
            );
          })}
      </MapContainer>
    </Wrapper>
  );
};

export default InteractiveMap;
