import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import persons from "./DataJson/human";
import Nabvar from "./components/Nabvar";

const FaceRecognition = () => {
  const videoRef = useRef(null);
  const [totalEntries, setTotalEntries] = useState(0);
  const [unknownPeople, setUnknownPeople] = useState([]);
  const [personCounts, setPersonCounts] = useState({});
  const [entryHistory, setEntryHistory] = useState({});
  const [currentMatches, setCurrentMatches] = useState([]);
  const recognizedPeopleRef = useRef(new Map());
  const entryHistoryRef = useRef(new Map());
  const unknownPeopleRef = useRef(new Map());
  const [faceMatcher, setFaceMatcher] = useState(null);

  useEffect(() => {
    const loadModels = async () => {
      await Promise.all([
        faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      ]);
      console.log("✅ Models Loaded");

      const matcher = await createFaceMatcher();
      setFaceMatcher(matcher);
      startWebcam();
    };

    loadModels();
  }, []);

  const createFaceMatcher = async () => {
    const labeledFaceDescriptors = [];

    for (const person of persons) {
      try {
        const imagePaths = Array.isArray(person.imagePaths) ? person.imagePaths : [person.imagePath];
        const descriptors = [];

        for (const imagePath of imagePaths) {
          const img = await faceapi.fetchImage(imagePath);
          const detection = await faceapi
            .detectSingleFace(img, new faceapi.SsdMobilenetv1Options())
            .withFaceLandmarks()
            .withFaceDescriptor();

          if (detection) descriptors.push(detection.descriptor);
        }

        if (descriptors.length > 0) {
          labeledFaceDescriptors.push(new faceapi.LabeledFaceDescriptors(person.label, descriptors));
        }
      } catch (error) {
        console.error(`❌ Error loading images for ${person.label}:`, error);
      }
    }

    return labeledFaceDescriptors.length > 0 ? new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6) : null;
  };

  const startWebcam = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => console.error("❌ Error accessing webcam:", error));
  };

  useEffect(() => {
    if (!faceMatcher) return;
    const video = videoRef.current;
    if (!video) return;

    const detectInterval = setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
        .withFaceLandmarks()
        .withFaceDescriptors();

      if (detections.length === 0) {
        setCurrentMatches([]);
        return;
      }

      const currentTime = new Date().getTime();
      const matches = [];

      detections.forEach((detection) => {
        const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
        let matchText = bestMatch.label;

        matches.push(matchText);

        if (matchText === "unknown") {
          if (!unknownPeopleRef.current.has("Unknown")) {
            unknownPeopleRef.current.set("Unknown", currentTime);
            setUnknownPeople((prev) => [...prev, "Unknown"]);
            console.log("❌ Unknown person detected");
          }
          return;
        }

        const lastEntryTime = recognizedPeopleRef.current.get(matchText) || 0;
        if (currentTime - lastEntryTime > 180000) {
          recognizedPeopleRef.current.set(matchText, currentTime);
          setPersonCounts((prev) => ({
            ...prev,
            [matchText]: (prev[matchText] || 0) + 1,
          }));
          setTotalEntries((prev) => prev + 1);
          console.log(`🟢 ${matchText} entered at ${new Date().toLocaleTimeString()}`);

          const newHistory = { ...entryHistoryRef.current };
          if (!newHistory[matchText]) newHistory[matchText] = [];
          newHistory[matchText].push(new Date().toLocaleTimeString());
          entryHistoryRef.current = newHistory;
          setEntryHistory(newHistory);
        }
      });

      setCurrentMatches(matches);
    }, 1000);

    return () => clearInterval(detectInterval);
  }, [faceMatcher]);

  return (
    <>
      <Nabvar />
      <h2 className="text-center text-3xl sm:text-4xl m-6 font-serif text-red-500 underline bg-green-400 p-2 rounded-2xl shadow-xl">
        🎥 Face Recognition System
      </h2>

      {/* Responsive Video Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-green-200">
        <div className="relative ">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="border w-[90vw] max-w-[700px] h-[400px] rounded-md shadow-xl"
          />
          <div className="absolute top-0 left-0 w-full p-2 bg-black bg-opacity-60 text-white text-center text-base sm:text-lg rounded-md">
            {currentMatches.length > 0 ? (
              currentMatches.map((match, index) => (
                <div key={index}>
                  {match === "unknown" ? "❌ Unknown Person" : `✅ ${match}`}
                </div>
              ))
            ) : (
              <div>No one detected</div>
            )}
          </div>
          
        </div>
                    <div className=" h-[400px] w-[90vw] border text-red-500"> this </div>
      </div>

      {/* Responsive Stats Section */}
      <div className="flex flex-col lg:flex-row justify-evenly p-5 gap-6">
        <div className="bg-amber-400 p-6 sm:p-8 rounded-xl shadow text-center">
          <h3 className="text-2xl sm:text-4xl">📊 Unique Entries: {totalEntries}</h3>
          <h3 className="text-lg sm:text-xl text-red-600">❌ Unknown: {unknownPeople.length}</h3>
        </div>

        <div className="flex flex-col gap-6 p-6 sm:p-8 shadow-2xl rounded-xl bg-white max-h-[400px] overflow-y-auto">
          <h3 className="text-xl sm:text-2xl text-center font-serif text-lime-600">
            📌 Entry History
          </h3>
          <ul className="text-[16px] sm:text-[18px] font-serif space-y-2">
            {Object.entries(entryHistory).map(([name, times]) => (
              <li key={name}>
                {name}: {times.length} times
                <ul className="text-sm text-gray-600 pl-4">
                  {times.map((time, index) => (
                    <li key={index}>📍 {time}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default FaceRecognition;
