import React from "react";
import { Route, Routes, Link } from "react-router-dom";
import Button from "src/components/ui/Button";
import styled from "styled-components";
import Logo from "src/assets/logo.png";
import WalletButton from "src/components/web3/WalletButton";

const Container = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 32px;

  :nth-child(odd) {
    width: 150px;

    @media (max-width: 640px) {
      width: 100px;
    }
  }
`;

const StyledLogo = styled.img`
  width: 100%;
  max-width: 200px;
  @media (max-width: 480px) {
    order: 3;
    margin: 0 auto;
    padding-top: 20px;
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<div />} />
        <Route path="*" element={<GoBack />} />
      </Routes>
      <StyledLogo src={Logo} />
      <div>
        <WalletButton />
      </div>
    </Container>
  );
};

const GoBack: React.FC = () => {
  return (
    <Link to="/">
      <Button text="Back" variant="ghost" icon="ph:arrow-left" />
    </Link>
  );
};

export default Header;
