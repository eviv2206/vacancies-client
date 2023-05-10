import React from "react";
import PropTypes from "prop-types";
import s from './SearchButton.module.scss'

const SearchButton = (props) => {
    const {
        value,
    } = props;

    return (
        <div className={s.SearchButton}>
            <input type='submit' value={value}></input>
        </div>
    )
}

SearchButton.propTypes = {
    value: PropTypes.string.isRequired
}
export default SearchButton;