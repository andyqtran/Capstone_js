export default class Api {
    callApi(endpoint, method, data) {
        return axios({
            url: `https://647f4d1cc246f166da908748.mockapi.io/${endpoint}`,
            method,
            data,
        });
    }
}
