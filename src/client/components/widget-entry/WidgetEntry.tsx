import { motion, AnimatePresence } from "framer-motion";
import { logger } from "@/client/lib/logger";
import { useJourneyStarted } from "@/client/store/user-journey-store";
import { useTranslation } from "react-i18next";
import InteractiveMap from "../interactive-map/InteractiveMap";
import ButtonIconTogle from "@/client/UI/button-icon-togle/ButtonIconTogle";
import InteractiveIberiaMap from "../interactive-iberia-map/InteractiveIberiMap";

const WidgetEntry = () => {
  const { t } = useTranslation();
  const { isStarted, startJourney } = useJourneyStarted();

  logger.log("Journey started:", isStarted);

  return (
    <>
      <div>
        <h1>{t("welcome")}</h1>
        <h2>{t("login")}</h2>

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
        <ButtonIconTogle handleClick={() => startJourney()} isWatched={isStarted} />

        <AnimatePresence mode="wait">
          {isStarted && (
            <motion.div
              key="interactive-map"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <InteractiveMap />
            </motion.div>
          )}
        </AnimatePresence>
        <InteractiveIberiaMap />
      </div>
    </>
  );
};

export default WidgetEntry;
