import React, {useEffect, useState} from "react";
import s from './Favourites.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {getVacancies} from "../../api/getVacancies";
import VacancyCard from "../Vacancies/components/VacancyCard/VacancyCard";
import PageSwitcher from "../../components/PageSwitcher/PageSwitcher";

const Favorites = () => {
    const {id} = useParams();
    const pageNum = +id || 1;
    const [vacancies, setVacancies] = useState([]);
    const navigate = useNavigate();
    const [totalPages, setTotalPages] = useState(0);
    const [ids, setIds] = useState(JSON.parse(localStorage.getItem('favourites')));

    const handleOpenClick = (id) => {
        navigate(`/vacancies-client/domain/vacancies/${id}`);
    }

    useEffect(() => {
        debugger;
        if (ids.length === 0 && vacancies.length === 0){
            navigate('/vacancies-client/domain/not-found');
        }
    }, [ids, vacancies]);

    useEffect(() => {
        const handleStorageChange = () => {
            setIds(JSON.parse(localStorage.getItem('favourites')));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    useEffect(() => {
        async function fetchData() {

            const response = await getVacancies({
                ids: ids,
                page: pageNum - 1
            });
            const totalItems = response.total;
            setTotalPages(Math.ceil(totalItems / 4));
            setVacancies(response.objects)
        }

        fetchData();
    }, [pageNum, ids]);

    return (
        <div className={s.Favorites}>
            <div className={s.Favorites_Container}>
                {vacancies.map((vacancy) => (
                    <VacancyCard
                        key={vacancy.id}
                        id={vacancy.id}
                        profession={vacancy.profession}
                        currency={vacancy.currency}
                        typeOfWork={vacancy.type_of_work.title}
                        town={vacancy.town.title}
                        handleOpenClick={handleOpenClick}
                        salaryTo={vacancy.payment_to}
                        salaryFrom={vacancy.payment_from}
                    />
                ))}
                <div className={s.PageSwitcher_Container}>
                    <PageSwitcher totalPages={totalPages} currentPage={+pageNum}/>
                </div>
            </div>
        </div>
    )
}

export default Favorites;