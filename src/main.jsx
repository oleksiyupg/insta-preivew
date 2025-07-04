// Instagram Grid Preview Web App – Version 2.3.0 (Authentic Instagram grid layout, fixed styles)

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const devices = {
  "iPhone 15 Pro": { width: 393 },
  "iPhone 15 Pro Max": { width: 430 },
  "iPhone SE": { width: 375 },
  "Pixel 7": { width: 412 },
  "Galaxy S23": { width: 390 }
};

function App() {
  const [selectedDevice, setSelectedDevice] = useState("iPhone 15 Pro");
  const [images, setImages] = useState(Array(9).fill(null));

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = Array(9).fill(null);
    files.slice(0, 9).forEach((file, index) => {
      newImages[index] = URL.createObjectURL(file);
    });
    setImages(newImages);
  };

  const handleClear = () => {
    setImages(Array(9).fill(null));
  };

  const { width } = devices[selectedDevice];

  return (
    <div className="p-4 space-y-4 font-sans mx-auto max-w-screen-md">
      <h1 className="text-2xl font-bold">
        Instagram Grid Preview <span className="text-sm font-normal">v2.3.0</span>
      </h1>

      <div className="flex flex-wrap gap-4 items-center">
        <label className="font-semibold">Оберіть пристрій:</label>
        <select
          className="border px-2 py-1 rounded"
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          {Object.keys(devices).map((device) => (
            <option key={device}>{device}</option>
          ))}
        </select>

        <button
          onClick={handleClear}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Очистити сітку
        </button>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="border px-3 py-2 rounded w-full max-w-md"
      />

      <div
        className="grid grid-cols-3 gap-[1px] bg-black"
        style={{ width, aspectRatio: "1 / 1" }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="bg-white flex items-center justify-center overflow-hidden"
            style={{ aspectRatio: "1 / 1" }}
          >
            {img ? (
              <img
                src={img}
                alt={`preview-${i}`}
                className="object-cover w-full h-full"
              />
            ) : (
              <span className="text-gray-300 text-sm">{i + 1}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
