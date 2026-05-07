/**
 * Runtime logger with conditional output control.
 * Enabled in DEV mode or when `data-debug="true"` is set on the widget script tag.
 * Errors are always visible.
 */

// Controls whether non-error logs are output. Defaults to DEV mode.
let enabled = import.meta.env.DEV;

/** Enable or disable debug logging at runtime */
export const setDebugEnabled = (value: boolean) => {
  enabled = value;
};

/** Check if debug logging is currently enabled */
export const isDebugEnabled = () => enabled;

type ConsoleMethod = "log" | "info" | "warn" | "debug";

/** Console colors for different log levels */
const styles = {
  log: "color: #646cff; font-weight: bold", // Blue
  info: "color: #42b983; font-weight: bold", // Green
  warn: "color: #ff9800; font-weight: bold", // Orange
  debug: "color: #9e9e9e; font-weight: bold", // Gray
  error: "color: #d32f2f; font-weight: bold", // Red
  reset: "color: inherit; font-weight: normal",
};

/**
 * Creates a gated console method with colored prefix.
 * Only outputs when logging is enabled.
 */
const gated =
  (method: ConsoleMethod) =>
  (...args: unknown[]) => {
    if (enabled) {
      console[method](`%c[Gemified Web App]%c`, styles[method], styles.reset, ...args);
    }
  };

/**
 * Gemified Web App logger with colored output. Use instead of direct console.* calls.
 * log/info/warn/debug are gated, error is always visible.
 */
export const logger = {
  log: gated("log"),
  info: gated("info"),
  warn: gated("warn"),
  debug: gated("debug"),
  error: (...args: unknown[]) => {
    console.error(`%c[Gemified Web App]%c`, styles.error, styles.reset, ...args);
  },
};
