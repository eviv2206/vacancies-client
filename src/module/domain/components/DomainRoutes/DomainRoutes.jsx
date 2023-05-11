import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {routerConfig} from "../../config/routerConfig/routerConfig";
import NotFound from "../../pages/NotFound/NotFound";
import VacancyInfo from "../../pages/VacancyInfo/VacancyInfo";
import Vacancies from "../../pages/Vacancies/Vacancies";
import Favorites from "../../pages/Favourites/Favorites";

const DomainRoutes = () => {
    return (
        <Routes>
            <Route path={'/not-found'} element={<NotFound/>}/>
            <Route path={'vacancies'} element={<Navigate to={'page/1'}/>}/>
            <Route path={'/vacancies/page/:id'} element={<Vacancies/>}/>
            <Route path={'/vacancies/:id'} element={<VacancyInfo/>}/>
            <Route path={'/favourites/page/:id'} element={<Favorites/>}/>
            <Route path={'favourites'} element={<Navigate to={'page/1'}/>}/>
            <Route path={'/'} element={<Navigate to={'vacancies/page/1'}/>}/>
            {
                Object.values(routerConfig).map(({path, element}) => {
                    return <Route path={path} element={element} key={path}/>;
                })
            }
        </Routes>
    );
};

export default DomainRoutes;
