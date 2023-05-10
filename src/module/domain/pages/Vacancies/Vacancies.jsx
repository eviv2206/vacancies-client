import React, {useEffect, useState} from "react";
import VacancyCard from "./components/VacancyCard/VacancyCard";
import SearchBar from "./components/SearchBar/SearchBar";
import s from './Vacancies.module.scss';
import Filters from "./components/Filters/Filters";
import {getVacancies} from "../../api/getVacancies";
import {useNavigate, useParams} from "react-router-dom";
import PageSwitcher from "../../components/PageSwitcher/PageSwitcher";
import Loader from "../../../../common/ui/components/Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {resetVacancies, setVacancies} from "../../../../common/ui/store/slices/vacancySearchSlice";

const Vacancies = () => {
    const {id} = useParams();
    const pageNum = +id || 1;
    const [totalPages, setTotalPages] = useState(0);
    const vacancies = useSelector(state => state.vacancySearch.vacancies);
    const isFiltered = useSelector(state => state.vacancySearch.isFiltered);
    const industry = useSelector(state => state.vacancySearch.selectedIndustry);
    const salaryFrom = useSelector(state => state.vacancySearch.salaryFrom);
    const salaryTo = useSelector(state => state.vacancySearch.salaryTo);
    const keyword = useSelector(state => state.vacancySearch.keyword);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenClick = (id) => {
        navigate(`/domain/vacancies/${id}`);
    }

    useEffect(() => {
        dispatch(resetVacancies());
        async function fetchData() {
            const response = await getVacancies({
                page: pageNum - 1,
                catalogues: isFiltered ? industry.key : '',
                payment_from: isFiltered ? salaryFrom : '',
                payment_to: isFiltered ? salaryTo : '',
                keyword: keyword,
            });
            const totalItems = response.total;
            setTotalPages(Math.ceil(totalItems / 4));
            dispatch(setVacancies(response.objects));
        }
        fetchData();
    }, [pageNum]);

    return (
        <div className={s.VacanciesContainer}>
            <div className={s.FiltersContainer}>
                <div className={s.FiltersContainer_wrapper}>
                    <Filters/>
                </div>
            </div>
            <div className={s.MainContainer}>
                <SearchBar/>
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
                )) : <Loader/>}
                <div className={s.MainContainer_PageSwitcher_Container}>
                    <PageSwitcher currentPage={+pageNum} totalPages={totalPages}/>
                </div>
            </div>
        </div>
    )
}

export default Vacancies;