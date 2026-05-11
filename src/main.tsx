import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import { ErrorBoundary } from "@/client/components/error-boundary";
import { WidgetGuard } from "@/client/components/widget-guard/WidgetGuard";
import { logger, setDebugEnabled } from "@/client/lib/logger";
import "@/i18n";

import type { WidgetConfig } from "@/client/types/types";

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

createRoot(rootElement).render(
  <StrictMode>
    <ErrorBoundary
      onError={(error, errorInfo) => {
        logger.error("[Widget] Caught error:", error);
        logger.error("[Widget] Error info:", errorInfo);
      }}
    >
      <WidgetGuard>
        <App config={config} />
      </WidgetGuard>
    </ErrorBoundary>
  </StrictMode>
);
