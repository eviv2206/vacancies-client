import React, {useState} from "react";
import PropTypes from "prop-types";
import s from './DropDown.module.scss';
import {ReactComponent as ArrowDropDown} from "../../../../../../../../assets/images/arrowDropDown.svg";
import classNames from "classnames";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedIndustry} from "../../../../../../../../common/ui/store/slices/vacancySearchSlice";

const DropDown = (props) => {
    const {
        options,
        placeholder,
        dataElem
    } = props;

    const [isOpenDropDown, setIsOpenDropDown] = useState(false);
    const dispatch = useDispatch();
    const industry = useSelector((state) => state.vacancySearch.selectedIndustry);

    const handleOptionClick = (event) => {
        dispatch(setSelectedIndustry(options.find((option) => option.title === event.target.outerText)));
        setIsOpenDropDown(!isOpenDropDown);
    };

    const handleDropDownClick = () => {
        setIsOpenDropDown(!isOpenDropDown);
    };


    return (
        <div className={s.DropDown}>
            <div className={classNames(s.DropDown_input, isOpenDropDown ? s.DropDown_input_active : '')}
                 onClick={handleDropDownClick}>
                <input
                    placeholder={placeholder}
                    value={industry.title}
                    readOnly={true}
                    data-elem={dataElem}
                />
                <ArrowDropDown/>
            </div>
            {isOpenDropDown &&
                <ul className={s.DropDown_menu}>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            onClick={(event) => handleOptionClick(event)}
                            className={option === industry ? s.DropDown_menu_item_current : s.DropDown_menu_item}
                        >
                            {option.title}
                        </li>
                    ))}
                </ul>
            }
        </div>
    )

}

DropDown.propTypes = {
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    dataElem: PropTypes.string.isRequired,
}

export default DropDown;