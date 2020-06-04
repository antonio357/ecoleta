import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi'
import {Map, TileLayer, Marker} from 'react-leaflet'
import api from '../../services/api'

import logo from '../../assets/logo.svg'

// in useStates array or object: you need to manually define the type
interface Item {
    id: number
    classification: string
    image_url: string
}

const CreateLocation = () => {
    const [items, setItems] = useState<Item[]>([])

    useEffect(() => {
        api.get('garbage')
        .then(response => {
            setItems(response.data)
        })
    }, [])

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

                    <Map center={[-7.2183397,-35.9127367]} zoom={15}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={[-7.2183397,-35.9127367]}/>
                    </Map>
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
                        {items.map(item => (
                            <li key={item.id}>
                                <img src={item.image_url} alt=""/>
                                <span>{item.classification}</span>
                            </li>
                        ))}
                        
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

