import React from "react";
import { ImageProvider } from "./context/ImageContext";
import ImageUpload from "./components/ImageUpload";
import ImageControls from "./components/ImageControls";
import ImagePreview from "./components/ImagePreview";
import ImageDownload from "./components/ImageDownload";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App: React.FC = () => {
  return (
    <ImageProvider>
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl mb-6 text-neon">Image Processor</h1>
        <ImageUpload />
        <ImagePreview />
        <ImageControls />
        <ImageDownload />
        <ToastContainer />
      </div>
    </ImageProvider>
  );
};

export default App;
