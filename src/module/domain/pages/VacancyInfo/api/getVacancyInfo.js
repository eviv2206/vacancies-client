import axios from "axios";
import {updateToken} from "../../../api/updateToken";

const SECRET_KEY = "GEU4nvd3rej*jeh.eqp";
const APP_ID = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
const TOKEN_EXPIRED_CODE = 410;

export const getVacancyInfo = async (id) => {
    let accessToken = localStorage.getItem('Authorization');
    if (!accessToken){
        accessToken = await updateToken();
        localStorage.setItem('Authorization', `Bearer ${accessToken}`);
        return await getVacancyInfo(id);
    }
    try {
        const response = await axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${id}`, {
            headers: {
                "x-secret-key": SECRET_KEY,
                "Authorization": accessToken,
                "X-Api-App-Id": APP_ID,
            }
        })
        return response.data;
    } catch (error) {
        debugger;
        if (error.response.data.error.code === TOKEN_EXPIRED_CODE) {
            accessToken = await updateToken();
            localStorage.setItem('Authorization', `Bearer ${accessToken}`);
            return await getVacancyInfo(id);
        }
    }
}