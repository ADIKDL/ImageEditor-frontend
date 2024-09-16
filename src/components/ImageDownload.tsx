import React, { useContext } from "react";
import ImageContext from "../context/ImageContext";
import axios from "axios";
import { toast } from "react-toastify";

const ImageDownload: React.FC = () => {
  const {
    image,
    format,
    setFormat,
    brightness,
    contrast,
    saturation,
    rotation,
  } = useContext(ImageContext);

  const handleDownload = async () => {
    if (!image) {
      toast.error("No image to download.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/download",
        {
          tempFilePath: image,
          format: format || "jpeg",
          brightness,
          contrast,
          saturation,
          rotation: rotation || 0,
        },
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], { type: `image/${format}` });
      const downloadUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `processed-image.${format || "jpeg"}`;
      link.click();

      window.URL.revokeObjectURL(downloadUrl);
      toast.success("Image downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download image.");
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <select
        value={format}
        onChange={(e) => setFormat(e.target.value)}
        className="mb-4 px-4 py-2 bg-gray-800 text-white rounded focus:outline-none hover:bg-white hover:text-gray-900 transition duration-200 ease-in-out"
      >
        <option value="jpeg">JPEG</option>
        <option value="png">PNG</option>
      </select>
      <button
        onClick={handleDownload}
        className="px-6 py-2 bg-gray-800 text-white border border-neon rounded-lg transform hover:scale-105 transition duration-300 ease-in-out shadow-lg hover:bg-neon hover:text-black"
        style={{
          borderColor: "#00FF9D",
          boxShadow: "0 0 10px #00FF9D",
        }}
      >
        Download Image
      </button>
    </div>
  );
};

export default ImageDownload;
