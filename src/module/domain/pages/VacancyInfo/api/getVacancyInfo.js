import axios from "axios";

const ACCESS_TOKEN = "v3.r.137440105.32295230453ee4cabdf91c3bfdf7c8e48fac232b.0bd96fe48b472952267bdb23f86edd6d018fff37";
const SECRET_KET = "GEU4nvd3rej*jeh.eqp";
const APP_ID = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";

export const getVacancyInfo = async (id) => {
    const response = await axios.get(`https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/${id}`, {
        headers: {
            "x-secret-key": SECRET_KET,
            "Authorization": `Bearer ${ACCESS_TOKEN}`,
            "X-Api-App-Id": APP_ID,
        }
    })
    return response.data;
}