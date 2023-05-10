import React, {useEffect, useState} from "react";
import {getVacancyInfo} from "./api/getVacancyInfo";
import VacancyCard from "../Vacancies/components/VacancyCard/VacancyCard";
import BlockInfo from "./components/BlockInfo/BlockInfo";
import {useParams} from "react-router-dom";
import s from './VacancyInfo.module.scss'
import Loader from "../../../../common/ui/components/Loader/Loader";

const VacancyInfo = () => {
    const {id: vacancyId} = useParams();
    const [vacancy, setVacancy] = useState(null);

    useEffect(() => {
        const fetchData = async () => setVacancy(await getVacancyInfo(vacancyId));
        fetchData();
    }, [vacancyId])

    return (
        <div className={s.VacancyInfo}>
            {vacancy ?
                <div className={s.VacancyInfo_Container}>
                    <VacancyCard
                        id={+vacancyId}
                        profession={vacancy.profession}
                        currency={vacancy.currency}
                        typeOfWork={vacancy.type_of_work.title}
                        town={vacancy.town.title}
                        isFavourite={false}
                        handleOpenClick={() => ({})}
                        salaryFrom={vacancy.payment_from}
                        salaryTo={vacancy.payment_to}
                    />
                    <BlockInfo vacancyRichText={vacancy.vacancyRichText}/>
                </div>
                : <Loader/>
            }
        </div>
    )
}

export default VacancyInfo;