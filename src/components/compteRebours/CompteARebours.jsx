import React, { Fragment, useEffect, useState } from 'react';

export default function CompteARebours({ data }) {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (data.limiterTempsValues) {
      const { heure, min } = data.limiterTempsValues;

      // Vérifiez si les valeurs d'heures et de minutes sont valides
      if ((heure && heure > 0) || (min && min > 0)) {
        const totalMinutes = (parseInt(heure) || 0) * 60 + (parseInt(min) || 0);
        setTimeLeft(totalMinutes); // En minutes

        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timer);
              return 0;
            }
            return prev - 1; // Décrémente chaque seconde
          });
        }, 1000);

        return () => clearInterval(timer); // Nettoyer l'intervalle
      }
    }
  }, [data.limiterTempsValues]);

  const formatTime = (minutes) => {
    const remainingMinutes = Math.floor(minutes);
    const remainingSeconds = Math.round((minutes - remainingMinutes) * 60);
    return `${remainingMinutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <Fragment>
      <h2 className="text-xl font-bold mt-5">Données récupérées :</h2>
      <div className="mt-4 bg-gray-100 p-4 rounded shadow">
        {data.selectedMaterialType && data.selectedMaterialType.trim() !== '' && (
          <>
            <h3 className="text-lg font-semibold">Type de matériel :</h3>
            <p>{data.selectedMaterialType}</p>
          </>
        )}

        {data.limiterTempsValues && Object.keys(data.limiterTempsValues).length > 0 && (
          <>
            <h3 className="text-lg font-semibold">Limitation de temps :</h3>
            <ul>
              {Object.entries(data.limiterTempsValues).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </>
        )}

        {timeLeft !== null && (
          <>
            <h3 className="text-lg font-semibold">Compte à rebours :</h3>
            <p>{timeLeft > 0 ? formatTime(timeLeft) : "Temps écoulé !"}</p>
          </>
        )}

        {data.paymentInputs && Object.keys(data.paymentInputs).length > 0 && (
          <>
            <h3 className="text-lg font-semibold">Informations de paiement :</h3>
            <ul>
              {Object.entries(data.paymentInputs).map(([key, value]) => (
                <li key={key}>
                  {key}: {value}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Fragment>
  );
}
