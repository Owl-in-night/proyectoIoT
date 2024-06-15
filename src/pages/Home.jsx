import { useState } from 'react';
import axios from 'axios';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';

function Home() {
  const [distance, setDistance] = useState(null);
  const [length, setLength] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleMeasure = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://192.168.0.105:5000/promedios');
      setDistance(response.data.promedio_distancia);
      setLength(response.data.promedio_longitud);
    } catch (error) {
      console.error('Error midiendo la distancia:', error);
      setError('Hubo un problema al medir la distancia. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await addDoc(collection(db, 'measurements'), {
        distancia: distance,
        longitud: length,
        timestamp: new Date()
      });
      alert('Datos guardados con éxito');
    } catch (error) {
      console.error('Error añadiendo el documento: ', error);
      setError('Hubo un problema al guardar los datos. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
      <div>
      <div className="flex-1 p-1">
          <h1 className="text-lg font-semibold text-[#434343]">Sistema de Monitoreo y Alerta</h1>
      </div>  
        <h1>Medir Distancia</h1>
        <button onClick={handleMeasure} disabled={loading}>
          {loading ? 'Midiendo...' : 'Medir'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {distance !== null && (
          <div>
            <p>Distancia: {distance} cm</p>
            <p>Longitud: {length} cm</p>
            <button onClick={handleSave} disabled={loading}>
              Guardar Datos
            </button>
          </div>
          )}
      </div>
    </>
  );
}

export default Home;
