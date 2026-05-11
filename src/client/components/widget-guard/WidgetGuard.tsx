import { type ReactNode } from "react";
import { isWidgetAllowed } from "@/client/config/whitelist";
import { logger } from "@/client/lib/logger";

interface WidgetGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * Widget guard component that checks if the widget is allowed to be displayed on the current domain.
 * If the domain is not in the whitelist, the fallback is shown (null by default).
 */
export const WidgetGuard = ({ children, fallback = null }: WidgetGuardProps) => {
  if (!isWidgetAllowed()) {
    logger.warn(
      `Widget is not allowed on this domain: ${window.location.hostname}. Check the whitelist configuration.`
    );
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
