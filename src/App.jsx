import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import gifshot from "gifshot";
import videoFire from "./assets/video-2.mp4";
import { motion } from "framer-motion"

const App = () => {
  const [companyName, setCompanyName] = useState("");
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");
  const [input4, setInput4] = useState("");
  const [borderColor, setBorderColor] = useState("#000000"); // Default border color
  const [gifUrl, setGifUrl] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [showDelete, setShowDelete] = useState(false); // Show delete button on hover
  const templateRef = useRef(null);

  const handleGenerateGif = async () => {
    if (!templateRef.current) {
      console.error("Template element not found.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const frames = [];
      const inputs = [input1, input2, input3, input4];
      const interval = 500; // milliseconds

      for (let i = 0; i < inputs.length; i++) {
        // Set the input text for the current frame
        templateRef.current.querySelector(".company-input").textContent =
          inputs[i];

        // Capture the frame
        const frame = await captureFrame(templateRef.current);
        frames.push(frame);

        // Wait before capturing the next frame
        await new Promise((resolve) => setTimeout(resolve, interval));
      }

      gifshot.createGIF(
        {
          images: frames,
          gifWidth: 720,
          gifHeight: 90,
          interval: 0.5,
          repeat: 0, // Ensure the GIF loops indefinitely
        },
        (obj) => {
          if (!obj.error) {
            setGifUrl(obj.image);
          } else {
            console.error("Error generating GIF:", obj.errorMsg);
          }
          setLoading(false); // Stop loading
        },
      );
    } catch (error) {
      console.error("Error generating GIF:", error);
      setLoading(false); // Stop loading even on error
    }
  };

  const captureFrame = (element) => {
    return new Promise((resolve) => {
      toPng(element, { width: 720, height: 90 }).then((canvas) => {
        resolve(canvas);
      });
    });
  };

  const handleDeleteGif = () => {
    setGifUrl(""); // Clear the GIF URL to remove the GIF
  };

  return (
    <div className="p-4 max-w-[720px] w-full mx-auto">
      <h1></h1>
      <div className="max-w-[520px] space-y-6 mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="w-2/4">
            <input
              type="text"
              placeholder="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="outline-none border-b-2 py-1 border-cyan-400 w-[200px] focus:w-[250px] focus:border-b-2 focus:border-cyan-500 transition-all duration-300"
            />
          </div>
          <div className="w-2/4">
            <input
              type="color"
              value={borderColor}
              onChange={(e) => setBorderColor(e.target.value)}
              className="outline-none py-1 w-[200px] focus:w-[250px] transition-all duration-300"
              style={{ borderBottom: `2px solid ${borderColor}` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="w-2/4">
            <input
              type="text"
              value={input1}
              onChange={(e) => setInput1(e.target.value)}
              placeholder="Company Tag"
              className="outline-none border-b-2 py-1 border-cyan-400 w-[200px] focus:w-[250px] focus:border-b-2 focus:border-cyan-500 transition-all duration-300"
            />
          </div>
          <div className="w-2/4">
            <input
              type="text"
              value={input2}
              onChange={(e) => setInput2(e.target.value)}
              placeholder="Company Tag"
              className="outline-none border-b-2 py-1 border-cyan-400 w-[200px] focus:w-[250px] focus:border-b-2 focus:border-cyan-500 transition-all duration-300"
            />
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="w-2/4">
            <input
              type="text"
              value={input3}
              onChange={(e) => setInput3(e.target.value)}
              placeholder="Company Tag"
              className="outline-none border-b-2 py-1 border-cyan-400 w-[200px] focus:w-[250px] focus:border-b-2 focus:border-cyan-500 transition-all duration-300"
            />
          </div>
          <div className="w-2/4">
            <input
              type="text"
              value={input4}
              onChange={(e) => setInput4(e.target.value)}
              placeholder="Company Tag"
              className="outline-none border-b-2 py-1 border-cyan-400 w-[200px] focus:w-[250px] focus:border-b-2 focus:border-cyan-500 transition-all duration-300"
            />
          </div>
        </div>

        <button
          onClick={handleGenerateGif}
          className="p-2 bg-blue-500 text-white rounded"
          disabled={loading} // Disable button while loading
        >
          {loading ? "Generating..." : "Generate GIF"}
        </button>
      </div>

      <div
        ref={templateRef}
        style={{
          borderColor: borderColor,
          borderWidth: "1.5px",
          borderStyle: "solid",
          // width: "720px",
          width: "100%",
          height: "90px",
          backgroundColor: "#000",
          animation: "border-pulse 3s infinite",
        }}
        className="mx-auto flex items-center justify-between  bg-white relative overflow-hidden rounded-md"
      >

        {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    style={{
      position: "absolute",
      top: "50%",
      left: "50%",
      minWidth: "100%",
      minHeight: "100%",
      width: "auto",
      height: "auto",
      zIndex: 1, // Set the video behind other elements
      transform: "translate(-50%, -50%)",
      objectFit: "cover"
    }}
  >
    <source src={videoFire} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent transform z-10 overflow-hidden"></div>
        <motion.div initial={{x:-50}} animate={{ x: 0 }} className="company-name text-lg text-amber-300 animate-pulse font-bold z-20 pl-4">
          {companyName}
        </motion.div>
        <div className={`absolute left-[40%] h-[94px] w-1 rotate-12 animate-pulse shadow-lg drop-shadow-lg before:content-[" "] before:left-[40%] before:w-[4px] before:h-full before:bg-green-500 z-[999]`}
          style={{
            backgroundColor: borderColor
          }}
        ></div>
        <div className="company-input text-lg text-white z-20 pr-4 animate-slide-in font-bold" style={{color: borderColor}}></div>
      </div>

      {loading && (
        <div className="flex justify-center items-center">
          <div className="loader">Loading...</div>
        </div>
      )}

      <div className="py-5"></div>

      {gifUrl && !loading && (
        <div
          className="relative flex flex-col items-center space-y-4"
          onMouseEnter={() => setShowDelete(true)}
          onMouseLeave={() => setShowDelete(false)}
        >
          <img
            src={gifUrl}
            alt="Generated GIF"
            // className="w-[720px] h-[90px]"
            // className="w-full h-[90px]"
          />
          {showDelete && (
            <button
              onClick={handleDeleteGif}
              className="absolute top-2 -right-10 p-1 bg-red-500 text-white rounded-full"
            >
              ✕
            </button>
          )}
          <a
            href={gifUrl}
            download="generated.gif"
            className="p-2 bg-green-500 text-white rounded"
          >
            Download GIF
          </a>
        </div>
      )}
    </div>
  );
};

export default App;
