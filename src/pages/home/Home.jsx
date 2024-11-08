import React, { Fragment, useState } from 'react';
import CardStart from '../../components/cardStart/CardStart';
import s from "./Home.module.css";
import Modulestart from '../../components/modulestart/Modulestart';

export default function Home() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModuleStart, setShowModuleStart] = useState(false);
    const [datarecupered, setDatarecupered] = useState({});

    const handleCardClick = (index) => {
        setSelectedCard(index);
        setShowModuleStart(true);
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

        // Ajout du montant à paymentInputs à partir de limiterTempsValues
        const amount = data?.limiterTempsValues?.money || 'N/A';  // Si money existe, on le prend, sinon on met 'N/A'

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
                    amount: amount  // On met money dans paymentInputs.amount
                }
            }
        }));
        setShowModuleStart(false);
    };


    return (
        <Fragment>
            <div className={`${s.BigBox} p-7 h-screen`}>
                <div className="navbar text-center">
                    <h1 className='text-blue-800 text-4xl'>cyber</h1>
                </div>
                <main className={`${s.BoxMain} relative`}>
                    <div className={`${s.BoxParents} lg:grid-cols-3 md:grid-cols-2 mt-10 grid grid-cols-1 gap-4`}>
                        {Array(9).fill(0).map((_, index) => (
                            <Fragment key={index}>
                                <CardStart
                                    numero={index}
                                    onClick={() => handleCardClick(index)}
                                    data={datarecupered[index]} // Passe les données récupérées spécifiques à chaque carte
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
