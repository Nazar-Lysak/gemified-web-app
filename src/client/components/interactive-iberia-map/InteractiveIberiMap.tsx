import { useState, useEffect, useRef, type CSSProperties } from "react";

import { useDraggable, useDroppable, DragDropProvider, type DragEndEvent } from "@dnd-kit/react";
import { useTranslation } from "react-i18next";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  margin-top: 20px;
`;

const ElementsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const DraggableElement = styled.div<{ $isDragging?: boolean }>`
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background-color: #00af00;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: grab;
  opacity: ${({ $isDragging }) => ($isDragging ? 0.5 : 1)};
  user-select: none;

  &:active {
    cursor: grabbing;
  }
`;

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
`;

const MapContainer = styled.div<{ $isError?: boolean }>`
  width: 677px;
  height: 581px;
  position: relative;
  border-radius: 8px;
  transition: box-shadow 0.3s ease;
  animation: ${({ $isError }) => ($isError ? shake : "none")} 0.5s;
  box-shadow: ${({ $isError }) => ($isError ? "0 0 20px 5px rgba(255, 0, 0, 0.5)" : "none")};

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${({ $isError }) => ($isError ? "rgba(255, 0, 0, 0.2)" : "transparent")};
    pointer-events: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;
  }
`;

const DropZone = styled.div<{ $isOver?: boolean }>`
  position: absolute;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  border: 2px dashed ${({ $isOver }) => ($isOver ? "#00af00" : "#ccc")};
  background-color: ${({ $isOver }) => ($isOver ? "rgba(0, 175, 0, 0.1)" : "transparent")};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
`;

interface MapElement {
  id: number;
  styles: CSSProperties;
  correctPosition: { x: number; y: number };
}

const mapElements: MapElement[] = [
  {
    id: 1,
    styles: { position: "absolute", top: "40px", left: "35px" },
    correctPosition: { x: 35, y: 40 },
  },
  {
    id: 2,
    styles: { position: "absolute", top: "68px", left: "252px" },
    correctPosition: { x: 252, y: 68 },
  },
  {
    id: 3,
    styles: { position: "absolute", top: "68px", left: "328px" },
    correctPosition: { x: 328, y: 68 },
  },
  {
    id: 4,
    styles: { position: "absolute", top: "88px", left: "569px" }, // 677 - 40 - 68 = 569
    correctPosition: { x: 569, y: 88 },
  },
  {
    id: 5,
    styles: { position: "absolute", top: "142px", left: "46px" },
    correctPosition: { x: 46, y: 142 },
  },
  {
    id: 6,
    styles: { position: "absolute", top: "242px", left: "178px" },
    correctPosition: { x: 178, y: 242 },
  },
  {
    id: 7,
    styles: { position: "absolute", top: "277px", left: "521px" }, // 677 - 88 - 68 = 521
    correctPosition: { x: 521, y: 277 },
  },
];

interface DraggableItemProps {
  id: number;
  children: React.ReactNode;
}

const DraggableItem = ({ id, children }: DraggableItemProps) => {
  const { ref, isDragging } = useDraggable({
    id: `draggable-${id}`,
  });

  return (
    <DraggableElement ref={ref} $isDragging={isDragging}>
      {children}
    </DraggableElement>
  );
};

interface DroppableZoneProps {
  id: number;
  style: CSSProperties;
  children?: React.ReactNode;
}

const DroppableZone = ({ id, style, children }: DroppableZoneProps) => {
  const { ref, isDropTarget } = useDroppable({
    id: `droppable-${id}`,
  });

  return (
    <DropZone ref={ref} style={style} $isOver={isDropTarget}>
      {children}
    </DropZone>
  );
};

const InteractiveIberiaMap = () => {
  const [placedElements, setPlacedElements] = useState<Set<number>>(new Set());
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const audioErrorRef = useRef<HTMLAudioElement>(null);
  const audioSuccessRef = useRef<HTMLAudioElement>(null);
  const audioWinnerRef = useRef<HTMLAudioElement>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (isError && audioErrorRef.current) {
      audioErrorRef.current.currentTime = 0; // Скидаємо на початок
      audioErrorRef.current.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && audioSuccessRef.current) {
      audioSuccessRef.current.currentTime = 0;
      audioSuccessRef.current.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isWinner && audioWinnerRef.current) {
      audioWinnerRef.current.currentTime = 0;
      audioWinnerRef.current.play().catch((error) => {
        console.error("Audio play failed:", error);
      });
    }
  }, [isWinner]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { operation } = event;

    if (!operation?.target || !operation?.source) return;

    const draggedId = parseInt(operation.source.id.toString().replace("draggable-", ""));
    const dropZoneId = parseInt(operation.target.id.toString().replace("droppable-", ""));

    // Перевірка чи елемент покладений у правильну зону
    if (draggedId === dropZoneId) {
      const newPlacedElements = new Set([...placedElements, draggedId]);
      setPlacedElements(newPlacedElements);
      // Показуємо успіх
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 500);
      
      // Перевірка чи всі елементи розміщені
      if (newPlacedElements.size === mapElements.length) {
        setTimeout(() => {
          setIsWinner(true);
        }, 600);
      }
    } else {
      // Показуємо помилку
      setIsError(true);
      setTimeout(() => {
        setIsError(false);
      }, 1000);
    }
  };

  const unplacedElements = mapElements.filter((el) => !placedElements.has(el.id));

  return (
    <Container>
      <DragDropProvider onDragEnd={handleDragEnd}>
        <ElementsList>
          {unplacedElements.map((element) => (
            <DraggableItem key={element.id} id={element.id}>
              {element.id}
            </DraggableItem>
          ))}
        </ElementsList>
        <MapContainer $isError={isError}>
          <img src={t("iberia-map")} alt="map" height={581} width={677} />
          <div
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {mapElements.map((element) => (
              <div key={element.id} style={{ ...element.styles, pointerEvents: "auto" }}>
                {placedElements.has(element.id) ? (
                  <DraggableElement style={{ backgroundColor: "green" }}>
                    {element.id}
                  </DraggableElement>
                ) : (
                  <DroppableZone id={element.id} style={{ backgroundColor: element.correctPosition ? "white" : "" }} />
                )}
              </div>
            ))}
          </div>
        </MapContainer>
      </DragDropProvider>
      <audio ref={audioErrorRef} src={t("error-sound")} preload="auto" />
      <audio ref={audioSuccessRef} src={t("access-sound")} preload="auto" />
      <audio ref={audioWinnerRef} src={t("winner-sound")} preload="auto" />
    </Container>
  );
};

export default InteractiveIberiaMap;
