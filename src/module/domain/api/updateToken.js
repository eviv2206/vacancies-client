import axios from "axios";

const SECRET_KEY = "GEU4nvd3rej*jeh.eqp";
const APP_ID = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
const LOGIN = 'sergei.stralenia@gmail.com';
const PASSWORD = 'paralect123';
const CLIENT_ID = '2356';
const HR = 0;

export const updateToken = async () => {
    const response = await axios.get('https://startup-summer-2023-proxy.onrender.com/2.0/oauth2/password',{
        headers: {
            "x-secret-key": SECRET_KEY,
            "X-Api-App-Id": APP_ID
        },
        params: {
            login: LOGIN,
            password: PASSWORD,
            'client_id': CLIENT_ID,
            'client_secret': APP_ID,
            hr: HR,
        }
    });
    return response.data.access_token;
}