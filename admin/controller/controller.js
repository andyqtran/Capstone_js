export default class Controller {
    domId(id) {
        return document.getElementById(id);
    }
    formatter(num) {
        return new Intl.NumberFormat("vn-VN").format(num);
    }
    renderTable(array) {
        let tableBody = this.domId("tableBody");
        tableBody.innerHTML = array.reduce((acc, cur) => {
            return (
                acc +
                `<tr>
            <td>${cur.id}</td>
            <td><strong>${cur.name}</strong></td>
            <td>$${this.formatter(cur.price)}</td>
            <td><div class="img" ><img src="${cur.img}" alt="" /></div></td>
            <td>${cur.desc}</td>
            <td><button class="btn btn-warning">Edit</button>
            <button class="btn btn-danger">Delete</button>
            </td>
            </tr>`
            );
        }, "");
    }
}
