import React from "react";
import s from './SearchBar.module.scss';
import searchSVG from "../../../../../../assets/images/Search.svg"
import SearchButton from "../SearchButton/SearchButton";
import {useDispatch} from "react-redux";
import {
    resetVacancies,
    setIsFiltered,
    setKeyword
} from "../../../../../../common/ui/store/slices/vacancySearchSlice";
import {useNavigate} from "react-router-dom";

const PLACEHOLDER_INPUT = 'Введите название вакансии';
const BUTTON_SEARCH = 'Поиск';


const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch(setIsFiltered());
        dispatch(resetVacancies());
        navigate('/vacancies-client/domain/vacancies/page/1');
    }


    return (
        <form className={s.SearchBar} onSubmit={(event) => onSubmit(event)}>
            <div className={s.SearchBar_Container}>
                <img src={searchSVG} alt='search'/>
                <input placeholder={PLACEHOLDER_INPUT} onChange={(event) => dispatch(setKeyword(event.target.value))}/>
                <div className={s.SearchBar_search_wrapper}>
                    <SearchButton value={BUTTON_SEARCH}/>
                </div>
            </div>
        </form>
    )
}

export default SearchBar;