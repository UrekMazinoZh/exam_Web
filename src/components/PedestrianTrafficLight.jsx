import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

const PedestrianTrafficLight = ({ state, carState, onChange, orientation }) => {
  const isCarGreen = carState === "green";
  const isGo = state === "go";
  const intervalRef = useRef(null);

  const backgroundGradient = "bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-950";

  const handleStateChange = () => {
    if (isCarGreen) return; 
    const next = isGo ? "wait" : "go";
    onChange(next);
  };

  useEffect(() => {
    clearInterval(intervalRef.current);

    if (!isCarGreen) {
      intervalRef.current = setInterval(() => {
        const next = isGo ? "wait" : "go";
        onChange(next);
      }, 10000);
    }

    return () => clearInterval(intervalRef.current);
  }, [isCarGreen, isGo, onChange]);

  return (
    <div
      className={`${
        orientation === "horizontal" ? "flex-row" : "flex-col"
      } flex items-center justify-center gap-4 mt-5`}
    >
      <motion.div
        className={`${
          orientation === "horizontal" ? "w-64 h-24" : "w-24 h-64"
        } ${backgroundGradient} rounded-lg flex ${
          orientation === "horizontal" ? "flex-row" : "flex-col"
        } justify-around items-center py-5`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className={`w-16 h-16 rounded-full ${
            state === "wait" ? "bg-red-600" : "bg-red-200"
          }`}
          animate={{ scale: state === "wait" ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.div
          className={`w-16 h-16 rounded-full ${
            state === "go" ? "bg-green-500" : "bg-green-200"
          }`}
          animate={{ scale: state === "go" ? [1, 1.1, 1] : 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <button
        onClick={handleStateChange}
        disabled={isCarGreen}
        className={`px-4 py-2 rounded text-white ${
          isCarGreen ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {isCarGreen ? "Чекайте..." : "Змінити стан"}
      </button>
    </div>
  );
};

PedestrianTrafficLight.propTypes = {
  state: PropTypes.oneOf(["go", "wait"]).isRequired,
  carState: PropTypes.oneOf(["red", "gold", "green"]).isRequired,
  onChange: PropTypes.func.isRequired,
  orientation: PropTypes.oneOf(["horizontal", "vertical"]).isRequired,
};

export default PedestrianTrafficLight;
