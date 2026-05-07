import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { ErrorBoundary } from "@/client/components/error-boundary";
import { logger, setDebugEnabled } from "@/client/lib/logger";

interface WidgetConfig {
  baseURI: string;
  language: string;
}

const rootElement = document.getElementById("gemified-web-app");
const scriptElement = document.currentScript as HTMLScriptElement;
const config: WidgetConfig = {
  baseURI: scriptElement?.baseURI || "",
  language: scriptElement?.dataset?.language || "",
};

const debugFlag = scriptElement?.dataset?.debug === "true";
setDebugEnabled(import.meta.env.DEV || debugFlag);

if (!rootElement) {
  logger.error("Gemified Web App: Element #gemified-web-app not found");
  throw new Error("Widget container not found");
}

logger.log("Current Website URL =>", config.baseURI);
logger.log("Detected Language =>", config.language);

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary
      onError={(error, errorInfo) => {
        logger.error("[Widget] Caught error:", error);
        logger.error("[Widget] Error info:", errorInfo);
      }}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
