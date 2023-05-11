import React from "react";
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom";
import {usePagination} from "./hooks/usePagination";
import {ReactComponent as ArrowLeftSVG} from '../../../../assets/images/arrowLeft.svg';
import {ReactComponent as ArrowRightSVG} from '../../../../assets/images/arrowRight.svg';
import s from './PageSwitcher.module.scss';
import classNames from "classnames";
import {useDispatch} from "react-redux";
import {resetVacancies} from "../../../../common/ui/store/slices/vacancySearchSlice";


const PageSwitcher = ({currentPage, totalPages}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        prevPage,
        nextPage,
        pageNumbers
    } = usePagination({currentPage, totalPages})
    const onPageChange = (page) => {
        dispatch(resetVacancies());
        navigate(`./../${page}`);
    }

    return (
        <div className={s.PageSwitcher}>
            <button
                className={classNames(s.PageSwitcher_element,
                    prevPage === null ? s.PageSwitcher_element_arrow_disabled : s.PageSwitcher_element_arrow_active)}
                disabled={prevPage === null}
                onClick={() => onPageChange(prevPage)}
            >
                <ArrowLeftSVG/>
            </button>
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    className={classNames(s.PageSwitcher_element, pageNumber === currentPage ? s.PageSwitcher_element_active : '')}
                    onClick={() => onPageChange(pageNumber)}
                >
                    {pageNumber}
                </button>
            ))}
            <button
                className={classNames(s.PageSwitcher_element,
                    nextPage === null ? s.PageSwitcher_element_arrow_disabled : s.PageSwitcher_element_arrow_active)}
                disabled={nextPage === null}
                onClick={() => onPageChange(nextPage)}
            >
                <ArrowRightSVG/>
            </button>
        </div>
)
}

PageSwitcher.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
};

export default PageSwitcher;