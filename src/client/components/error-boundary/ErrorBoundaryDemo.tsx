import { useState } from "react";
import styled from "styled-components";

const TestContainer = styled.div`
  padding: 20px;
  margin: 20px 0;
  background: #f5f5f5;
  border: 2px dashed #999;
  border-radius: 8px;
`;

const TestTitle = styled.h3`
  margin: 0 0 12px 0;
  color: #333;
  font-size: 16px;
`;

const TestButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-right: 8px;

  &:hover,
  &:focus {
    background: #ff5252;
  }
`;

const Description = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
`;

/**
 * Demo component to test Error Boundary
 * Remove this in production
 */
export function ErrorBoundaryDemo() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error("This is a test error from ErrorBoundaryDemo component!");
  }

  return (
    <TestContainer>
      <TestTitle>🧪 Error Boundary Test (Development Only)</TestTitle>
      <Description>
        Click the button below to trigger an error and see the Error Boundary in action.
      </Description>
      <TestButton onClick={() => setShouldThrow(true)}>Throw Error</TestButton>
    </TestContainer>
  );
}
