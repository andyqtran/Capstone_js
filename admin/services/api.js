import { DOMAIN } from "../common/constant.js";

export default class Api {
    callApi(endpoint, method, data) {
        return axios({
            url: `${DOMAIN}/${endpoint}`,
            method,
            data,
        });
    }
}
