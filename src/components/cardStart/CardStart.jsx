import React, { Fragment } from 'react';
import { FaCirclePlay } from "react-icons/fa6";
import Countdown from 'react-countdown';
import s from "./cardstart.module.css";

export default function CardStart({ numero, onClick, data, onOrderConfirm }) {
    let timeSelected = 0;

    // Vérification des valeurs du temps sélectionné
    if (data?.limiterTempsValues) {
        if (data.limiterTempsValues.isHeureManualSelected) {
            const heures = parseInt(data.limiterTempsValues.heure) || 0;
            const minutes = parseInt(data.limiterTempsValues.min) || 0;
            // Calculer le temps total en millisecondes
            timeSelected = (heures * 60 + minutes) * 60 * 1000; // Convertit les heures et minutes en millisecondes
        } else {
            // Utilisation du temps en minutes si ce n'est pas manuel
            timeSelected = (data.limiterTempsValues.time || 0) * 60 * 1000;
        }
    }

    const startDate = Date.now() + timeSelected;

    // Rendu du compte à rebours
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Temps écoulé !</span>;
        } else {
            // Affichage du temps restant
            return <span>Temps restant : {hours}h {minutes}min {seconds}sec</span>;
        }
    };

    return (
        <Fragment>
            <div
                className={`${s.cardBox} cursor-pointer h-48 p-7 flex flex-col justify-center items-center gap-4 bg-[#541ec144] text-white rounded-lg shadow-lg`}
                onClick={onClick}
            >
                {!data ? (
                    <>
                        <FaCirclePlay size={70} className="text-white animate-spin-slow" />
                        <p className='text-3xl font-semibold tracking-wide'>START</p>
                        <p className='text-3xl font-semibold'>#{numero}</p>
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        {timeSelected > 0 ? (
                            <>
                                <p className="text-2xl font-semibold">
                                    Temps : {data.limiterTempsValues.isHeureManualSelected
                                        ? `${data.limiterTempsValues.heure}h ${data.limiterTempsValues.min}min`
                                        : `${data.limiterTempsValues.time} min`}
                                </p>
                                <Countdown
                                    date={startDate}
                                    renderer={renderer}
                                />
                            </>
                        ) : (
                            <p className="text-2xl font-semibold">Temps : N/A</p>
                        )}
                        <p className="text-xl">
                                {data.selectedMaterialType} : {data.paymentInputs?.status ? ' Payée' : 'Non Payée'}
                        </p>
                        <p className="text-lg font-semibold">
                            Total : {data.paymentInputs?.amount ? `${data.paymentInputs.amount} Ar` : 'N/A'}
                        </p>
                        <button
                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700"
                            onClick={onOrderConfirm}
                        >
                            Confirmer
                        </button>
                    </div>
                )}
            </div>
        </Fragment>
    );
}
