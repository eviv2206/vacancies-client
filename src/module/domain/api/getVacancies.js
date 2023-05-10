import axios from "axios";

const ACCESS_TOKEN = "v3.r.137440105.32295230453ee4cabdf91c3bfdf7c8e48fac232b.0bd96fe48b472952267bdb23f86edd6d018fff37";
const SECRET_KET = "GEU4nvd3rej*jeh.eqp";
const APP_ID = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";

export const getVacancies = async (options) => {
    const {
        ids = [null],
        page = 0,
        catalogues = '',
        payment_from = '',
        payment_to = '',
        keyword = '',
    } = options;
    const published = ((catalogues || payment_from || payment_to || keyword) && 1) || '';
    const response = await axios.get('https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/', {
        headers: {
            "x-secret-key": SECRET_KET,
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
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
    })
    return response.data;
}