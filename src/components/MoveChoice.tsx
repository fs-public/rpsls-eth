import React from "react";
import styled from "styled-components";
import Rock from "src/assets/rock.png";
import Paper from "src/assets/paper.png";
import Scissors from "src/assets/scissors.png";
import Lizard from "src/assets/lizard.png";
import Spock from "src/assets/spock.png";
import { GameMove } from "src/types/types";

const images = [null, Rock, Paper, Scissors, Spock, Lizard];

export enum MoveStatus {
  NONE,
  DEFAULT,
  SELECTED,
  WINS,
  LOSES,
}

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  padding: 20px 0 30px 0;
  // min-width: 364px;
`;

export const StyledMove = styled.div<{ $move: GameMove; $status: MoveStatus }>`
  display: inblock;
  width: 60px;
  height: 60px;
  border-radius: 100%;

  background-image: url(${(props) => images[props.$move]});
  background-color: ${(props) => ["transparent", "gray", "yellow", "green", "red"][props.$status]};
  background-size: cover;
  background-blend-mode: luminosity;

  transition: transform 300ms;
  transform: ${(props) => (props.$status === MoveStatus.SELECTED ? "translateY(-20px) scale(110%)" : "none")};
`;

const getStatusWithMove = (selected: GameMove, against: GameMove) => {
  if (selected === 0) return MoveStatus.DEFAULT;
  if (selected === against) return MoveStatus.SELECTED;

  if (selected % 2 === against % 2) return selected < against ? MoveStatus.WINS : MoveStatus.LOSES;
  else return selected > against ? MoveStatus.WINS : MoveStatus.LOSES;
};

interface MoveChoiceProps {
  selected: GameMove;
  onSelect: (newSelect: GameMove) => void;
}

const MoveChoice: React.FC<MoveChoiceProps> = ({ selected, onSelect }) => {
  const selectMove = (move: GameMove) => {
    if (selected === move) onSelect(0);
    else onSelect(move);
  };

  return (
    <Container>
      {[1, 2, 3, 5, 4].map((i) => (
        <StyledMove key={i} $move={i} $status={getStatusWithMove(selected, i)} onClick={() => selectMove(i)} />
      ))}
    </Container>
  );
};

export default MoveChoice;
