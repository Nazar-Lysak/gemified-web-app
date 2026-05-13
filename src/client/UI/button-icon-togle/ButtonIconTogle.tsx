import GreenHandIcon from "@/client/assets/icons/GreenHandIcon";
import styled from "styled-components";
import { motion } from "motion/react";

interface ButtonIconTogleProps {
  handleClick: () => void;
  styles?: React.CSSProperties;
}

const Button = styled(motion.button)`
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px;
  height: 100px;
  width: 100px;
  will-change: transform;
`;

const ANIMATION_CONFIG = {
  animate: {
    y: [0, -10, 0],
    rotate: [0, 5, -5, 0],
  },
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const ButtonIconTogle = ({ handleClick, styles }: ButtonIconTogleProps) => (
  <Button {...ANIMATION_CONFIG} onClick={handleClick} style={styles}>
    <GreenHandIcon />
  </Button>
);

export default ButtonIconTogle;
