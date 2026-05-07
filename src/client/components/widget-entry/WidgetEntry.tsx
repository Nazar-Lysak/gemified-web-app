import { logger } from "@/client/lib/logger";
import { useJourneyStarted } from "@/client/store/user-journey-store";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const WidgetEntry = () => {
  const [counter, setCounter] = useState(0);
  const { t } = useTranslation();
  const { isStarted, startJourney } = useJourneyStarted();

  logger.log("Journey started:", isStarted);
  return (
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
    </div>
  );
};

export default WidgetEntry;
