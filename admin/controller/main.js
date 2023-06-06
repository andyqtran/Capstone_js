import Api from "../model/api.js";
let api = new Api();

// Call Api
api.callApi("capstoneJS", "GET", "").then((rs) => {
    console.log(rs.data);
});
