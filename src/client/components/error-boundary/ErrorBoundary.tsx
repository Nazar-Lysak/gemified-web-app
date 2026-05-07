import React, { Component, type ReactNode } from "react";
import styled from "styled-components";
import { logger } from "@/client/lib/logger";

interface Props {
  children: ReactNode;
  fallback?: (error: Error) => ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const ErrorContainer = styled.div`
  padding: 24px;
  text-align: center;
  background: #fff3f3;
  border: 1px solid #ffcccc;
  border-radius: 8px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const ErrorTitle = styled.h3`
  color: #d32f2f;
  margin: 0 0 12px 0;
  font-size: 18px;
  font-weight: 600;
`;

const ErrorMessage = styled.p`
  color: #666;
  margin: 0 0 16px 0;
  font-size: 14px;
  line-height: 1.5;
`;

const RetryButton = styled.button`
  background: #d32f2f;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: background 0.2s ease;

  &:hover {
    background: #b71c1c;
  }

  &:focus {
    outline: 2px solid #d32f2f;
    outline-offset: 2px;
  }
`;

const ErrorDetails = styled.details`
  margin-top: 16px;
  padding: 12px;
  background: #f5f5f5;
  border-radius: 4px;
  text-align: left;
  font-size: 12px;
  font-family: "Monaco", "Courier New", monospace;
`;

const ErrorSummary = styled.summary`
  cursor: pointer;
  color: #666;
  font-weight: 500;
  margin-bottom: 8px;

  &:hover {
    color: #333;
  }
`;

const ErrorStack = styled.pre`
  margin: 0;
  white-space: pre-wrap;
  word-break: break-word;
  color: #d32f2f;
  font-size: 11px;
  line-height: 1.4;
`;

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logger.error("[Gemified Web App Error]:", error, errorInfo);

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // In production: send to monitoring service
    // Example: Sentry integration
    // if (typeof window !== 'undefined' && (window as any).Sentry) {
    //   (window as any).Sentry.captureException(error, {
    //     contexts: { react: errorInfo },
    //     tags: { widget: 'gemified-web-app' },
    //   });
    // }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback(this.state.error!);
      }

      // Default error UI
      return (
        <ErrorContainer role="alert" aria-live="polite">
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            {import.meta.env.DEV && this.state.error
              ? this.state.error.message
              : "The widget encountered an unexpected error. Please try reloading."}
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry} aria-label="Reload widget to try again">
            Reload Widget
          </RetryButton>

          {import.meta.env.DEV && this.state.error?.stack && (
            <ErrorDetails>
              <ErrorSummary>Error details (development only)</ErrorSummary>
              <ErrorStack>{this.state.error.stack}</ErrorStack>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
