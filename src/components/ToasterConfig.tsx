import React from "react";
import { Toaster } from "react-hot-toast";

const ToasterConfig: React.FC = () => {
  return <Toaster toastOptions={{ duration: 5000, loading: { duration: 15000 } }} />;
};

export default ToasterConfig;
