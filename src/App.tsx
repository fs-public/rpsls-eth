import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layout";
import Create from "./pages/Create";
import Game from "./pages/Game";
import { GlobalStyle } from "./styles/global-style";
import Web3Provider from "./context/Web3Provider";
import Join from "./pages/Join";
import ToasterConfig from "./components/ToasterConfig";

const App: React.FC = () => {
  return (
    <Web3Provider>
      <Layout>
        <GlobalStyle />
        <ToasterConfig />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/join" element={<Join />} />
          <Route path="/game/:address" element={<Game />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Web3Provider>
  );
};

export default App;
