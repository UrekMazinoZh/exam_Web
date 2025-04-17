import PropTypes from "prop-types";
import Light from "./Light";
import { motion } from "framer-motion";

const TrafficLights = ({ orientation = "vertical", onClick, brightness, blinkCount, state }) => {
  const lights = ["red", "gold", "green"];

  // Перевірка, який світлофори мають моргати в залежності від стану
  const isBlinking = (color) => state === color;

  return (
    <motion.div
      key={orientation}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className={`flex ${orientation === "horizontal" ? "flex-row" : "flex-col"} items-center justify-center p-3 rounded-lg max-w-sm bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-950`}
    >
      {lights.map((color) => (
        <div
          key={color}
          className={`flex ${orientation === "horizontal" ? "flex-col" : "flex-row"} items-center gap-10 cursor-pointer`}
          onClick={() => onClick(color)}
        >
          <Light 
            tlColor={color} 
            brightness={brightness} 
            blinkCount={blinkCount} 
            isBlinking={isBlinking(color)} // передаємо чи цей світлофор має моргати
          />
        </div>
      ))}
    </motion.div>
  );
};

TrafficLights.propTypes = {
  orientation: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  brightness: PropTypes.number.isRequired,
  blinkCount: PropTypes.number.isRequired,
  state: PropTypes.string.isRequired, // додано новий пропс для контролю стану
};

export default TrafficLights;
