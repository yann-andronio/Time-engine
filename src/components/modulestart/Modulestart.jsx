import React, { Fragment, useState } from 'react';
import Materialtype from '../materialtype/Materialtype';
import Limitertemps from '../limitertemp/Limitertemps';
import Payement from '../payement/Payement';

export default function Modulestart({ onCancel }) {
    const [paymentStatus, setPaymentStatus] = useState('non');
    const [selectedMaterialType, setSelectedMaterialType] = useState('');
    const [limiterTempsValues, setLimiterTempsValues] = useState({});
    const [errorMessageLimiterTemps, setErrorMessageLimiterTemps] = useState('');
    

    const handleMaterialTypeChange = (type) => {
        setSelectedMaterialType(type);
    };

    const handleLimitertempsSubmit = (proprieteTemps) => {
        setLimiterTempsValues(proprieteTemps); 
    };

    const handlePayementSubmit = (chossePayements ) => {
        setPaymentStatus(chossePayements)
    }

    const handleClick = () => {
        const { timeLimit, time, money, heure, min } = limiterTempsValues;

        // Vérification des conditions de limiterTemps
        if (timeLimit) {
            // Vérifie si ni `time`, ni `money`, ni `heure` et `min` ne sont définis correctement
            if (!time && !money && (heure === "0" || heure == null) && (min === "0" || min == null)) {
                setErrorMessageLimiterTemps('Veuillez sélectionner un temps ou un montant avant de confirmer.');
                return;
            }
        }

        // Réinitialisation du message d'erreur
        setErrorMessageLimiterTemps('');

        // Logique supplémentaire après la validation
        console.log('Type de matériel choisi:', selectedMaterialType);
        console.log('Valeurs de limitation de temps:', limiterTempsValues);
        console.log("Efa naloa ve izy : ", paymentStatus);
    };




    return (
        <Fragment>
            <div className="bg-white rounded-lg shadow-lg p-6 mx-auto">
                <form className=' gap-3 '>
                    <div className="flex gap-8">
                        <Materialtype onMaterialTypeChange={handleMaterialTypeChange} />
                        <Limitertemps onSubmit={handleLimitertempsSubmit} />
                        <Payement onchoose={handlePayementSubmit}  />
                    </div>
                    {/* erreur */}
                    {errorMessageLimiterTemps && <p className="text-red-600">{errorMessageLimiterTemps}</p>}




                    {/* Confirmation */}
                    <div className="flex justify-end mt-4 gap-4">
                        <button
                            type="button"
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={onCancel}
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                            onClick={handleClick}
                        >
                            Confirmer
                        </button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}
