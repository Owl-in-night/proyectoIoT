import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUnlock, faLightbulb, faBolt } from '@fortawesome/free-solid-svg-icons';
import { SlLogout } from 'react-icons/sl';
import { useAuth } from '../context/authContext';
import { useLanguage } from '../context/LanguageContext';

function Manual() {
  const { language, translations } = useLanguage();
  const texts = translations[language];

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
  const { signout, loading, user } = useAuth();

  const releService = async () => {
    setLoadingChapa(true);
    setError(null);
    try {
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
      console.error('Error del servicio:', error);
      setError('Hubo un problema al iniciar el servicio. Por favor, inténtalo de nuevo más tarde.');
      setLoadingChapa(false);
    }
  };

  const lucesService = async (light, setLight, setLoadingLight, currentLightState, setIcon) => {
    setLoadingLight(true);
    setError(null);
    try {
      setLoadingLight(false);
      setLight(!currentLightState);
      const newIcon = currentLightState ? faLightbulb : faBolt;
      setIcon(newIcon);
    } catch (error) {
      console.error('Error del servicio:', error);
      setError('Hubo un problema al iniciar el servicio. Por favor, inténtalo de nuevo más tarde.');
      setLoadingLight(false);
    }
  };

  const formatDateTime = (dateTime) => {
    if (!dateTime) return '- - -';
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZoneName: 'short',
    };
    return dateTime.toLocaleString('en-US', options);
  };

  const handleSignout = async () => {
    try {
      await signout();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <h1>{texts.app.loading}</h1>;

  return (
    <div className="w-full h-full">
      {/* Encabezado */}
      <header className="flex justify-between items-center p-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {texts.app.electronicLock}
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-4">
            <img
              src={user?.photoURL || 'https://via.placeholder.com/40'}
              alt="Profile"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full"
            />
            <span className="hidden md:inline text-gray-900 dark:text-gray-100">
              {texts.app.welcome} {user?.displayName || 'User'}
            </span>
          </div>
          <button>
            <SlLogout className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-[#080808] dark:text-[#EFEEEE]" />
          </button>
        </div>
      </header>

      {/* Contenido Principal */}
      <div className="flex flex-col items-center p-5">
        {/* Sección de Estado de Ingreso y Egreso */}
        <div className="w-full flex flex-col md:flex-row justify-around mt-10">
          <div className="text-center mb-4 md:mb-0">
            <p className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2">
              {texts.app.timeDateIncome}
            </p>
            <p className="font-semibold text-md sm:text-lg md:text-xl text-gray-900 dark:text-gray-100">
              {formatDateTime(ingreso)}
            </p>
          </div>
          <div className="text-center">
            <p className="font-semibold text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2">
              {texts.app.timeDateEgress}
            </p>
            <p className="font-semibold text-md sm:text-lg md:text-xl text-gray-900 dark:text-gray-100">
              {formatDateTime(egreso)}
            </p>
          </div>
        </div>

        {/* Sección de Control de Puerta y Luces */}
        <div className="flex flex-col items-center justify-center mb-12 mt-24 space-y-8 md:flex-row md:justify-center md:space-x-20 md:space-y-0">
          {/* Botón de Control de Puerta */}
          <button
            className={`focus:outline-none ${iconColorDoor} font-medium rounded-full text-2xl sm:text-3xl md:text-4xl md:w-24 md:h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center md:mx-0 mx-4`}
            onClick={releService}
            disabled={loadingChapa}
          >
            <FontAwesomeIcon
              icon={iconColorDoor === 'text-black' ? faLock : faUnlock}
              size="3x"
              className={iconColorDoor === 'text-black' ? 'text-[#434343] mb-1' : 'text-green-500 mb-1'}
            />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 dark:text-[#EFEEEE]">
              {iconColorDoor === 'text-black' ? texts.app.lock : texts.app.unlock}
            </span>
          </button>

          {/* Botones de Control de Luces */}
          <button
            className={`focus:outline-none ${lucesA ? 'text-yellow-500' : 'text-black'} font-medium rounded-full text-2xl sm:text-3xl md:text-4xl md:w-24 md:h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center md:mx-0 mx-4`}
            onClick={() => lucesService('luzA', setLucesA, setLoadingLuzA, lucesA, setIconLuzA)}
            disabled={loadingLuzA}
          >
            <FontAwesomeIcon
              icon={iconLuzA}
              size="3x"
              className={lucesA ? 'text-yellow-500 mb-1' : 'text-[#434343] mb-1'}
            />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 dark:text-[#EFEEEE]">
              {lucesA ? texts.app.on : texts.app.off}
            </span>
          </button>

          <button
            className={`focus:outline-none ${lucesB ? 'text-yellow-500' : 'text-black'} font-medium rounded-full text-2xl sm:text-3xl md:text-4xl md:w-24 md:h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center md:mx-0 mx-4`}
            onClick={() => lucesService('luzB', setLucesB, setLoadingLuzB, lucesB, setIconLuzB)}
            disabled={loadingLuzB}
          >
            <FontAwesomeIcon
              icon={iconLuzB}
              size="3x"
              className={lucesB ? 'text-yellow-500 mb-1' : 'text-[#434343] mb-1'}
            />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 dark:text-[#EFEEEE]">
              {lucesB ? texts.app.on : texts.app.off}
            </span>
          </button>

          <button
            className={`focus:outline-none ${lucesC ? 'text-yellow-500' : 'text-black'} font-medium rounded-full text-2xl sm:text-3xl md:text-4xl md:w-24 md:h-24 lg:w-32 lg:h-32 flex flex-col items-center justify-center md:mx-0 mx-4`}
            onClick={() => lucesService('luzC', setLucesC, setLoadingLuzC, lucesC, setIconLuzC)}
            disabled={loadingLuzC}
          >
            <FontAwesomeIcon
              icon={iconLuzC}
              size="3x"
              className={lucesC ? 'text-yellow-500 mb-1' : 'text-[#434343] mb-1'}
            />
            <span className="text-md sm:text-lg md:text-xl lg:text-2xl mt-1 dark:text-[#EFEEEE]">
              {lucesC ? texts.app.on : texts.app.off}
            </span>
          </button>
        </div>

        {/* Mensaje de Error */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 w-full max-w-md text-center">
            <p>{texts.app.error}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Manual;
