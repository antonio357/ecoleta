import React from 'react'
import logo from '../../assets/logo.svg'
import './styles.css'
import {FiLogIn} from 'react-icons/fi'

const Home = () => {
    return (
        <div id="page-home">
            <div className="content">
                <header>
                    <img src={logo} alt="Ecoleta"/>
                </header>

                <main>
                    <h1>Seu marketplace de coleta de resíduos.</h1>
                    <p>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</p>
                    <a href="/register">
                        <span>
                            <FiLogIn />
                        </span>
                        <strong>Register a collection location</strong>
                    </a>
                </main>
            </div>
        </div>
    )
}

export default Home