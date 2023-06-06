import Api from "../model/api.js";
import Controller from "./controller.js";
let api = new Api();
let controller = new Controller();
// Call Api
api.callApi("capstoneJS", "GET", "").then((rs) => {
    controller.renderTable(rs.data);
});

// renderTable
