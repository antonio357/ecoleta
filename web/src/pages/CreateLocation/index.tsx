import React, {useEffect, useState, ChangeEvent, FormEvent} from 'react'
import {Link, useHistory} from 'react-router-dom'
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi'
import {Map, TileLayer, Marker} from 'react-leaflet'
import api from '../../services/api'
import axios from 'axios'
import {LeafletMouseEvent} from 'leaflet'

import logo from '../../assets/logo.svg'

// in useStates array or object: you need to manually define the type
interface Item {
    id: number
    classification: string
    image_url: string
}

interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string
}

const CreateLocation = () => {
    const [items, setItems] = useState<Item[]>([])
    const [ufs, setUfs] = useState<string[]>([]) // <string[]> this is acutally necessary for the set to work
    const [selectedUf, setSelectedUf] = useState("0")
    const [cities, setCities] = useState<string[]>([])
    const [selectedCity, setSelectedCity] = useState("0")
    const [selectetedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
    const [initialPosition, setInitialPosition] = useState<[number, number]>([-7.2219196, -35.92182])
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        whatsapp: '',
    })
    const [selectedItems, setSelectedItems] = useState<number[]>([])
    const history = useHistory()

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(position => {
            const {latitude, longitude} = position.coords
            setInitialPosition([latitude, longitude])
        })
    }, [])

    useEffect(() => {
        api.get('garbage')
        .then(response => {
            setItems(response.data)
        })
    }, [])

    useEffect(() => {
        // <IBGEUFResponse[]> this is necessary for the map to recognize uf
        axios.get<IBGEUFResponse[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(response => {
            const ufInitials = response.data.map(uf => uf.sigla)

            setUfs(ufInitials)
        })
    }, [])

    useEffect(() => {
        if (selectedUf === '0') return

        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
        .then(response => {
            const cities = response.data.map(city => city.nome)
            setCities(cities)
        })
    }, [selectedUf])

    async function handleSubmit(event: FormEvent) {
        event.preventDefault() // so the page doe not reload when enter is pressed

        const {name, email, whatsapp} = formData;
        const state_or_province = selectedUf;
        const city = selectedCity;
        const [latitude, longitude] = selectetedPosition;
        const garbages = selectedItems;

        const dataToRegister = {name, email, whatsapp, state_or_province, city, latitude, longitude, garbages};
        // console.log("handleSubmit -> dataToRegister", dataToRegister)
        
        await api.post('locations', dataToRegister)
        alert('Ponto de Coleta criado!')
        console.log('Ponto de Coleta criado')
        history.push("/")
    }

    function handleSelectItem(id: number) {
        const selected = selectedItems.findIndex(item => item === id)

        if (selected < 0) {
            setSelectedItems([...selectedItems, id])
            return
        }

        const filteredItems = selectedItems.filter(item => item !== id)
        setSelectedItems(filteredItems)
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        // console.log(event.target.name, event.target.value) // in this way you have the same function working for all inputs and yout can identify each input by its name
        const {name, value} = event.target
        setFormData({...formData, [name]: value}) // this way you copy the information that all ready exited there only changing what you want
    }

    function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
        const uf = event.target.value
        setSelectedUf(uf)
    }

    function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
        const city = event.target.value
        setSelectedCity(city)
    }

    function handleMapClick(event: LeafletMouseEvent) {
        setSelectedPosition([event.latlng.lat, event.latlng.lng])
    }

    return (
        <div id="page-create-point">
            <header>
                <img src={logo} alt="Ecoleta"/>

                <Link to="/">
                    <FiArrowLeft />
                    Home page
                </Link>
            </header>

            <form onSubmit={handleSubmit}>
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
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="field-group">
                        <div className="field">
                            <label htmlFor="email">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                id="email"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="whatsapp">Whatsapp</label>
                            <input 
                                type="text"
                                name="whatsapp"
                                id="whatsapp"
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Endereço</h2>
                        <span>Selecione um Endereço no Mapa</span>
                    </legend>

                    <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
                        <TileLayer 
                            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={selectetedPosition}/>
                    </Map>
                    <div className="field-group">
                        <div className='field'>
                            <label htmlFor="uf">Estado (UF)</label>
                            <select name="uf" id="uf" onChange={handleSelectUf} value={selectedUf}>
                                <option value="0">Selecioine uma UF</option>
                                {ufs.map(uf => (<option key={uf} value={uf}>{uf}</option>))}
                            </select>
                        </div>
                        <div className='field'>
                            <label htmlFor="city">Cidade</label>
                            <select name="city" id="city" value={selectedCity} onChange={handleSelectCity}>
                                <option value="0">Selecioine um UF primeiro</option>
                                {cities.map(city => (<option key={city} value={city}>{city}</option>))}
                            </select>
                        </div>
                    </div>
                </fieldset>

                <fieldset>
                    <legend>
                        <h2>Ítens de Coleta</h2>
                        <span>Clique e Selecione um ou mais ítens abaixo</span>
                    </legend>

                    <ul className="items-grid">
                        {items.map(item => (
                            /* () => handleSelectItem(item.id) u have to in this way cause
                            if u do handleSelectItem(item.id) instead of passiing the reference of the function u are actually calling the function
                             */
                            <li key={item.id} onClick={() => handleSelectItem(item.id)}
                            className={selectedItems.includes(item.id) ? 'selected' : '' /*this is so the user can differ between selected and unselected items */}>
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

