import axios from "axios";
import {updateToken} from "./updateToken";

const SECRET_KEY = "GEU4nvd3rej*jeh.eqp";
const APP_ID = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
const TOKEN_EXPIRED_CODE = 410;

export const getVacancies = async (options) => {
    const {
        ids = [null],
        page = 0,
        catalogues = '',
        payment_from = '',
        payment_to = '',
        keyword = '',
    } = options;
    let accessToken = localStorage.getItem('Authorization');
    if (!accessToken){
        accessToken = await updateToken();
        localStorage.setItem('Authorization', `Bearer ${accessToken}`);
        return await getVacancies(options);
    }
    const published = ((catalogues || payment_from || payment_to || keyword) && 1) || '';
    try {
        const response = await axios.get('https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/', {
            headers: {
                "x-secret-key": SECRET_KEY,
                "Authorization": accessToken,
                "X-Api-App-Id": APP_ID,
            },
            params: {
                page,
                count: 4,
                ids: ids,
                catalogues: catalogues,
                payment_from: payment_from,
                payment_to: payment_to,
                keyword: keyword,
                published: published,
            }
        });
        return response.data;
    } catch (error) {
        debugger;
        if (error.response.data.error.code === TOKEN_EXPIRED_CODE) {
            accessToken = await updateToken();
            localStorage.setItem('Authorization', `Bearer ${accessToken}`);
            return await getVacancies(options);
        }
    }
}
