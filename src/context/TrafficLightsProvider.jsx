import { createContext, useContext, useEffect, useState, useRef } from "react";

const TrafficLightsContext = createContext();

export const TrafficLightsProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const intervalRef = useRef(null);
  const STATES = ["red", "gold", "green"];

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://traffic-light-api.onrender.com/trafficLights");
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const updateData = async (newData) => {
    setData(newData);
    await fetch("https://traffic-light-api.onrender.com/trafficLights", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    });
  };

  const getNextState = (currentState) => {
    const index = STATES.indexOf(currentState);
    return STATES[(index + 1) % STATES.length];
  };

  const autoSwitch = () => {
    if (!data) return;

    const updatedData = { ...data };

    // Горизонтальний
    const nextH = getNextState(data.stateHorizontal);
    updatedData.stateHorizontal = nextH;
    updatedData.pedestrianHorizontal = nextH === "red" ? "go" : nextH === "green" ? "wait" : updatedData.pedestrianHorizontal;

    // Вертикальний
    const nextV = getNextState(data.stateVertical);
    updatedData.stateVertical = nextV;
    updatedData.pedestrianVertical = nextV === "red" ? "go" : nextV === "green" ? "wait" : updatedData.pedestrianVertical;

    updateData(updatedData);
  };

  const startAutoSwitch = () => {
    if (intervalRef.current) return; // вже запущено
    intervalRef.current = setInterval(autoSwitch, 10000);
  };

  const stopAutoSwitch = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    if (data) {
      startAutoSwitch();
    }
    return () => stopAutoSwitch();
  }, [data]);

  return (
    <TrafficLightsContext.Provider
      value={{
        data,
        updateData,
        startAutoSwitch,
        stopAutoSwitch,
      }}
    >
      {children}
    </TrafficLightsContext.Provider>
  );
};

export const useTrafficLights = () => useContext(TrafficLightsContext);
