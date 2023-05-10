import React, {useState} from "react";
import {HEADER_DICTIONARY} from "../Header.dictionary";
import titleSVG from "../../../../../assets/images/Union.svg";
import burgerMenuSVG from "../../../../../assets/images/burgerMenu.svg";
import closeBtnSVG from "../../../../../assets/images/closeBtn.svg";
import {routerConfig} from "../../../config/routerConfig/routerConfig";
import {NavLink} from "react-router-dom";
import s from "./HeaderMobile.module.scss";

const {
    TITLE,
} = HEADER_DICTIONARY;

const HeaderMobile = () => {
    const [isActiveMenu, setIsActiveMenu] = useState(false);

    return (
        <div className={isActiveMenu ? s.Header_wrapper_fixed : ''}>
            <div className={s.HeaderMobile}>
                <div className={s.HeaderMobile_logo}>
                    <img src={titleSVG} alt='title'/>
                    <h2>{TITLE}</h2>
                </div>
                {isActiveMenu ?
                    <img
                        onClick={() => setIsActiveMenu(!isActiveMenu)}
                        src={closeBtnSVG}
                        alt="close"
                    />
                    :
                    <img
                        onClick={() => setIsActiveMenu(!isActiveMenu)}
                        src={burgerMenuSVG}
                        alt='menu'
                    />
                }
            </div>
            {isActiveMenu &&
                <div className={s.Menu}>
                    {Object.values(routerConfig).map(({name, path}) => (
                        <NavLink key={name} to={path}
                                 onClick={() => setIsActiveMenu(!isActiveMenu)}
                                 className={
                                     ({isActive}) => isActive ? s.Menu_element_active : s.Menu_element
                                 }>
                            {name}
                        </NavLink>
                    ))}
                </div>
            }
        </div>
    )
}

export default HeaderMobile;