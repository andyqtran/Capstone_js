import Api from '../services/api.js';
import Product from '../model/product.js';
import Validation from '../model/validation.js';
import { domId, formatter } from './controller.js';

/**
 * GLOBAL
 */
let api = new Api();
let validation = new Validation();

/**
 * RENDER Table
 */
const renderTable = (data) => {
    let tableBody = domId('tableBody');
    tableBody.innerHTML = data.reduce((content, products) => {
        return (
            content +
            `<tr>
        <td>${products.id}</td>
        <td><strong>${products.name}</strong></td>
        <td>${formatter(products.price)}</td>
        <td><div class='img'><img src='${products.img}' alt='Product image' /></div></td>
        <td>${products.desc}</td>
        <td>
        <button class='btn btn-warning' data-toggle='modal' data-target='#myModal' onclick='editProduct(${products.id
            })'>Edit</button>
        <button class='btn btn-danger' onclick='deleteProduct(${products.id
            })'>Delete</button>
        </td>
        </tr>`
        );
    }, '');
};

/**
 * CALL Api and get UI
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
 */
const getInfoProduct = () => {
    const _name = domId('phoneName').value;
    const _price = domId('price').value;
    const _screen = domId('screen').value;
    const _backCamera = domId('backCamera').value;
    const _frontCamera = domId('frontCamera').value;
    const _img = domId('imgLink').value;
    const _desc = domId('desc').value;
    const _type = domId('brand').value;

    // ================== Validation ==================
    var isValid = true;
    //Validation Name
    isValid &=
        validation.emptyCheck(_name, 'errorName', '(*) Vui lòng nhập tên sản phẩm') &&
        validation.lengthCharacterCheck(
            _name,
            'errorName',
            '(*) Vui lòng nhập 2 - 50 kí tự',
            2,
            50
        );

    //Validation Price
    isValid &= validation.emptyCheck(
        _price,
        'errorPrice',
        '(*) Vui lòng nhập giá tiền'
    ) && validation.priceCheck(
        _price,
        'errorPrice',
        '(*) Vui lòng nhập giá tiền trong khoảng từ 500,000 đến 1,000,000,000'
    );

    //Validation Screen
    isValid &=
        validation.emptyCheck(_screen, 'errorScreen', '(*) Vui lòng nhập loại thông số màn hình') &&
        validation.lengthCharacterCheck(
            _screen,
            'errorScreen',
            '(*) Vui lòng nhập 2 - 50 kí tự',
            2,
            50
        );

    //Validation backCamera
    isValid &=
        validation.emptyCheck(_backCamera, 'errorBackCamera', '(*) Vui lòng nhập thông số camera sau') &&
        validation.lengthCharacterCheck(
            _backCamera,
            'errorBackCamera',
            '(*) Vui lòng nhập 2 - 50 kí tự',
            2,
            50
        );

    //Validation frontCamera
    isValid &=
        validation.emptyCheck(_frontCamera, 'errorFrontCamera', '(*) Vui lòng nhập thông số camera trước') &&
        validation.lengthCharacterCheck(
            _frontCamera,
            'errorFrontCamera',
            '(*) Vui lòng nhập 2 - 50 kí tự',
            2,
            50
        );

    //Validation imgLink
    isValid &=
        validation.emptyCheck(_img, 'errorImgLink', '(*) Vui lòng nhập đường Link hình ảnh') &&
        validation.paternCheck(
            _img,
            /^(https?:\/\/[^\s]+)/,
            'errorImgLink',
            '(*) Vui lòng nhập đường Link hình ảnh hợp lệ (Ví dụ: https://example.com)'
        );

    //Validation description
    isValid &=
        validation.emptyCheck(_desc, 'errorDesc', '(*) Vui lòng nhập phần mô tả') &&
        validation.stringCharacterCheck(
            _desc,
            'errorDesc',
            '(*) Vui lòng nhập chuỗi kí tự'
        ) &&
        validation.lengthCharacterCheck(
            _desc,
            'errorDesc',
            '(*) Vui lòng nhập 2 - 50 kí tự',
            2,
            50
        );

    //Validation brand
    isValid &= validation.brandCheck(
        'brand',
        'errorBrand',
        '(*) Vui lòng chọn hãng điện thoại'
    );
    if (!isValid) return null;
    // ========================================================================== //

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
 */
// Design button
domId('btnAddPhone').onclick = () => {
    domId('modalLabel').innerHTML = 'Phone Management';
    domId('btnAddModal').style.display = 'block';
    domId('btnUpdateModal').style.display = 'none';
};

domId('btnAddModal').onclick = (event) => {
    event.preventDefault();
    const product = getInfoProduct(true);

    if (product) {
        api.callApi('capstoneJS', 'POST', product)
            .then((res) => {
                getListProduct();
                if (isValid) {
                    domId('btnCloseModal').click();
                    alert('Bạn đã thêm sản phẩm thành công');
                }
            })
            .catch((err) => { });
    }
};

/**
 * DELETE product
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
 */
const editProduct = (id) => {
    domId('modalLabel').innerHTML = 'Edit Phone Management';
    domId('btnAddModal').style.display = 'none';
    domId('btnUpdateModal').style.display = 'block';

    api.callApi(`capstoneJS/${id}`, 'GET', null)
        .then((res) => {
            const product = res.data;

            domId('phoneName').value = product.name;
            domId('price').value = product.price;
            domId('screen').value = product.screen;
            domId('backCamera').value = product.backCamera;
            domId('frontCamera').value = product.frontCamera;
            domId('imgLink').value = product.img;
            domId('desc').value = product.desc;
            domId('brand').value = product.type;
        })
        .catch((err) => { });

    domId('btnUpdateModal').onclick = (event) => {
        event.preventDefault();
        updateProduct(id);
    }
};
window.editProduct = editProduct;

/**
 * UPDATE product
 */
const updateProduct = (id) => {
    const product = getInfoProduct();

    if (product) {
        api.callApi(`capstoneJS/${id}`, 'PUT', product)
            .then((res) => {
                getListProduct();
                domId('btnCloseModal').click();
                alert('Bạn đã chỉnh sửa sản phẩm thành công');
            })
            .catch((err) => { });
    }
};

/**
 * FILTER name product
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

domId('btnSearchName').addEventListener('click', () => {
    const keyword = domId('searchName').value;

    renderTable(filterProductsByName(keyword));
});

/**
 * SORT product by price 
 */
domId('sortByPrice').addEventListener('change', () => {
    const sortOption = domId('sortByPrice').value;
    sortProductsByPrice(sortOption);
});

const sortProductsByPrice = (sortOption) => {
    let sortPriceProduct = [];

    switch (sortOption) {
        case 'priceLowToHigh':
            sortPriceProduct = productList.sort((a, b) => a.price - b.price);
            break;
        case 'priceHighToLow':
            sortPriceProduct = productList.sort((a, b) => b.price - a.price);
            break;
        default:
            // If no sorting option is selected, display the original product list
            renderTable(productList);
            return;
    }

    renderTable(sortPriceProduct);
};

/**
 * SORT product by brand 
 */
domId('sortByType').addEventListener('change', () => {
    const sortOption = domId('sortByType').value;
    sortProductsByBrand(sortOption);
});

const sortProductsByBrand = (sortOption) => {
    let sortedProducts = [];

    switch (sortOption) {
        case 'brand1':
            sortedProducts = productList.filter((product) => product.type === 'brand1');
            break;
        case 'brand2':
            sortedProducts = productList.filter((product) => product.type === 'brand2');
            break;
        default:
            // If no sorting option is selected, display the original product list
            sortedProducts = productList;
            break;
    }

    renderTable(sortedProducts);
};




