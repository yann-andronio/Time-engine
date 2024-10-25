import React, { Fragment, useEffect, useState } from 'react';
import { FaCirclePlay } from "react-icons/fa6";
import Countdown from 'react-countdown';
import s from "./cardstart.module.css";

export default function CardStart({ numero, onClick, data, onOrderConfirm }) {
    const [startDate, setStartDate] = useState(null); // État pour la date de début
    const [elapsedTime, setElapsedTime] = useState(0); // État pour le temps écoulé
    const [isRunning, setIsRunning] = useState(false); // État du statut du chronomètre

    let timeSelected = 0;

    // Vérification des valeurs du temps sélectionné
    if (data?.limiterTempsValues) {
        if (data.limiterTempsValues.isHeureManualSelected) {
            const heures = parseInt(data.limiterTempsValues.heure) || 0;
            const minutes = parseInt(data.limiterTempsValues.min) || 0;
            timeSelected = (heures * 60 + minutes) * 60 * 1000;
        } else {
            timeSelected = (data.limiterTempsValues.time || 0) * 60 * 1000;
        }
    }

    // Initialisation du startDate lors du démarrage du chronomètre
    useEffect(() => {
        if (isRunning && timeSelected > 0 && !startDate) {
            setStartDate(Date.now() + timeSelected);
        }
    }, [isRunning, timeSelected, startDate]);

    // Fonction pour démarrer le chronomètre
    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            setElapsedTime(0);
        }
    };

    // Utilisation de useEffect pour minuterie illimitée
    useEffect(() => {
        if (timeSelected <= 0 && isRunning) {
            const interval = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [timeSelected, isRunning]);

    // Rendu du compte à rebours
    const renderer = ({ hours, minutes, seconds, completed }) => {
        if (completed) {
            return <span>Temps écoulé !</span>;
        } else {
            return <span>Temps restant : {hours}h {minutes}min {seconds}sec</span>;
        }
    };

    // Format du temps écoulé
    const formatElapsedTime = () => {
        const hours = Math.floor(elapsedTime / 3600);
        const minutes = Math.floor((elapsedTime % 3600) / 60);
        const seconds = elapsedTime % 60;
        return `${hours} h ${minutes} min ${seconds} sec`;
    };

    return (
        <Fragment>
            <div
                className={`${s.cardBox} cursor-pointer h-48 p-7 flex flex-col justify-center items-center gap-4 bg-[#541ec144] text-white rounded-lg shadow-lg`}
                onClick={() => { onClick(); startTimer(); }} // Active le chronomètre au clic
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
                                {startDate && (
                                    <Countdown
                                        date={startDate}
                                        renderer={renderer}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <p className="text-2xl font-semibold">Temps : Illimité</p>
                                <p className="text-2xl font-semibold">Temps écoulé : {formatElapsedTime()}</p>
                            </>
                        )}
                        <p className="text-xl">
                            {data.selectedMaterialType} : {data.paymentInputs?.status ? 'Payée' : 'Non Payée'}
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
