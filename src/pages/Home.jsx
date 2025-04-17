import { useTrafficLights } from "../context/TrafficLightsProvider";

const Home = () => {
  const { data, updateData } = useTrafficLights();

  if (!data) return <p className="flex justify-center items-center h-screen text-lg text-white">Loading...</p>;

  const handleReset = async () => {
    const defaultData = {
      clickCountsHorizontal: { red: 0, gold: 0, green: 0 },
      clickCountsVertical: { red: 0, gold: 0, green: 0 },
      brightness: 1,
      blinkCount: 2,
      stateHorizontal: "red",
      stateVertical: "red"
    };

    await updateData(defaultData);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-8">
      <div className="card w-96 bg-gradient-to-r from-indigo-800 via-indigo-900 to-indigo-950 shadow-2xl p-8 rounded-lg transform transition-all duration-500 hover:scale-105">
        <h2 className="text-3xl text-blue-100 font-bold mb-6 text-center">Контроль світлофора</h2>
        <p className="text-lg text-gray-200 text-center mb-4">Цей проект демонструє керування світлофорами та маршрутизацію в React.</p>
        <p className="text-lg text-gray-200 text-center mb-8">Виберіть тип світлофора в меню.</p>

        <div className="bg-gray-800 p-4 rounded-lg mb-6">
          <h3 className="text-xl font-semibold text-yellow-400 mb-4">Поточний стан</h3>
          <p className="text-gray-200">
            Horizontal: <span className={`badge badge-${data.stateHorizontal}`}>{data.stateHorizontal}</span>
          </p>
          <p className="text-gray-200">
            Vertical: <span className={`badge badge-${data.stateVertical}`}>{data.stateVertical}</span>
          </p>
        </div>

        <button 
          className="btn btn-lg btn-danger mt-6 w-full rounded-md shadow-lg transform transition-all duration-300 hover:bg-red-600 hover:scale-105"
          onClick={handleReset}
        >
          Reset Statistics
        </button>
      </div>
    </div>
  );
};

export default Home;
