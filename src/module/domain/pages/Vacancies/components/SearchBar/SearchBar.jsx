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
import {SEARCH_BAR_DICTIONARY} from "./SearchBar.dictionary";

const {
    BUTTON_SEARCH,
    PLACEHOLDER_INPUT,
} = SEARCH_BAR_DICTIONARY;


const SearchBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch(setIsFiltered());
        dispatch(resetVacancies());
        navigate('/domain/vacancies/page/1');
    }


    return (
        <form className={s.SearchBar} onSubmit={(event) => onSubmit(event)}>
            <div className={s.SearchBar_Container}>
                <img src={searchSVG} alt='search'/>
                <input
                    placeholder={PLACEHOLDER_INPUT}
                    onChange={(event) => dispatch(setKeyword(event.target.value))}
                    data-elem="search-input"
                />
                <div className={s.SearchBar_search_wrapper}>
                    <SearchButton
                        value={BUTTON_SEARCH}
                        dataElem="search-button"
                    />
                </div>
            </div>
        </form>
    )
}

export default SearchBar;