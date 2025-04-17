import PropTypes from "prop-types";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Light = ({ tlColor = "red", brightness = 1, blinkCount = 2, isBlinking }) => {
  const [blinkState, setBlinkState] = useState(false);

  useEffect(() => {
    if (isBlinking) {
      setBlinkState(true);
      setTimeout(() => setBlinkState(false), 1000 * blinkCount);
    }
  }, [isBlinking, blinkCount]);

  const handleClick = () => {
    setBlinkState(true);
    setTimeout(() => setBlinkState(false), 1000 * blinkCount); 
  };

  return (
    <motion.div
      onClick={handleClick}
      animate={blinkState ? { opacity: [1, 0.3, 1] } : {}}
      transition={blinkState ? { duration: 1, repeat: blinkCount - 1 } : {}}
      style={{
        position: "relative",
        backgroundColor: tlColor,
        width: 100,
        height: 100,
        borderRadius: "50%",
        margin: "5px",
        boxShadow: blinkState ? `0 0 20px ${tlColor}` : "none",
        filter: `brightness(${brightness})`, 
      }}
    />
  );
};

Light.propTypes = {
  tlColor: PropTypes.string.isRequired,
  brightness: PropTypes.number.isRequired,
  blinkCount: PropTypes.number.isRequired,
  isBlinking: PropTypes.bool.isRequired, // додано новий пропс
};

export default Light;
