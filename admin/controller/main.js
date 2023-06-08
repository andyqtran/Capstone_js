import Api from "../services/api.js";
import Controller from "./controller.js";

let api = new Api();
let controller = new Controller();

function renderTable(array) {
    let tableBody = controller.domId("tableBody");
    tableBody.innerHTML = array.reduce((acc, cur) => {
        return (
            acc +
            `<tr>
        <td>${cur.id}</td>
        <td><strong>${cur.name}</strong></td>
        <td>$${controller.formatter(cur.price)}</td>
        <td><div class="img" ><img src="${cur.img}" alt="" /></div></td>
        <td>${cur.desc}</td>
        <td><button class="btn btn-warning">Edit</button>
        <button class="btn btn-danger">Delete</button>
        </td>
        </tr>`
        );
    }, "");
}

// Call Api & renderTable
api.callApi("capstoneJS", "GET", "").then((rs) => {
    renderTable(rs.data);
});

