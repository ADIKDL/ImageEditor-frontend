import React, { useContext } from "react";
import ImageContext from "../context/ImageContext";
import axios from "axios";
import { toast } from "react-toastify";

const ImageUpload: React.FC = () => {
  const { setImage, setPreviewUrl, setBrightness, setContrast, setSaturation } =
    useContext(ImageContext);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await axios.post("http://localhost:5000/upload", formData);

      setImage(response.data.tempFilePath);
      setPreviewUrl(response.data.preview);
      setBrightness(parseFloat(response.data.brightness));
      setContrast(parseFloat(response.data.contrast));
      setSaturation(parseFloat(response.data.saturation));

      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Failed to upload image.");
    }
  };

  return (
    <div className="mb-6">
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleUpload}
      />
    </div>
  );
};

export default ImageUpload;
