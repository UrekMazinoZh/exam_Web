import PropTypes from "prop-types";

const StatsBar = ({
  orientation,
  clickCounts,
  brightness,
  setBrightness,
  blinkCount,
  setBlinkCount,
  state,
  resetClickCounts
}) => {
  const handleBrightnessChange = (change, event) => {
    event.preventDefault();
    setBrightness(change === 'increase' ? Math.min(2, brightness + 0.1) : Math.max(0.1, brightness - 0.1));
  };

  const handleBlinkCountChange = (change, event) => {
    event.preventDefault();
    setBlinkCount(change === 'increase' ? blinkCount + 1 : Math.max(1, blinkCount - 1));
  };

  const handleResetClickCounts = (event) => {
    event.preventDefault();
    resetClickCounts();  
  };

  return (
    <div className="p-5 bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-950 text-white rounded-lg shadow-md text-center mb-5 transform transition-all duration-500 hover:scale-105">
      <h3 className="text-lg font-semibold">Statistics ({orientation})</h3>
      <p>Red: {clickCounts.red}, Yellow: {clickCounts.gold}, Green: {clickCounts.green}</p>

      <p className="mt-2">Current State: <span className={`badge badge-${state}`}>{state}</span></p>

      <div className="flex items-center justify-center gap-2 mt-3">
        <label>Brightness:</label>
        <button className="btn btn-sm btn-outline" type="button" onClick={(event) => handleBrightnessChange('decrease', event)}>-</button>
        <span>{Math.round(brightness * 100)}%</span>
        <button className="btn btn-sm btn-outline" type="button" onClick={(event) => handleBrightnessChange('increase', event)}>+</button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-3">
        <label>Blink Count:</label>
        <button className="btn btn-sm btn-outline" type="button" onClick={(event) => handleBlinkCountChange('decrease', event)}>-</button>
        <span>{blinkCount}</span>
        <button className="btn btn-sm btn-outline" type="button" onClick={(event) => handleBlinkCountChange('increase', event)}>+</button>
      </div>

      <div className="mt-5">
        <button 
          className="btn btn-sm btn-danger" 
          type="button" 
          onClick={handleResetClickCounts}
        >
          Reset Click Counts
        </button>
      </div>
    </div>
  );
};

StatsBar.propTypes = {
  orientation: PropTypes.string.isRequired,
  clickCounts: PropTypes.object.isRequired,
  brightness: PropTypes.number.isRequired,
  setBrightness: PropTypes.func.isRequired,
  blinkCount: PropTypes.number.isRequired,
  setBlinkCount: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
  resetClickCounts: PropTypes.func.isRequired,
};

export default StatsBar;
