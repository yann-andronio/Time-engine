import React, { Fragment } from 'react';

export default function CompteARebours({ data }) {
  return (
    <Fragment>
      <h2 className="text-xl font-bold mt-5">Données récupérées :</h2>
      <div className="mt-4 bg-gray-100 p-4 rounded shadow">

        {/* Affichage du type de matériel uniquement s'il est valide */}
        {data.selectedMaterialType && data.selectedMaterialType.trim() !== '' && (
          <>
            <h3 className="text-lg font-semibold">Type de matériel :</h3>
            <p>{data.selectedMaterialType}</p>
          </>
        )}

        {/* Affichage de la limitation de temps uniquement s'il y a des valeurs valides */}
        {data.limiterTempsValues && Object.keys(data.limiterTempsValues).length > 0 && (
          <>
            <h3 className="text-lg font-semibold">Limitation de temps :</h3>
            <ul>
              {Object.entries(data.limiterTempsValues).map(([key, value]) => {
                // Vérifiez si les heures et les minutes sont null ou 0
                if ((key === "heure" && (value !== null && value !== 0)) ||
                  (key === "min" && (value !== null && value !== 0)) ||
                  (key !== "heure" && key !== "min" && value !== null && value !== 0 && value !== '')) {
                  return (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  );
                }
                return null; // Ignore les valeurs nulles ou 0
              })}
            </ul>
          </>
        )}

        {/* Affichage des informations de paiement uniquement s'il y a des valeurs valides */}
        {data.paymentInputs && Object.keys(data.paymentInputs).length > 0 && (
          <>
            <h3 className="text-lg font-semibold">Informations de paiement :</h3>
            <ul>
              {Object.entries(data.paymentInputs).map(([key, value]) => {
                if (value !== null && value !== 0 && value !== '') {
                  return (
                    <li key={key}>
                      {key}: {value}
                    </li>
                  );
                }
                return null; // Ignore les valeurs nulles ou 0
              })}
            </ul>
          </>
        )}
      </div>
    </Fragment>
  );
}
