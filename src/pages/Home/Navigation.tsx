import React from "react";
import { Link } from "react-router-dom";
import Button from "src/components/ui/Button";
import { styled } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 64px;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
  }

  & > * > * {
    width: 230px;
  }
`;

const Navigation: React.FC = () => {
  return (
    <Container>
      <Link to="/create">
        <Button text="Create" />
      </Link>
      <Link to="/join">
        <Button text="Join" />
      </Link>
    </Container>
  );
};

export default Navigation;
