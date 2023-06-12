import Api from '../services/api.js';
import Controller from './controller.js';
import Product from '../model/product.js';

/**
 * GLOBAL
 * need change controller.js
 */
let api = new Api();
let controller = new Controller();
const getEle = (id) => document.getElementById(id);


/**
 * RENDER Table
 * done
 */
const renderTable = (data) => {
    let tableBody = controller.domId('tableBody');
    tableBody.innerHTML = data.reduce((acc, cur) => {
        return (
            acc +
            `<tr>
        <td>${cur.id}</td>
        <td><strong>${cur.name}</strong></td>
        <td>$${controller.formatter(cur.price)}</td>
        <td><div class='img'><img src='${cur.img}' alt='Product image' /></div></td>
        <td>${cur.desc}</td>
        <td>
        <button class='btn btn-warning' data-toggle='modal' data-target='#myModal' onclick='editProduct(${cur.id
            })'>Edit</button>
        <button class='btn btn-danger' onclick='deleteProduct(${cur.id
            })'>Delete</button>
        </td>
        </tr>`
        );
    }, '');
};

/**
 * CALL Api and get UI
 * done
 */
const getListProduct = () => {
    api.callApi('capstoneJS', 'GET', null)
        .then((res) => {
            renderTable(res.data);
        })
        .catch((err) => { })
};
getListProduct();

/**
 * GET information from user
 * done
 */
const getInfoProduct = () => {
    const _name = getEle('phoneName').value;
    const _price = getEle('price').value;
    const _screen = getEle('screen').value;
    const _backCamera = getEle('backCamera').value;
    const _frontCamera = getEle('frontCamera').value;
    const _img = getEle('imgLink').value;
    const _desc = getEle('desc').value;
    const _type = getEle('brand').value;

    const product = new Product(
        null,
        _name,
        _price,
        _screen,
        _backCamera,
        _frontCamera,
        _img,
        _desc,
        _type
    );

    return product;
};

/**
 * ADD product
 * done
 */
// Design button
getEle('btnAddPhone').onclick = function () {
    getEle('modalLabel').innerHTML = 'Phone Management';
    getEle('btnAddModal').style.display = 'block';
    getEle('btnUpdateModal').style.display = 'none';
};

getEle('btnAddModal').onclick = () => {
    const product = getInfoProduct();
    // product.img = product.imgLink;

    api.callApi('capstoneJS', 'POST', product)
        .then((res) => {
            getListProduct();
            getEle('btnCloseModal').click();
            alert('Bạn đã thêm sản phẩm thành công');
        })
        .catch((err) => { });
};

/**
 * DELETE product
 * done
 */
const deleteProduct = (id) => {
    api.callApi(`capstoneJS/${id}`, 'DELETE', null)
        .then(() => {
            getListProduct();
            alert('Bạn đã xóa một sản phẩm');
        })
        .catch((err) => { });
};
window.deleteProduct = deleteProduct;

/**
 * EDIT product
 * done
 */
const editProduct = (id) => {
    getEle('modalLabel').innerHTML = 'Edit Phone Management';
    getEle('btnAddModal').style.display = 'none';
    getEle('btnUpdateModal').style.display = 'block';

    api.callApi(`capstoneJS/${id}`, 'GET', null)
        .then((res) => {
            const product = res.data;

            getEle('phoneName').value = product.name;
            getEle('price').value = product.price;
            getEle('screen').value = product.screen;
            getEle('backCamera').value = product.backCamera;
            getEle('frontCamera').value = product.frontCamera;
            getEle('imgLink').value = product.img;
            getEle('desc').value = product.desc;
            getEle('brand').value = product.type;
        })
        .catch((err) => { });

    getEle('btnUpdateModal').onclick = () => updateProduct(id);
};
window.editProduct = editProduct;

/**
 * UPDATE product
 * done
 */
const updateProduct = (id) => {
    const product = getInfoProduct();
    api
        .callApi(`capstoneJS/${id}`, 'PUT', product)
        .then((res) => {
            getListProduct();
            getEle('btnCloseModal').click();
            alert('Bạn đã chỉnh sửa sản phẩm thành công');
        })
        .catch((err) => { });
};

/**
 * FILTER name product
 * done
 */
let productList = [];
const getListProductSearch = () => {
    api.callApi('capstoneJS', 'GET', null)
        .then((res) => {
            productList = res.data;
            renderTable(productList);
        })
        .catch((err) => { });
};
getListProductSearch();

const filterProductsByName = (keyword) => {
    const filteredProducts = productList.filter((product) => {
        return product.name.toLowerCase().includes(keyword.toLowerCase());
    });

    return filteredProducts;
};

getEle('btnSearchName').addEventListener('click', () => {
    const keyword = getEle('searchName').value;
    renderTable(filterProductsByName(keyword));
});

/**
 * SORT price product
 * done
 */
getEle('sortByPrice').addEventListener('change', () => {
    const sortOption = getEle('sortByPrice').value;
    sortProductsByPrice(sortOption);
});

const sortProductsByPrice = (sortOption) => {
    let sortedProducts = [];

    switch (sortOption) {
        case 'priceLowToHigh':
            sortedProducts = productList.sort((a, b) => a.price - b.price);
            break;
        case 'priceHighToLow':
            sortedProducts = productList.sort((a, b) => b.price - a.price);
            break;
        default:
            // If no sorting option is selected, display the original product list
            renderTable(productList);
            return;
    }
    renderTable(sortedProducts);
};
