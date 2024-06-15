import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUnlock, faLightbulb, faBolt } from "@fortawesome/free-solid-svg-icons";

function AppWeb() {
  const [loadingChapa, setLoadingChapa] = useState(false);
  const [iconColorDoor, setIconColorDoor] = useState('text-black');
  const [loadingLuzA, setLoadingLuzA] = useState(false);
  const [iconLuzA, setIconLuzA] = useState(faLightbulb);
  const [loadingLuzB, setLoadingLuzB] = useState(false);
  const [iconLuzB, setIconLuzB] = useState(faLightbulb);
  const [loadingLuzC, setLoadingLuzC] = useState(false);
  const [iconLuzC, setIconLuzC] = useState(faLightbulb);
  const [error, setError] = useState(null);
  const [ingreso, setIngreso] = useState(null);
  const [egreso, setEgreso] = useState(null);
  const [lucesA, setLucesA] = useState(false);
  const [lucesB, setLucesB] = useState(false);
  const [lucesC, setLucesC] = useState(false);

  const releService = async () => {
    console.log("releService called");
    setLoadingChapa(true);
    setError(null);
    try {
      const response = await axios.get("http://192.168.147.154:5000/tests");
      console.log("Response from /tests:", response.data);
      setLoadingChapa(response.data.h2);
      setLoadingChapa(false);
      const now = new Date();
      if (!ingreso || egreso) {
        setIngreso(now);
        setEgreso(null);
        setIconColorDoor('text-green-500');
      } else {
        setEgreso(now);
        setIconColorDoor('text-black');
      }
    } catch (error) {
      console.error("Error del servicio:", error);
      setError("Hubo un problema al iniciar el servicio. Por favor, inténtalo de nuevo más tarde.");
      setLoadingChapa(false);
    }
  };

  const lucesService = async (light, setLight, setLoadingLight, currentLightState, setIcon) => {
    console.log(`lucesService called with light: ${light}, currentLightState: ${currentLightState}`);
    setLoadingLight(true);
    setError(null);
    try {
      const url = `http://192.168.147.154:5000/lab/${light}/${currentLightState ? 0 : 1}`;
      console.log(`Sending request to ${url}`);
      const response = await axios.get(url);
      console.log(`Response from ${url}:`, response.data);
      setLoadingLight(false);
      setLight(!currentLightState);
      const newIcon = currentLightState ? faLightbulb : faBolt;
      setIcon(newIcon);
    } catch (error) {
      console.error("Error del servicio:", error);
      setError("Hubo un problema al iniciar el servicio. Por favor, inténtalo de nuevo más tarde.");
      setLoadingLight(false);
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return "- - -";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
    };
    return dateTime.toLocaleString("en-US", options);
  };

  return (
    <>
      <div>
        <div className="flex-1 p-1">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Electronic Lock
          </h1>
        </div>
        <div className="flex flex-col items-center p-5">
          <div className="w-full flex justify-around mt-10">
            <div className="text-center">
              <p className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-2">
                Time & Date Income
              </p>
              <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {formatDateTime(ingreso)}
              </p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-xl text-gray-700 dark:text-gray-300 mb-2">
                Time & Date Egress
              </p>
              <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                {formatDateTime(egreso)}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center mb-12 mt-28 space-y-20 md:flex-row md:justify-center md:space-x-40 md:space-y-0">
            <button
              className={`focus:outline-none ${iconColorDoor} font-medium rounded-full text-3xl md:w-32 md:h-32 flex flex-col items-center justify-center md:mx-0 mx-8`}
              onClick={releService}
              disabled={loadingChapa}
            >
              <FontAwesomeIcon icon={iconColorDoor === 'text-black' ? faUnlock : faLock} size="5x" className={iconColorDoor}/>
              <span className="text-2xl mt-4">{iconColorDoor === 'text-black' ? 'Unlock' : 'Lock'}</span>
            </button>
            <button
              className={`focus:outline-none ${lucesA ? 'text-yellow-500' : 'text-black'} font-medium rounded-full text-3xl md:w-32 md:h-32 flex flex-col items-center justify-center md:mx-0 mx-8`}
              onClick={() =>
                lucesService("luzA", setLucesA, setLoadingLuzA, lucesA, setIconLuzA)
              }
              disabled={loadingLuzA}
            >
              <FontAwesomeIcon icon={iconLuzA} size="5x" className={lucesA ? 'text-yellow-500' : 'text-black'}/>
              <span className="text-2xl mt-4">{lucesA ? 'Off' : 'On'}</span>
            </button>
            <button
              className={`focus:outline-none ${lucesB ? 'text-yellow-500' : 'text-black'} font-medium rounded-full text-3xl md:w-32 md:h-32 flex flex-col items-center justify-center md:mx-0 mx-8`}
              onClick={() =>
                lucesService("luzB", setLucesB, setLoadingLuzB, lucesB, setIconLuzB)
              }
              disabled={loadingLuzB}
            >
              <FontAwesomeIcon icon={iconLuzB} size="5x" className={lucesB ? 'text-yellow-500' : 'text-black'}/>
              <span className="text-2xl mt-4">{lucesB ? 'Off' : 'On'}</span>
            </button>
            <button
              className={`focus:outline-none ${lucesC ? 'text-yellow-500' : 'text-black'} font-medium rounded-full text-3xl md:w-32 md:h-32 flex flex-col items-center justify-center md:mx-0 mx-8`}
              onClick={() =>
                lucesService("luzC", setLucesC, setLoadingLuzC, lucesC, setIconLuzC)
              }
              disabled={loadingLuzC}
            >
              <FontAwesomeIcon icon={iconLuzC} size="5x" className={lucesC ? 'text-yellow-500' : 'text-black'}/>
              <span className="text-2xl mt-4">{lucesC ? 'Off' : 'On'}</span>
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default AppWeb;
