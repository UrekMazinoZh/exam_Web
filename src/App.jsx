import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StatsBar from "./components/StatsBar";
import TrafficLights from "./components/TrafficLights";
import Header from "./components/Header";
import Home from "./pages/Home";
import ErrorPage from "./pages/ErrorPage";
import PedestrianTrafficLight from "./components/PedestrianTrafficLight";
import { TrafficLightsProvider, useTrafficLights } from "./context/TrafficLightsProvider";

function AppContent() {
  const { data, updateData } = useTrafficLights();

  const handleClick = async (color, isHorizontal) => {
    if (!data) return;

    const updatedData = { ...data };

    if (isHorizontal) {
      updatedData.clickCountsHorizontal[color] += 1;
      updatedData.stateHorizontal = color;
      updatedData.pedestrianHorizontal =
        color === "red" ? "go" : color === "green" ? "wait" : updatedData.pedestrianHorizontal;
    } else {
      updatedData.clickCountsVertical[color] += 1;
      updatedData.stateVertical = color;
      updatedData.pedestrianVertical =
        color === "red" ? "go" : color === "green" ? "wait" : updatedData.pedestrianVertical;
    }

    await updateData(updatedData);
  };

  const resetClickCountsHorizontal = async () => {
    const updatedData = { ...data, clickCountsHorizontal: { red: 0, gold: 0, green: 0 } };
    await updateData(updatedData);
  };

  const resetClickCountsVertical = async () => {
    const updatedData = { ...data, clickCountsVertical: { red: 0, gold: 0, green: 0 } };
    await updateData(updatedData);
  };

  if (!data) {
    return (
      <p className="flex justify-center items-center h-screen text-lg text-white">
        Завантаження...
      </p>
    );
  }

  return (
    <Router>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-900 text-white py-12 px-5 sm:px-20">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/horizontal"
            element={
              <>
                <StatsBar
                  orientation="horizontal"
                  clickCounts={data.clickCountsHorizontal}
                  brightness={data.brightness}
                  setBrightness={(val) => updateData({ ...data, brightness: val })}
                  blinkCount={data.blinkCount}
                  setBlinkCount={(val) => updateData({ ...data, blinkCount: val })}
                  state={data.stateHorizontal}
                  resetClickCounts={resetClickCountsHorizontal}
                />
                <div className="flex flex-col gap-10 items-center">
                  <TrafficLights
                    orientation="horizontal"
                    onClick={(color) => handleClick(color, true)}
                    brightness={data.brightness}
                    blinkCount={data.blinkCount}
                    state={data.stateHorizontal} // передаємо поточний стан
                  />
                  <PedestrianTrafficLight
                    state={data.pedestrianHorizontal}
                    carState={data.stateHorizontal}
                    onChange={(newState) =>
                      updateData({ ...data, pedestrianHorizontal: newState })
                    }
                    orientation="horizontal"
                  />
                </div>
              </>
            }
          />

          <Route
            path="/vertical"
            element={
              <>
                <StatsBar
                  orientation="vertical"
                  clickCounts={data.clickCountsVertical}
                  brightness={data.brightness}
                  setBrightness={(val) => updateData({ ...data, brightness: val })}
                  blinkCount={data.blinkCount}
                  setBlinkCount={(val) => updateData({ ...data, blinkCount: val })}
                  state={data.stateVertical}
                  resetClickCounts={resetClickCountsVertical}
                />
                <div className="flex gap-10 items-start">
                  <TrafficLights
                    orientation="vertical"
                    onClick={(color) => handleClick(color, false)}
                    brightness={data.brightness}
                    blinkCount={data.blinkCount}
                    state={data.stateVertical} // передаємо поточний стан
                  />
                  <PedestrianTrafficLight
                    state={data.pedestrianVertical}
                    carState={data.stateVertical}
                    onChange={(newState) =>
                      updateData({ ...data, pedestrianVertical: newState })
                    }
                    orientation="vertical"
                  />
                </div>
              </>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </Router>
  );
}


export default function App() {
  return (
    <TrafficLightsProvider>
      <AppContent />
    </TrafficLightsProvider>
  );
}
