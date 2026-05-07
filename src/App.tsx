import { useState } from "react";
import root from "react-shadow";
import { StyleSheetManager } from "styled-components";
import baseStyles from "@/client/styles/styles.css?inline";
import { ErrorBoundaryDemo } from "@/client/components/error-boundary/ErrorBoundaryDemo";
import WidgetEntry from "@/client/components/widget-entry/WidgetEntry";

function App() {
  const [styleTarget, setStyleTarget] = useState<HTMLElement | null>(null);

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
