// Instagram Grid Preview Web App - GRID LINES + CROPPING SIMULATION

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const devices = {
  "iPhone 15 Pro": { width: 393, height: 393 },
  "iPhone 15 Pro Max": { width: 430, height: 430 },
  "iPhone SE": { width: 375, height: 375 },
  "Pixel 7": { width: 412, height: 412 },
  "Galaxy S23": { width: 390, height: 390 }
};

function App() {
  const [selectedDevice, setSelectedDevice] = useState("iPhone 15 Pro");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.slice(0, 9).map((file) => URL.createObjectURL(file));
    setImages(urls);
  };

  const { width, height } = devices[selectedDevice];

  return (
    <div className="p-4 space-y-4 font-sans max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">Instagram Grid Preview</h1>

      <div>
        <label className="font-semibold">Оберіть пристрій:</label>
        <select
          className="ml-2 border px-2 py-1 rounded"
          value={selectedDevice}
          onChange={(e) => setSelectedDevice(e.target.value)}
        >
          {Object.keys(devices).map((device) => (
            <option key={device}>{device}</option>
          ))}
        </select>
      </div>

      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="border px-3 py-2 rounded"
      />

      <div
        className="relative mx-auto bg-white"
        style={{ width, height }}
      >
        <div className="grid grid-cols-3 grid-rows-3 w-full h-full">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="relative overflow-hidden border border-gray-300 flex items-center justify-center"
            >
              {images[i] ? (
                <img
                  src={images[i]}
                  alt={`preview-${i}`}
                  className="w-full h-full object-cover aspect-square"
                />
              ) : (
                <span className="text-gray-300 text-sm absolute">{i + 1}</span>
              )}
            </div>
          ))}
        </div>

        {/* Grid overlay lines */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-10">
          {[1, 2].map((i) => (
            <div
              key={`h-${i}`}
              className="absolute border-t border-dashed border-black/30"
              style={{ top: `${(i * 100) / 3}%`, width: "100%" }}
            />
          ))}
          {[1, 2].map((i) => (
            <div
              key={`v-${i}`}
              className="absolute border-l border-dashed border-black/30"
              style={{ left: `${(i * 100) / 3}%`, height: "100%" }}
            />
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
