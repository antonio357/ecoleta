import React from 'react'
import {Link} from 'react-router-dom'
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi'

import logo from '../../assets/logo.svg'

const CreateLocation = () => {
    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft />
                    Home page
                </Link>
            </header>

            <form>
                <h1>Cadastro do <br/> ponto de coleta</h1>

                <fieldset>
                    <legend>
                        <h2>Dados</h2>
                    </legend>

                    <div className="field">
                        <label htmlFor="name">Nome da entidade</label>
                        <input 
                            type="text"
                            name="name"
                            id="name"
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione um Endereço no Mapa</span>
                    </legend>
                    <div className="field-group">
                        <div className='field'>
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf">
                                <option value="0">Selecioine uma UF</option>
                            </select>
                        </div>
                        <div className='field'>
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city">
                                <option value="0">Selecioine uma cidade</option>
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        <li>
                            <img src="http://localhost:3333/images/oils.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/images/oils.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/images/oils.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/images/oils.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/images/oils.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>
                        </li>
                        <li>
                            <img src="http://localhost:3333/images/oils.svg" alt="Teste"/>
                            <span>Óleo de cozinha</span>
                        </li>
                    </ul>
                </fieldset>

                <button type="submit">
                    Cadastra Ponto de Coleta
                </button>
            </form>
        </div>
    )
}

export default CreateLocation

