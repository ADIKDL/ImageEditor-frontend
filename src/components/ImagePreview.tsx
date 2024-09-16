import React, { useContext } from "react";
import ImageContext from "../context/ImageContext";

const ImagePreview: React.FC = () => {
  const { previewUrl } = useContext(ImageContext);

  return (
    <div className="mb-6">
      {previewUrl ? (
        <img src={previewUrl} alt="Preview" className="max-w-full max-h-96" />
      ) : (
        <p className="text-neon">No image uploaded or processed yet.</p>
      )}
    </div>
  );
};

export default ImagePreview;
