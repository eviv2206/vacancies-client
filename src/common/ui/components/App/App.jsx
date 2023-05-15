import {DeviceTypeProvider} from "../../contexts/DeviceType";
import React, {useState} from "react";
import {Provider} from 'react-redux';
import {setupStore} from '../../store/store'
import {Navigate, Route, Routes} from "react-router-dom";
import Domain from "../../../../module/domain/Domain";

const TOKEN = 'v3.r.137440105.09538907b6afa9ee3fd022be7823aaf26ef7de49.2205c74e29ab53fcf5a2537e39414772688b847a'

const App = () => {

    const [favouritesLS] = useState(localStorage.getItem('favourites'));
    const [accessTokenLS] = useState(localStorage.getItem('Authorization'));

    if (!favouritesLS) {
        localStorage.setItem('favourites', "[]");
    }
    if (!accessTokenLS) {
        localStorage.setItem('Authorization', `Bearer ${TOKEN}`)
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
