import React, { Fragment, useState } from 'react';
import CardStart from '../../components/cardStart/CardStart';
import Modulestart from '../../components/modulestart/Modulestart';

export default function Home() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModuleStart, setShowModuleStart] = useState(false);
    const [datarecupered, setDatarecupered] = useState({});
    const [isTimerRunning, setIsTimerRunning] = useState({}); // Gérer l'état du chronomètre pour chaque carte

    const handleCardClick = (index) => {
        if (!isTimerRunning[index]) { // Vérifie si le chronomètre de la carte cliquée n'a pas démarré
            setSelectedCard(index);
            setShowModuleStart(true);
        }
    };

    const handleCancel = () => {
        setShowModuleStart(false);
        setSelectedCard(null);
    };

    const handleDesactiveConfirmModule = () => {
        setShowModuleStart(false);
    };

    const handleConfirm = (data) => {
        console.log("Données confirmées reçues depuis Modulestart:", data);

        const amount = data?.limiterTempsValues?.money || 'N/A';

        setDatarecupered(prevData => ({
            ...prevData,
            [selectedCard]: {
                ...data,
                limiterTempsValues: {
                    ...data.limiterTempsValues,
                    isHeureManualSelected: true,
                    heure: data.limiterTempsValues?.heure || 0,
                    min: data.limiterTempsValues?.min || 0,
                },
                paymentInputs: {
                    ...data.paymentInputs,
                    amount: amount
                }
            }
        }));

        // Mettre à jour l'état du chronomètre uniquement pour la carte sélectionnée
        setIsTimerRunning(prevState => ({
            ...prevState,
            [selectedCard]: true
        }));
        
        setShowModuleStart(false);
    };

    // Fonction pour réinitialiser la carte
    const resetCard = (index) => {
        setDatarecupered(prevData => ({
            ...prevData,
            [index]: null, // Réinitialiser les données de la carte
        }));
        setIsTimerRunning(prevState => ({
            ...prevState,
            [index]: false // Réinitialiser l'état du chronomètre
        }));
    };

    return (
        <Fragment>
            <div className={`${s.BigBox} p-7  `}>
                {/* <div className="navbar text-center">
                    <h1 className='text-blue-800 text-4xl'>cyber</h1>
                </div> */}
                <main className={`${s.BoxMain} relative`}>
                    <div className={`${s.BoxParents} lg:grid-cols-3 md:grid-cols-2 mt-10 grid grid-cols-1 gap-4`}>
                        {Array(9).fill(0).map((_, index) => (
                            <Fragment key={index}>
                                <CardStart
                                    numero={index}
                                    onClick={() => handleCardClick(index)}
                                    data={datarecupered[index]}
                                    isTimerRunning={isTimerRunning[index] || false} // Passe l'état spécifique du chronomètre de chaque carte
                                    resetCard={() => resetCard(index)} // Passer la fonction pour réinitialiser la carte
                                />
                            </Fragment>
                        ))}
                    </div>

                    {showModuleStart && (
                        <div className={`${s.Boxmodulestart} p-8 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}>
                            <Modulestart
                                onCancel={handleCancel}
                                desactive={handleDesactiveConfirmModule}
                                onConfirm={handleConfirm}
                            />
                        </div>
                    )}
                </main>
            </div>
        </Fragment>
    );
}
