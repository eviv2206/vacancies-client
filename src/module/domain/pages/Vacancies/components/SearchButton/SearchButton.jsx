import React from "react";
import PropTypes from "prop-types";
import s from './SearchButton.module.scss'

const SearchButton = (props) => {
    const {
        value,
        dataElem,
    } = props;

    return (
        <div className={s.SearchButton}>
            <button type='submit' data-elem={dataElem}>{value}</button>
        </div>
    )
}

SearchButton.propTypes = {
    value: PropTypes.string.isRequired,
    dataElem: PropTypes.string.isRequired
}
export default SearchButton;