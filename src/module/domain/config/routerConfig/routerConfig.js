import Vacancies from "../../pages/Vacancies/Vacancies";


export const ROUTER_PATHS = {
    vacancies: 'vacancies',
    favourites: 'favourites',
};

export const routerConfig = {
    vacancies: {
        name: 'Поиск вакансий',
        path: ROUTER_PATHS.vacancies,
        element: <Vacancies/>
    },
    catalog: {
        name: 'Избранное',
        path: ROUTER_PATHS.favourites,
        element: <></>
    },
};
