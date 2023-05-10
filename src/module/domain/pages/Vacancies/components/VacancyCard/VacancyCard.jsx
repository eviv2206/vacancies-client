import React, {useState} from "react";
import PropTypes from "prop-types";
import s from './VacancyCard.module.scss';
import pointSVG from '../../../../../../assets/images/point.svg';
import locationSVG from '../../../../../../assets/images/location.svg';
import {ReactComponent as StarIcon} from '../../../../../../assets/images/Star.svg';

const VacancyCard = (props) => {
    const {
        id,
        profession,
        salaryTo,
        salaryFrom,
        typeOfWork,
        town,
        currency,
        handleOpenClick,
    } = props;

    const getIsFavourite = () => {
        return JSON.parse(localStorage.getItem('favourites'))?.includes(id);
    }

    const defIsFavourite = getIsFavourite();

    const [favourite, setFavourite] = useState(defIsFavourite);

    const salaryText = (salaryTo && salaryFrom) ? `з/п ${salaryFrom} - ${salaryTo} ${currency}`
        : salaryFrom ? `з/п ${salaryFrom} ${currency}` : 'з/п Не указано';


    const handleSetFavourite = () => {
        let favourites = JSON.parse(localStorage.getItem('favourites'));
        if (favourites === null) {
            favourites = [];
        }
        if (favourite) {
            const newFavourites = favourites.filter(favouriteItem => favouriteItem !== id);
            localStorage.setItem('favourites', JSON.stringify(newFavourites));
        } else {
            favourites.push(id);
            localStorage.setItem('favourites', JSON.stringify(favourites));
        }
        setFavourite(!favourite);
    }

    return (
        <div className={s.VacancyCard}>
            <div className={s.VacancyCard_wrapper}>
                <div className={s.VacancyCard_title}>
                    <div onClick={() => handleOpenClick(id)} className={s.VacancyCard_title_text}>
                        <h3>{profession}</h3>
                    </div>
                    <div
                        onClick={handleSetFavourite}
                        className={favourite ? s.VacancyCard_title_favourite_selected : s.VacancyCard_title_favourite}>
                        <StarIcon/>
                    </div>
                </div>
                <div className={s.VacancyCard_info}>
                    <p className={s.VacancyCard_info_salary}>{salaryText}</p>
                    <img src={pointSVG} alt='point'/>
                    <p className={s.VacancyCard_info_typeOfWork}>{typeOfWork}</p>
                </div>
                <div className={s.VacancyCard_location}>
                    <img src={locationSVG} alt='location'/>
                    <p>{town}</p>
                </div>
            </div>
        </div>
    )


}

VacancyCard.propTypes = {
    id: PropTypes.number.isRequired,
    profession: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    typeOfWork: PropTypes.string.isRequired,
    town: PropTypes.string.isRequired,
    handleOpenClick: PropTypes.func.isRequired,
    salaryFrom: PropTypes.number,
    salaryTo: PropTypes.number,
}

export default VacancyCard;