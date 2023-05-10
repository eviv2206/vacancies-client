import React from "react";
import s from './HeaderDesktop.module.scss';
import titleSVG from '../../../../../assets/images/Union.svg'
import {HEADER_DICTIONARY} from "../Header.dictionary";
import {routerConfig} from "../../../config/routerConfig/routerConfig";
import {NavLink} from "react-router-dom";

const {
    TITLE,
} = HEADER_DICTIONARY;

const HeaderDesktop = () => {
    return (
        <div className={s.HeaderDesktop}>
            <div className={s.HeaderDesktop_logo}>
                <img src={titleSVG} alt='title'/>
                <h2>{TITLE}</h2>
            </div>
            <div className={s.HeaderDesktop_nav_wrapper}>
                {Object.values(routerConfig).map(({name, path}) => (
                    <NavLink
                        key={name}
                        to={path}
                        className={({isActive}) =>
                            isActive ? s.HeaderDesktop_nav_element_active : s.HeaderDesktop_nav_element}>
                        {name}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default HeaderDesktop;