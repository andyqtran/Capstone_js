import Api from "../services/api.js";
import Controller from "./controller.js";

let api = new Api();
let controller = new Controller();

// Call Api & renderTable
api.callApi("capstoneJS", "GET", "").then((rs) => {
    controller.renderTable(rs.data);
});

