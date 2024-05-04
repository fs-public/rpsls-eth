import React from "react";
import Navigation from "./Navigation";
import HowToPlay from "./HowToPlay";
import PastGames from "./PastGames";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Home: React.FC = () => {
  return (
    <Container>
      <div>
        <h1 style={{ margin: "0" }}>Welcome to</h1>
        <h1 style={{ margin: "0" }}>Rock-Paper-Scissors-Lizard-Spock</h1>
        <h1>on Ethereum Blockchain</h1>
      </div>
      <Navigation />
      <HowToPlay />
      <PastGames />
    </Container>
  );
};

export default Home;
