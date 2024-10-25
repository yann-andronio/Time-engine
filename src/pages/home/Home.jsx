import React, { Fragment } from 'react'
import CardStart from '../../components/cardStart/CardStart'
import s from "./Home"

export default function Home() {
    return (
        <Fragment>
            <div className="navbar text-center">
                <h1 className='text-blue-800 text-8xl'>cyber </h1>
            </div>
            <main className={`${s.BoxMain} p-7`}>
                <CardStart />
            </main>
       

        </Fragment>
    )
}
