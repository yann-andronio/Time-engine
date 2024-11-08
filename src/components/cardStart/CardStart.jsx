import React, { Fragment, useEffect, useState } from 'react';
import { FaCirclePlay, FaPause, FaPlay, FaStop } from "react-icons/fa6";
import s from "./cardstart.module.css";

export default function CardStart({ numero, onClick, data, resetCard }) {
    const [remainingTime, setRemainingTime] = useState(0); // Temps restant
    const [elapsedTime, setElapsedTime] = useState(0); // Temps écoulé pour le mode illimité
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Etat pour gérer la pause
    const [totalAmount, setTotalAmount] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Etat pour la modal de confirmation
    const [selectedCardData, setSelectedCardData] = useState(null); // Etat pour stocker les données du card sélectionné

    const ratePerSecond = 1000 / 60 / 60; // 1000 AR pour 60 minutes, soit environ 0.28 AR par seconde

    // La fonction resetCard ne sera pas modifiée
    const resetCardHandler = () => {
        resetCard(numero); // Appelle la fonction resetCard du parent pour réinitialiser la carte
        setTotalAmount(0); // Réinitialise totalAmount
        setRemainingTime(0); // Réinitialise également le temps restant
        setElapsedTime(0); // Réinitialise le temps écoulé pour le mode illimité
        setIsRunning(false); // Arrête le chronomètre
        setIsPaused(false); // Réinitialise l'état de pause
        setShowConfirmModal(false); // Ferme la modal
    };

    let timeSelected = 0;

    if (data?.limiterTempsValues) {
        if (data.limiterTempsValues.isHeureManualSelected) {
            const heures = parseInt(data.limiterTempsValues.heure) || 0;
            const minutes = parseInt(data.limiterTempsValues.min) || 0;
            timeSelected = (heures * 60 + minutes) * 60 * 1000;
        } else {
            timeSelected = (data.limiterTempsValues.time || 0) * 60 * 1000;
        }
    }

    useEffect(() => {
        if (timeSelected > 0) {
            const minutesSelected = timeSelected / (60 * 1000);
            setTotalAmount(Math.round(minutesSelected * (1000 / 60))); // Arrondi à l'entier le plus proche
            setRemainingTime(timeSelected); // Initialiser le temps restant
        } else {
            setElapsedTime(0); // Initialiser le temps écoulé à zéro si illimité
        }
    }, [timeSelected]);

    useEffect(() => {
        if (isRunning && !isPaused) {
            const interval = setInterval(() => {
                if (timeSelected > 0 && remainingTime > 0) {
                    setRemainingTime((prev) => {
                        if (prev <= 0) {
                            clearInterval(interval); // Stopper l'interval si le temps est écoulé
                            return 0;
                        }
                        return prev - 1000; // Décrémenter le temps restant chaque seconde
                    });
                } else if (timeSelected === 0) {
                    setElapsedTime((prev) => prev + 1000); // Temps illimité, incrémenter le temps écoulé
                    // Incrémenter par minute
                    if (elapsedTime % (60 * 1000) === 0) { // Vérifier chaque minute
                        setTotalAmount((prev) => Math.round(prev + ratePerSecond * 60)); // Ajouter le montant chaque minute et arrondir
                    }
                }
            }, 1000);

            return () => clearInterval(interval); // Nettoyage lorsque le composant est démonté ou réinitialisé
        }
    }, [isRunning, isPaused, remainingTime, elapsedTime, timeSelected]);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            setElapsedTime(0);
            setRemainingTime(timeSelected); // Réinitialiser le timer
        }
    };

    const togglePause = () => {
        setIsPaused(!isPaused); // Basculer entre pause et reprise
    };

    const stopTimer = () => {
        setSelectedCardData(data); // Sauvegarder les données du card sélectionné
        setShowConfirmModal(true); // Afficher la modal de confirmation
    };

    const confirmStop = () => {
        setIsRunning(false); // Arrêter le timer
        setRemainingTime(0); // Réinitialiser le temps restant
        setShowConfirmModal(false); // Fermer la modal de confirmation
    };

    const cancelStop = () => {
        setShowConfirmModal(false); // Fermer la modal sans stopper
    };

    const formatRemainingTime = (time) => {
        const hours = Math.floor(time / 3600000); // Heures
        const minutes = Math.floor((time % 3600000) / 60000); // Minutes
        const seconds = Math.floor((time % 60000) / 1000); // Secondes
        return `${hours} h ${minutes} min ${seconds} sec`;
    };

    return (
        <Fragment>
            <div
                className={`${s.cardBox} cursor-pointer h-48 p-7 flex flex-col justify-center items-center gap-4 bg-[#541ec144] text-white rounded-lg shadow-lg`}
                onClick={() => { onClick(); startTimer(); }}
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
                                <p className="text-lg font-semibold">Montant : {totalAmount} Ar</p>
                                <p className="text-2xl font-semibold">
                                    Temps restant : {formatRemainingTime(remainingTime)}
                                </p>
                            </>
                        ) : (
                            <>
                                <p className="text-2xl font-semibold">Temps : Illimité</p>
                                <p className="text-2xl font-semibold">Temps écoulé : {formatRemainingTime(elapsedTime)}</p>
                                <p className="text-lg font-semibold">Montant : {totalAmount} Ar</p>
                            </>
                        )}
                        <p className="text-xl">
                            {data.selectedMaterialType} : {data.paymentInputs?.paymentType === 'Payée' ? 'Payée' : 'Non Payée'}
                        </p>
                        <div className='flex gap-2'>
                            <button onClick={togglePause} className=" flex justify-center gap-2 items-center mt-4 p-2 bg-blue-500 rounded text-white">
                                {isPaused ? <FaPlay /> : <FaPause />}
                                {isPaused ? "Reprendre" : "Pause"}
                            </button>
                            <button onClick={stopTimer} className=" flex justify-center gap-2 items-center mt-4 p-2 bg-red-500 rounded text-white">
                                <FaStop /> Stop
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Modal de confirmation, sans modification */}
            {showConfirmModal && selectedCardData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded shadow-lg text-center">
                        <h3 className="text-xl font-semibold mb-4">Êtes-vous sûr de vouloir arrêter le timer numero <span className='text-xl font-semibold'>#{numero}</span> ?</h3>
                        <div className="text-left mb-4">
                            <p><strong>Temps : </strong>{selectedCardData.limiterTempsValues.isHeureManualSelected
                                ? `${selectedCardData.limiterTempsValues.heure}h ${selectedCardData.limiterTempsValues.min}min`
                                : `${selectedCardData.limiterTempsValues.time} min`}</p>
                            <p><strong>Montant : </strong>{totalAmount} Ar</p>
                            <p><strong>Type de matériel : </strong>{selectedCardData.selectedMaterialType}</p>
                            <p><strong>Status de paiement : </strong>{selectedCardData.paymentInputs?.paymentType === 'Payée' ? 'Payée' : 'Non Payée'}</p>
                        </div>
                        <div className="flex justify-center gap-4">
                            <button onClick={resetCardHandler} className="p-2 bg-red-500 text-white rounded">Oui, arrêter</button>
                            <button onClick={cancelStop} className="p-2 bg-gray-300 text-black rounded">Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}
