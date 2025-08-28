import React, { useState, useEffect } from 'react';

export default function PAMCalculator() {
  const [sistolica, setSistolica] = useState('');
  const [diastolica, setDiastolica] = useState('');
  const [pam, setPam] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [mensajeJarabe, setMensajeJarabe] = useState('');

  // Calcular el día del año actual
  useEffect(() => {
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);
    const dayOfYear = Math.floor((today - startOfYear) / (1000 * 60 * 60 * 24)) + 1;
    
    if (dayOfYear % 2 === 0) {
      setMensajeJarabe('Hoy se debe tomar el jarabe (día par)');
    } else {
      setMensajeJarabe('Hoy no se debe tomar el jarabe (día impar)');
    }
  }, []);

  const calcularPAM = () => {
    // Verificar si los campos están vacíos
    if (!sistolica || !diastolica) {
      setMensaje('Ingrese los valores de presión');
      setPam(null);
      return;
    }

    const presionSistolica = parseFloat(sistolica);
    const presionDiastolica = parseFloat(diastolica);

    // Verificar que la presión sistólica sea mayor a la diastólica
    if (presionSistolica <= presionDiastolica) {
      setMensaje('Error: La presión sistólica debe ser mayor a la diastólica');
      setPam(null);
      return;
    }

    // Calcular PAM: PAM = (Sistólica + 2 × Diastólica) / 3
    const pamCalculada = (presionSistolica + 2 * presionDiastolica) / 3;
    setPam(pamCalculada.toFixed(1));

    // Determinar el mensaje según el valor de PAM
    if (pamCalculada <= 60) {
      setMensaje('Atención: No dar nada. Reportar!');
    } else if (pamCalculada > 60 && pamCalculada < 82) {
      setMensaje('Dar sólo la dosis base.');
    } else {
      setMensaje('Añadir media pastilla de Furosemida 40mg');
    }
  };

  const limpiar = () => {
    setSistolica('');
    setDiastolica('');
    setPam(null);
    setMensaje('');
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-md mx-auto bg-white border border-gray-300 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Calculadora de PAM
        </h1>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presión Sistólica (mmHg)
            </label>
            <input
              type="number"
              value={sistolica}
              onChange={(e) => setSistolica(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              placeholder="Ej: 120"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Presión Diastólica (mmHg)
            </label>
            <input
              type="number"
              value={diastolica}
              onChange={(e) => setDiastolica(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              placeholder="Ej: 80"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={calcularPAM}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Calcular
            </button>
            <button
              onClick={limpiar}
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-md transition duration-200"
            >
              Limpiar
            </button>
          </div>

          {pam && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold text-center">
                PAM = {pam} mmHg
              </p>
            </div>
          )}

          {mensaje && (
            <div className={`mt-4 p-4 rounded-md ${
              mensaje.includes('Error') || mensaje.includes('Atención') 
                ? 'bg-red-100 border border-red-300 text-red-700'
                : mensaje.includes('Ingrese')
                ? 'bg-yellow-100 border border-yellow-300 text-yellow-700'
                : 'bg-blue-100 border border-blue-300 text-blue-700'
            }`}>
              <p className="text-center font-medium">{mensaje}</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-purple-100 border border-purple-300 rounded-md">
            <p className="text-center text-purple-700 font-medium">
              {mensajeJarabe}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
