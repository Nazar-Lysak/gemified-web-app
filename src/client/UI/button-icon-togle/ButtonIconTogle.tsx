import GreenHandIcon from "@/client/assets/icons/GreenHandIcon";
import styled from "styled-components";

interface ButtonIconTogleProps {
  handleClick: () => void;
  isWatched?: boolean;
  styles?: React.CSSProperties;
}

const Button = styled.button<{ $isWatched?: boolean }>`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  height: 100px;
  width: 100px;
  animation: ${props => props.$isWatched ? 'none' : 'float 3s ease-in-out infinite'};

  @keyframes float {
    0%,
    100% {
      transform: translateY(0) rotate(0deg);
    }
    33% {
      transform: translateY(-10px) rotate(5deg);
    }
    66% {
      transform: translateY(0) rotate(-5deg);
    }
  }
`;

const ButtonIconTogle = ({ handleClick, styles, isWatched }: ButtonIconTogleProps) => (
  <Button onClick={handleClick} style={styles} $isWatched={isWatched}>
    <GreenHandIcon checked={isWatched} />
  </Button>
);

export default ButtonIconTogle;
