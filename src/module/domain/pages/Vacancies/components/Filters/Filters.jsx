import React, {useEffect, useState} from "react";
import s from './Filters.module.scss'
import {FILTERS_DICTIONARY} from "./Filters.dictionary";
import {ReactComponent as FilterCrossSVG} from '../../../../../../assets/images/FiltersCross.svg'
import DropDown from "./components/DropDown/DropDown";
import NumberInput from "./components/NumberInput/NumberInput";
import {useDispatch, useSelector} from "react-redux";
import {
    resetIsFiltered,
    resetSalaryFrom,
    resetSalaryTo,
    resetSelectedIndustry, resetVacancies, setIsFiltered, setSalaryFrom, setSalaryTo, setSelectedIndustry, setVacancies,
} from "../../../../../../common/ui/store/slices/vacancySearchSlice";
import SearchButton from "../SearchButton/SearchButton";
import {getIndustries} from "./api/getIndustries";
import {getVacancies} from "../../../../api/getVacancies";
import {useNavigate} from "react-router-dom";

const {
    FILTERS_TEXT,
    RESET_FILTERS,
    CHOOSE_INDUSTRY,
    INDUSTRY,
    SALARY,
    FROM_TEXT,
    TO_TEXT,
    SUBMIT,
} = FILTERS_DICTIONARY;


const Filters = () => {
    const dispatch = useDispatch();
    const industry = useSelector(state => state.vacancySearch.selectedIndustry);
    const salaryFrom = useSelector(state => state.vacancySearch.salaryFrom);
    const salaryTo = useSelector(state => state.vacancySearch.salaryTo);
    const keyword = useSelector(state => state.vacancySearch.keyword);
    const [industries, setIndustries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            const response = await getIndustries();
            setIndustries(response.map(industry => {
                return {title: industry.title_rus, key: industry.key}
            }));
        }
        fetchData();
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        dispatch(resetVacancies());
        const response = await getVacancies({
            catalogues: industry.key,
            payment_from: salaryFrom,
            payment_to: salaryTo,
            keyword: keyword,
        });
        dispatch(setIsFiltered());
        dispatch(setVacancies(response.objects));
        navigate('/domain/vacancies/page/1');
    }

    const clearFilters = () => {
        dispatch(resetIsFiltered());
        dispatch(resetSelectedIndustry());
        dispatch(resetSalaryFrom());
        dispatch(resetSalaryTo());
    }

    return (
        <form className={s.Filter} onSubmit={(event) => onSubmit(event)}>
            <div className={s.Filter_wrapper}>
                <div className={s.Filter_title}>
                    <h3>{FILTERS_TEXT}</h3>
                    <div className={s.Filter_resetFilters} onClick={clearFilters}>
                        <p>{RESET_FILTERS}</p>
                        <FilterCrossSVG/>
                    </div>
                </div>
                <div className={s.Filter_dropdowns_wrapper}>
                    <div className={s.Filter_industry}>
                        <h4>{INDUSTRY}</h4>
                        <DropDown
                            options={industries}
                            placeholder={CHOOSE_INDUSTRY}
                            value={industry}
                            setValue={(value) => dispatch(setSelectedIndustry(value))}
                        />
                    </div>
                    <div className={s.Filter_salary}>
                        <h4>{SALARY}</h4>
                        <NumberInput
                            placeholder={FROM_TEXT}
                            value={salaryFrom}
                            setValue={(value) => dispatch(setSalaryFrom(value))}
                        />
                        <NumberInput
                            placeholder={TO_TEXT}
                            value={salaryTo}
                            setValue={(value) => dispatch(setSalaryTo(value))}
                        />
                    </div>
                </div>
                <div className={s.Filter_submit_wrapper}>
                    <SearchButton value={SUBMIT}/>
                </div>
            </div>
        </form>
    )
}

export default Filters;