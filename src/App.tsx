import { useEffect, useState } from "react";
import root from "react-shadow";
import { StyleSheetManager } from "styled-components";
import baseStyles from "@/client/styles/styles.css?inline";
import { ErrorBoundaryDemo } from "@/client/components/error-boundary/ErrorBoundaryDemo";
import WidgetEntry from "@/client/components/widget-entry/WidgetEntry";
import i18n from "./i18n";
import type { WidgetConfig } from "@/client/types/types";

function App({ config }: { config: WidgetConfig }) {
  const [styleTarget, setStyleTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    i18n.changeLanguage(config.language);
  }, [config.language]);

  return (
    <root.div>
      <style type="text/css">{baseStyles}</style>
      <div ref={setStyleTarget}>
        {styleTarget && (
          <StyleSheetManager target={styleTarget}>
            <>
              {import.meta.env.DEV && <ErrorBoundaryDemo />}
              <WidgetEntry />
            </>
          </StyleSheetManager>
        )}
      </div>
    </root.div>
  );
}

export default App;
