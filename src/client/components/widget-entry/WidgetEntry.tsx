import { logger } from "@/client/lib/logger";
import { useJourneyStarted } from "@/client/store/user-journey-store";
import { useState } from "react";
import { useTranslation } from "react-i18next";

// Додаємо CSS для анімації спіннера
const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const WidgetEntry = () => {
  const [counter, setCounter] = useState(0);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const { t } = useTranslation();
  const { isStarted, startJourney } = useJourneyStarted();

  logger.log("Journey started:", isStarted);

  return (
    <>
      <style>{spinnerStyles}</style>
      <div>
        <h1>{t("welcome")}</h1>
        <h2>{t("login")}</h2>
      <p>This is a placeholder for the actual widget content.</p>
      <div>
        <p>Counter: {counter}</p>
        <button onClick={() => setCounter((prev) => prev + 1)}>Increment Counter</button>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sit perferendis delectus ea
        corrupti quaerat beatae nesciunt dolore consectetur. Obcaecati cum, nesciunt aperiam
        exercitationem voluptate hic dolores voluptates voluptas accusamus?
      </p>
      <ul>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://example.com/privacy">
            Privacy
          </a>
        </li>
        <li>
          <a target="_blank" rel="noopener noreferrer" href="https://example.com/terms">
            Terms of Use
          </a>
        </li>
      </ul>
      <button onClick={startJourney}>Start Journey</button>
      <div style={{ position: "relative", width: "100%" }}>
        {isVideoLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              zIndex: 10,
            }}
          >
            <div
              style={{
                border: "4px solid #f3f3f3",
                borderTop: "4px solid #3498db",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                animation: "spin 1s linear infinite",
              }}
            />
          </div>
        )}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: "100%", height: "auto", display: "block" }}
          onLoadedData={() => setIsVideoLoading(false)}
          onError={(e) => {
            logger.error("Video error:", e);
            setIsVideoLoading(false);
          }}
        >
          <source src={t("video-1")} type="video/webm" />
          <source src={t("video-1").replace(".webm", ".mp4")} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      </div>
    </>
  );
};

export default WidgetEntry;
