import React from "react";
import searchingManSVG from '../../../../assets/images/searchingMan.svg'
import {Link} from "react-router-dom";
import s from './NotFound.module.scss';
import {NOT_FOUND_DICTIONARY} from "./NotFound.dictionary";

const {
    TEXT_NOT_FOUND,
    TEXT_SEARCH_VACANCY,
} = NOT_FOUND_DICTIONARY;

const NotFound = () => {
    return (
        <div className={s.NotFound}>
            <div className={s.NotFound_logo}>
                <img src={searchingManSVG} alt='searching man'/>
                <h2>{TEXT_NOT_FOUND}</h2>
                <button className={s.NotFound_logo_button}>
                    <Link to='/domain/vacancies'>
                        {TEXT_SEARCH_VACANCY}
                    </Link>
                </button>
            </div>
        </div>

    )
}

export default NotFound;