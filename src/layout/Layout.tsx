import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import background from "src/assets/background.png";

const Container = styled.div`
  min-height: 100vh;
  width: 100%;

  background-image: url(${background});
  background-size: auto;
  background-position: center top;
  background-repeat: repeat;
`;

const InnerContainer = styled.div`
  max-width: 100%;
  padding: 0 64px;

  @media (max-width: 640px) {
    padding: 0 32px;
  }
`;

const Layout = ({ children }: { children: React.ReactNode | React.ReactNode[] }) => {
  return (
    <Container>
      <Header />
      <InnerContainer>{children}</InnerContainer>
      <Footer />
    </Container>
  );
};

export default Layout;
