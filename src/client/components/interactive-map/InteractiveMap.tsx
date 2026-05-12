import { useEffect, useRef, type ReactElement } from "react";
import Panzoom, { type PanzoomObject } from "@panzoom/panzoom";
import { useTranslation } from "react-i18next";

const InteractiveMap = (): ReactElement => {
  const elemRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!elemRef.current) return;

    // Initialize Panzoom on the element
    const panzoom: PanzoomObject = Panzoom(elemRef.current, {
      maxScale: 5,
      contain: "outside",
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
    <div>
      <div ref={elemRef} style={{ width: "100%", height: "100%" }}>
        <img
          src={t("map-image")}
          alt="Zoomable"
          style={{ 
            maxWidth: "100%", 
            maxHeight: "100%", 
            width: "auto", 
            height: "auto", 
            display: "block",
            objectFit: "contain"
          }}
        />
      </div>
    </div>
  );
};

export default InteractiveMap;
