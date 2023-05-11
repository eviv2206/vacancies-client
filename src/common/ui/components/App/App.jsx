import {DeviceTypeProvider} from "../../contexts/DeviceType";
import React, {useEffect, useState} from "react";
import {Provider} from 'react-redux';
import {setupStore} from '../../store/store'
import {Navigate, Route, Routes} from "react-router-dom";
import Domain from "../../../../module/domain/Domain";

const App = () => {

    const [itemLS] = useState(localStorage.getItem('favourites'));

    useEffect(() => {
        if (!itemLS) {
            localStorage.setItem('favourites', "[]");
        }
    }, []);

    return (
        <Provider store={setupStore()}>
            <DeviceTypeProvider>
                <Routes>
                    <Route path='*' element={<Navigate to='vacancies-client/domain'/>}/>
                    <Route path='/vacancies-client/domain/*' element={<Domain/>}/>
                </Routes>
            </DeviceTypeProvider>
        </Provider>
    );
}

export default App;
