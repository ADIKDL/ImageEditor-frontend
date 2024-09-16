import React, { useContext } from "react";
import ImageContext from "../context/ImageContext";
import axios from "axios";
import { toast } from "react-toastify";

const ImageControls: React.FC = () => {
  const {
    image,
    brightness,
    setBrightness,
    contrast,
    setContrast,
    saturation,
    setSaturation,
    rotation,
    setRotation,
    setPreviewUrl,
  } = useContext(ImageContext);

  const handleManipulate = async () => {
    if (!image) {
      toast.error("Please upload an image first.");
      return;
    }

    const data = {
      tempFilePath: image,
      brightness,
      contrast,
      saturation,
      rotation,
      format: "jpeg",
    };

    try {
      const response = await axios.post("http://localhost:5000/process", data);

      setPreviewUrl(response.data.preview);
      setBrightness(parseFloat(response.data.brightness));
      setContrast(parseFloat(response.data.contrast));
      setSaturation(parseFloat(response.data.saturation));

      toast.success("Image processed and sliders updated!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to process image.");
    }
  };

  const handleSliderChange = (type: string, value: string) => {
    const numericValue = parseFloat(value);
    if (isNaN(numericValue)) {
      console.error(`Invalid ${type} value: ${value}`);
      return;
    }

    switch (type) {
      case "brightness":
        setBrightness(numericValue);
        break;
      case "contrast":
        setContrast(numericValue);
        break;
      case "saturation":
        setSaturation(numericValue);
        break;
      case "rotation":
        setRotation(parseInt(numericValue.toString(), 10)); 
        break;
      default:
        break;
    }

    handleManipulate(); 
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex flex-col mb-4">
        <label>Brightness: {brightness}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={brightness}
          onChange={(e) => handleSliderChange("brightness", e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label>Contrast: {contrast}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={contrast}
          onChange={(e) => handleSliderChange("contrast", e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label>Saturation: {saturation}</label>
        <input
          type="range"
          min="0"
          max="200"
          value={saturation}
          onChange={(e) => handleSliderChange("saturation", e.target.value)}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label>Rotation: {rotation}°</label>
        <input
          type="range"
          min="0"
          max="360"
          value={rotation}
          onChange={(e) => handleSliderChange("rotation", e.target.value)}
        />
      </div>
    </div>
  );
};

export default ImageControls;
