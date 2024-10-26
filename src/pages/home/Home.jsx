import React, { Fragment, useState, useEffect } from 'react';
import CardStart from '../../components/cardStart/CardStart';
import s from "./Home.module.css";
import Modulestart from '../../components/modulestart/Modulestart';
import CompteARebours from '../../components/compteRebours/CompteARebours';

export default function Home() {
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModuleStart, setShowModuleStart] = useState(false);
    const [datarecupered, setDatarecupered] = useState({});

    const handleCardClick = (index) => {
        setSelectedCard(index);
        setShowModuleStart(true);
    };

    const handleCancel = () => {
        console.log("Annuler : ", selectedCard);
        setShowModuleStart(false);
        setSelectedCard(null);
    };

    const handleDesactiveConfirmModule = () => {
        setShowModuleStart(false);
    };

    const handleConfirm = (data) => {
        setDatarecupered(data);
        console.log("Données soumises :", data);
    };

    useEffect(() => {
        console.log("Sélection :", selectedCard);
    }, [selectedCard]);

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
                                <CardStart numero={index} onClick={() => handleCardClick(index)} />
                            </Fragment>
                        ))}
                    </div>

                    <CompteARebours data={datarecupered} /> {/* Passer les données récupérées */}

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
