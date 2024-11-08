import React, { Fragment, useEffect, useState } from 'react';
import { FaCirclePlay, FaPause, FaPlay, FaStop } from "react-icons/fa6";
import { FaPlus } from 'react-icons/fa6';
import { FaPlusCircle } from 'react-icons/fa';
import { FaHourglassHalf } from 'react-icons/fa6';
import { FaClipboard } from 'react-icons/fa6';
import { FaClock } from 'react-icons/fa6';
import { FaMoneyBillAlt } from 'react-icons/fa';
import soundFile from './sounds/notification.mp3';
import s from "./cardstart.module.css";

export default function CardStart({ numero, onClick, data, resetCard }) {
    const [remainingTime, setRemainingTime] = useState(0); // Temps restant
    const [elapsedTime, setElapsedTime] = useState(0); // Temps écoulé pour le mode illimité
    const [isRunning, setIsRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false); // Etat pour gérer la pause
    const [totalAmount, setTotalAmount] = useState(0);
    const [showConfirmModal, setShowConfirmModal] = useState(false); // Etat pour afficher la modale de confirmation
    const [showAddTimeModal, setShowAddTimeModal] = useState(false); // Etat pour afficher la modale d'ajout de temps
    const [timeToAdd, setTimeToAdd] = useState({ heures: 0, minutes: 0 }); // Temps à ajouter
    const [selectedCardData, setSelectedCardData] = useState(null); // Données de la carte sélectionnée
    const [audio, setAudio] = useState(null); // État pour stocker l'instance audio


    const ratePerSecond = 1000 / 60 / 60; // 1000 AR pour 60 minutes, soit environ 0.28 AR par seconde

    const resetCardHandler = () => {
        resetCard(numero); // Appelle la fonction resetCard du parent pour réinitialiser la carte
        setTotalAmount(0); // Réinitialise totalAmount
        setRemainingTime(0); // Réinitialise également le temps restant
        setElapsedTime(0); // Réinitialise le temps écoulé pour le mode illimité
        setIsRunning(false); // Arrête le chronomètre
        setIsPaused(false); // Réinitialise l'état de pause
        setShowConfirmModal(false); // Ferme la modale
        setShowAddTimeModal(false); // Ferme la modale d'ajout de temps
        stopSoundNotification(); 
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
        setSelectedCardData(data); // Sauvegarde des données actuelles de la carte
        setShowConfirmModal(true); // Affiche la modale de confirmation
    };

    const cancelStop = () => {
        setShowConfirmModal(false); // Fermer la modale sans arrêter le timer
    };

    const handleAddTime = () => {
        // Calcul du temps à ajouter en millisecondes
        const additionalTime = (timeToAdd.heures * 60 + timeToAdd.minutes) * 60 * 1000;

        // Ajouter le temps au temps restant
        setRemainingTime((prev) => prev + additionalTime);

        // Calculer le montant à ajouter en fonction du temps ajouté
        const additionalAmount = (timeToAdd.heures * 60 + timeToAdd.minutes) * ratePerSecond * 60; // Le montant est calculé pour chaque minute ajoutée

        // Ajouter le montant au total
        setTotalAmount((prev) => Math.round(prev + additionalAmount)); // Arrondi le montant pour qu'il soit plus précis

        // Fermer la modale après l'ajout du temps
        setShowAddTimeModal(false);
    };


    const handleTimeChange = (e) => {
        const { name, value } = e.target;
        setTimeToAdd((prev) => ({ ...prev, [name]: value }));
    };

    const formatRemainingTime = (time) => {
        const hours = Math.floor(time / 3600000); // Heures
        const minutes = Math.floor((time % 3600000) / 60000); // Minutes
        const seconds = Math.floor((time % 60000) / 1000); // Secondes
        return `${hours} h ${minutes} min ${seconds} sec`;
    };
  


    // Fonction pour jouer le son lorsque le timer est terminé
    // Fonction pour jouer le son
    const playSoundNotification = () => {
        const newAudio = new Audio(soundFile); // Crée un nouvel objet Audio
        newAudio.play(); // Joue le son
        setAudio(newAudio); // Stocke l'instance pour pouvoir la contrôler plus tard
    };

    // Fonction pour arrêter le son
    const stopSoundNotification = () => {
        if (audio) {
            audio.pause(); // Arrête la lecture du son
            audio.currentTime = 0; // Remet le son au début
        }
    };

    // Détecter si le temps est écoulé et jouer le son
    useEffect(() => {
        if (remainingTime === 0) {
            playSoundNotification(); // Jouer le son si le timer est terminé
            
        }
    }, [remainingTime]);

    

    return (
        <Fragment>
            <div
                className={`${s.cardBox} cursor-pointer h-60 p-7 flex flex-col justify-center  gap-4 bg-[#6c757d] text-white rounded-lg shadow-lg`}
                onClick={() => { onClick(); startTimer(); }}
            >
                {!data ? (
                    <>
                        <div className='items-center flex justify-center gap-4'>
                            <FaCirclePlay size={70} className="text-[#f8f9fa] animate-spin-slow" />
                            <p className='text-3xl font-semibold tracking-wide'>START</p>
                            <p className='text-3xl font-semibold'>#{numero}</p>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col ">
                        {timeSelected > 0 ? (
                            <>
                                <div className=" rounded-lg shadow-md text-gray-100 ">
                                    <p className="text-sm text-[#f8f9fa] flex justify-center items-center font-semibold mb-2  gap-1">
                                        {/* <FaClock className="text-gray-400" /> */}
                                        Temps :
                                        <span className="font-medium text-gray-50">
                                            {data.limiterTempsValues.isHeureManualSelected
                                                ? `${data.limiterTempsValues.heure}h ${data.limiterTempsValues.min}min`
                                                : `${data.limiterTempsValues.time} min`}
                                        </span>
                                    </p>

                                    <p className="text-base font-semibold text-gray-100 mt-1 flex items-center gap-2 p-2 rounded-md shadow-sm bg-opacity-80 bg-gray-700">
                                        <FaHourglassHalf className="text-gray-400" />
                                        Temps restant :
                                        <span className="font-medium text-gray-50">{formatRemainingTime(remainingTime)}</span>
                                    </p>
                                    <p className="text-base font-semibold text-gray-50 mt-1 flex items-center gap-2 p-2 rounded-md bg-opacity-90 bg-[#2d3338] shadow-sm">
                                        <FaMoneyBillAlt className="text-green-500" />
                                        <span className="text-sm text-gray-200">Montant :</span>
                                        <span className="text-xl text-[#ff8a00] font-bold">{totalAmount} Ar</span>
                                    </p>


                                </div>

                            </>
                        ) : (
                            <>
                                <div className="flex items-center justify-center mb-2">
                                    <p className="text-sm text-[#f8f9fa]">
                                        <span className="font-semibold">Temps :</span>
                                        <span className="font-medium ml-1">{timeSelected > 0 ? `Limité à ${data.limiterTempsValues.time} min` : 'Illimité'}</span>
                                    </p>
                                </div>

                                <p className="text-base font-semibold text-gray-100 mt-1 flex items-center gap-2 p-2 rounded-md shadow-sm bg-opacity-80 bg-gray-700">
                                    <FaClock className="text-gray-400" />
                                    <span className="text-sm font-medium opacity-80">Temps écoulé :</span>
                                    <span className="font-semibold text-gray-50">{formatRemainingTime(elapsedTime)}</span>
                                </p>

                                <p className="text-base font-semibold text-gray-50 mt-1 flex items-center gap-2 p-2 rounded-md bg-opacity-90 bg-[#2d3338] shadow-sm">
                                    <FaMoneyBillAlt className="text-green-500" />
                                    <span className="text-sm text-gray-200">Montant :</span>
                                    <span className="text-xl text-[#ff8a00] font-bold">{totalAmount} Ar</span>
                                </p>


                            </>


                        )}
                        <p className="text-lg font-medium text-gray-200 flex mt-2 items-center gap-2 p-2 bg-[#3e444a] rounded-md">
                            <FaClipboard className="text-gray-400" />
                            {data.selectedMaterialType} :
                            <span className={`font-semibold px-2 rounded ${data.paymentInputs?.paymentType === 'Payée' ? 'text-green-500 bg-green-900/30' : 'text-red-500 bg-red-900/30'}`}>
                                {data.paymentInputs?.paymentType === 'Payée' ? 'Payée' : 'Non Payée'}
                            </span>
                        </p>

                        <div className="flex gap-3 mt-4 z-0">
                            <button
                                onClick={togglePause}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 rounded-md text-white font-medium hover:bg-blue-600 transition-all duration-200 ease-in-out shadow-md transform active:scale-95"
                            >
                                {isPaused ? <FaPlay className="text-lg" /> : <FaPause className="text-lg" />}
                                <span className="text-sm">{isPaused ? 'Reprendre' : 'Pause'}</span>
                            </button>

                            <button
                                onClick={stopTimer}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-red-500 rounded-md text-white font-medium hover:bg-red-600 transition-all duration-200 ease-in-out shadow-md transform active:scale-95"
                            >
                                <FaStop className="text-lg" />
                                <span className="text-sm">Arrêter</span>
                            </button>

                            {timeSelected !== 0 && (
                                    <button
                                        className="flex items-center justify-center gap-2 px-4 py-2 bg-[#ff8a00] rounded-md text-white font-medium hover:bg-[#d57b00] transition-all duration-200 ease-in-out shadow-md transform active:scale-95"
                                        onClick={() => setShowAddTimeModal(true)}
                                    >
                                        <FaPlusCircle className="text-white text-lg" />
                                        <span className="text-sm">Ajouter du temps</span>
                                    </button>



                            )}

                        </div>

                    </div>
                )}
            </div>

            {/* Modal de confirmation */}

            {showConfirmModal && selectedCardData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
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

            {/* Modal d'ajout de temps */}
            {showAddTimeModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-5 rounded shadow-lg">
                        <h2 className="text-xl font-semibold">Ajouter du temps</h2>
                        <div className="flex gap-4 mt-4">
                            <div>
                                <label htmlFor="heures" className="block">Heures</label>
                                <input
                                    type="number"
                                    id="heures"
                                    name="heures"
                                    value={timeToAdd.heures}
                                    onChange={handleTimeChange}
                                    min="0"
                                    className="border p-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="minutes" className="block">Minutes</label>
                                <input
                                    type="number"
                                    id="minutes"
                                    name="minutes"
                                    value={timeToAdd.minutes}
                                    onChange={handleTimeChange}
                                    min="0"
                                    className="border p-2"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <button
                                onClick={handleAddTime}
                                className="p-2 bg-green-500 rounded text-white"
                            >
                                Ajouter
                            </button>
                            <button
                                onClick={() => setShowAddTimeModal(false)}
                                className="ml-2 p-2 bg-gray-500 rounded text-white"
                            >
                                Annuler
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Fragment>
    );
}




