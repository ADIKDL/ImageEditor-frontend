import React, { createContext, useState } from "react";

interface ImageContextProps {
  image: string | null;
  setImage: (image: string) => void;
  previewUrl: string;
  setPreviewUrl: (url: string) => void;
  brightness: number;
  setBrightness: (value: number) => void;
  contrast: number;
  setContrast: (value: number) => void;
  saturation: number;
  setSaturation: (value: number) => void;
  rotation: number;
  setRotation: (value: number) => void;
  format: string;
  setFormat: (format: string) => void;
}

const ImageContext = createContext<ImageContextProps>({} as ImageContextProps);

export const ImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [image, setImage] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [brightness, setBrightness] = useState<number>(50);
  const [contrast, setContrast] = useState<number>(50);
  const [saturation, setSaturation] = useState<number>(50);
  const [rotation, setRotation] = useState<number>(0);
  const [format, setFormat] = useState<string>("jpeg");

  return (
    <ImageContext.Provider
      value={{
        image,
        setImage,
        previewUrl,
        setPreviewUrl,
        brightness,
        setBrightness,
        contrast,
        setContrast,
        saturation,
        setSaturation,
        rotation,
        setRotation,
        format,
        setFormat,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};

export default ImageContext;
