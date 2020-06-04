import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Home from './pages/Home/index'
import CreateLocation from './pages/CreateLocation/index'

const Routes = () => {
    return (
        <BrowserRouter>          
            <Route  component={Home} exact path="/"/> {/* exact means verify if string is equal */}
            <Route  component={CreateLocation} path="/create-location"/>
        </BrowserRouter>
    )
}

export default Routes