import React from "react";
import PropTypes from "prop-types";
import s from './BlockInfo.module.scss';

const BlockInfo = (props) => {
    const vacancyRichText = props.vacancyRichText;

    return (
        <div className={s.BlockInfo}>
            <div dangerouslySetInnerHTML={{__html: vacancyRichText}} className={s.BlockInfo_Wrapper}></div>
        </div>
    )
}

BlockInfo.propTypes = {
    vacancyRichText: PropTypes.string.isRequired,
}

export default BlockInfo;