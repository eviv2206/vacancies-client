import {DeviceTypeProvider} from "../../contexts/DeviceType";
import React, {useState} from "react";
import {Provider} from 'react-redux';
import {setupStore} from '../../store/store'
import {Navigate, Route, Routes} from "react-router-dom";
import Domain from "../../../../module/domain/Domain";

const App = () => {

    const [favouritesLS] = useState(localStorage.getItem('favourites'));

    if (!favouritesLS) {
        localStorage.setItem('favourites', "[]");
    }


    return (
        <Provider store={setupStore()}>
            <DeviceTypeProvider>
                <Routes>
                    <Route path='*' element={<Navigate to='domain'/>}/>
                    <Route path='/domain/*' element={<Domain/>}/>
                </Routes>
            </DeviceTypeProvider>
        </Provider>
    );
}

export default App;
