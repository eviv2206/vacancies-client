import React, {useEffect, useState} from "react";
import s from './Favourites.module.scss';
import {useNavigate, useParams} from "react-router-dom";
import {getVacancies} from "../../api/getVacancies";
import VacancyCard from "../Vacancies/components/VacancyCard/VacancyCard";
import PageSwitcher from "../../components/PageSwitcher/PageSwitcher";
import {useDispatch, useSelector} from "react-redux";
import {setTotalFavouritePages} from "../../../../common/ui/store/slices/paginationSlice";
import Loader from "../../../../common/ui/components/Loader/Loader";

const Favorites = () => {
    const {id} = useParams();
    const pageNum = +id || 1;

    const [vacancies, setVacancies] = useState(null);
    const [ids, setIds] = useState(JSON.parse(localStorage.getItem('favourites')));

    const totalPages = useSelector(state => state.pagination.totalFavouritePages);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const handleOpenClick = (id) => {
        navigate(`/vacancies-client/domain/vacancies/${id}`);
    }

    useEffect(() => {
        if (ids?.length === 0 && (vacancies?.length === 0 || vacancies === null)){
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
        setVacancies(null);
        async function fetchData() {

            const response = await getVacancies({
                ids: ids,
                page: pageNum - 1
            });
            const totalItems = response.total;
            dispatch(setTotalFavouritePages(Math.ceil(totalItems / 4)));
            setVacancies(response.objects)
            console.log(totalPages);
        }

        fetchData();
    }, [pageNum, ids]);

    return (
        <div className={s.Favorites}>
            <div className={s.Favorites_Container}>
                {vacancies ? vacancies.map((vacancy) => (
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
                ))
                    : <Loader/>
                }
                <div className={s.PageSwitcher_Container}>
                    <PageSwitcher totalPages={totalPages} currentPage={+pageNum}/>
                </div>
            </div>
        </div>
    )
}

export default Favorites;