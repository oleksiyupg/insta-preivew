// Instagram Grid Preview Web App – Version 3.0.0 (Full Instagram UI Layout + Device Scaling)

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
  const postSize = Math.floor((width - 2) / 3); // grid gap = 1px on each side

  return (
    <div className="bg-neutral-100 min-h-screen flex flex-col items-center py-6">
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold">
          Instagram Grid Preview <span className="text-sm font-normal">v3.0.0</span>
        </h1>
        <div className="mt-2 flex gap-2 justify-center flex-wrap items-center">
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
          className="mt-3 border px-3 py-2 rounded"
        />
      </div>

      <div
        className="rounded border shadow bg-white"
        style={{ width }}
      >
        {/* Imitation of Instagram header */}
        <div className="px-4 py-3 border-b text-left font-bold text-sm">upg.ua</div>

        {/* Grid section */}
        <div className="grid grid-cols-3 gap-[1px] bg-black">
          {images.map((img, i) => (
            <div
              key={i}
              className="bg-white overflow-hidden"
              style={{ width: postSize, height: postSize }}
            >
              {img ? (
                <img
                  src={img}
                  alt={`preview-${i}`}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">
                  {i + 1}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
