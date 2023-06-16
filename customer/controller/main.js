import Api from "../services/api.js";
import Controller from "./controller.js";
import CartItem from "../model/cartItem.js";
import CartList from "../model/cartList.js";

let api = new Api();
let controller = new Controller();
let cartList = new CartList();

// Dom
function domId(id) {
    return document.getElementById(id);
}

// Set local storage
function setLocalStorage() {
    localStorage.setItem("cartList", JSON.stringify(cartList.cartArray));
}

function getLocalStorage() {
    let data = JSON.parse(localStorage.getItem("cartList"));
    if (data) {
        cartList.cartArray = data;
        renderCart(cartList.cartArray);
    }
}

function btnAddToCart(id) {
    api.callApi(`capstoneJS/${id}`, "GET", "").then((rs) => {
        let index = cartList.findIndex(rs.data.id);
        if (index === -1) {
            let cartItem = new CartItem(rs.data);
            cartList.addToCart(cartItem);
        } else {
            cartList.cartArray[index].quantity++;
        }

        renderCart(cartList.cartArray);
        setLocalStorage();
    });
}
window.btnAddToCart = btnAddToCart;

function btnDelete(id) {
    cartList.delete(id);
    renderCart(cartList.cartArray);
    setLocalStorage();
}

window.btnDelete = btnDelete;
// Render table
function renderTable(array) {
    if (array && array.length > 0) {
        let renderRow = domId("renderRow");
        renderRow.innerHTML = array.reduce((acc, cur) => {
            return (
                acc +
                `<div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                        <div class="card">
                            <div class="overlay"></div>
                            <div class="content">
                                <div class="img">
                                    <img
                                        src=${cur.img}
                                    />
                                </div>
                                <p class="name mt-4 text-center">
                                    ${cur.name}
                                </p>
                                <p class="price text-center">
                                    $${controller.formatter(
                                        cur.price
                                    )} <span>$${controller.formatter(
                    cur.price * 1.5
                )}</span>
                                </p>
                                <div class="brand mb-3">
                                    <span>${
                                        cur.type === "brand1"
                                            ? "Apple"
                                            : "Samsung"
                                    }</span>
                                </div>
                                <p class="desc">
                                    <strong>Description: </strong>${cur.desc}
                                </p>
                                <div
                                    class="rating d-flex justify-content-between"
                                >
                                    <div class="stars text-warning">
                                        <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i>
                                        <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i>
                                        <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i>
                                        <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i>
                                        <i
                                            class="fa fa-star"
                                            aria-hidden="true"
                                        ></i>
                                    </div>
                                    <p class="stock text-success">
                                        In Stock
                                    </p>
                                </div>
                            </div>
                            <div class="spec text-white">
                                <div class="h3 text-center">
                                    Specifications
                                </div>
                                <div class="detail mt-5">
                                    <div class="detail-line d-flex justify-content-start mt-3">
                                        <span
                                            ><strong class="mr-2">Screen: </strong></span
                                        >
                                        <span>
                                            ${cur.screen}
                                        </span>
                                    </div>

                                    <div class="detail-line d-flex justify-content-start mt-3">
                                        <span
                                            ><strong class="mr-2"
                                                >Back-Cam:
                                            </strong></span
                                        >
                                        <span>${cur.backCamera}</span>
                                    </div>

                                    <div class="detail-line d-flex justify-content-start mt-3 mb-5">
                                        <span
                                            ><strong class="mr-2"
                                                >Front-Cam:
                                            </strong></span
                                        >
                                        <span>${cur.frontCamera}</span>
                                    </div>
                                </div>
                                <a href="#!" class="detailLink text-light d-block text-center"
                                    >Click here for more details</a
                                >
                            </div>
                            <button type="button" class="btn addToCard-btn text-light bg-warning" onclick="btnAddToCart('${
                                cur.id
                            }')">Add to cart</button>
                        </div>
                    </div>`
            );
        }, "");
    }
}

function clearPayment() {
    domId("subTotal").innerHTML = "$0";
    domId("tax").innerHTML = "$0";
    domId("shipping").innerHTML = "$0";
    domId("total").innerHTML = "$0";
}

// Handle badge
function handleBadge() {
    domId("badge").innerHTML = cartList.totalQuantity();
}

// Render cart
function renderCart(array) {
    let cartBody = domId("cartBody");
    if (array && array.length > 0) {
        let subTotal = 0;
        cartBody.innerHTML = array.reduce((acc, cur) => {
            subTotal += cur.product.price * cur.quantity;
            return (
                acc +
                `
            <div class="item-top">
            <div class="img">
                <img
                    src=${cur.product.img}
                    alt=""
                />
            </div>
            <div class="info">
                <p class="name">
                    <strong><i>${cur.product.name}</i></strong>
                </p>
                <p class="screen">
                    <strong>Screen: </strong>${cur.product.screen}
                </p>
                <p class="back">
                    <strong>Back-Cam: </strong>${cur.product.backCamera}
                </p>
                <p class="front">
                    <strong>Front-Cam: </strong>${cur.product.frontCamera}
                </p>
                <button class="btn btn-danger" id="cartRemoveBtn" onclick ="btnDelete('${
                    cur.product.id
                }')">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </div>
        </div>
        <div class="d-flex item-bottom">
            <p class="mr-3"><strong>Quantity: </strong></p>
            <div class="icon-group d-flex">
                <button class="bg-dark btn btn-dark" id="cartMinusBtn" onclick = "handleMinus('${
                    cur.product.id
                }')">
                    <i class="fa-solid fa-minus text-light"></i>
                </button>
                <span class="mx-3">${cur.quantity}</span>
                <button class="bg-dark btn btn-dark" id="cartPlusBtn" onclick="handlePlus('${
                    cur.product.id
                }')">
                    <i class="fa-solid fa-plus text-light"></i>
                </button>
            </div>
            <p class="price ml-auto mr-3"><strong>$${controller.formatter(
                cur.product.price
            )}</strong></p>
        </div>
        <hr class="mt-0" />
            `
            );
        }, "");
        let tax = subTotal * 0.1;
        let shipping = 10;
        let total = subTotal + tax + shipping * 1;
        domId("subTotal").innerHTML = `$${controller.formatter(subTotal)}`;
        domId("tax").innerHTML = `$${controller.formatter(tax)}`;
        domId("shipping").innerHTML = `$${controller.formatter(shipping)}`;
        domId("total").innerHTML = `$${controller.formatter(total)}`;
    } else {
        cartBody.innerHTML = "";
        clearPayment();
    }
    handleBadge();
}

// Get local storage
getLocalStorage();

// Call Api & renderTable
api.callApi("capstoneJS", "GET", "").then((rs) => {
    renderTable(rs.data);
});

// Open navbar
controller.handleNavbar();

// Handle open and close cart
controller.handleCart();

// Handle empty
domId("emptyBtn").onclick = () => {
    cartList.empty();
    renderCart(cartList.cartArray);
    setLocalStorage();
    clearPayment();
};

// Handle plus button
function handlePlus(id) {
    cartList.quantityPlus(id);
    renderCart(cartList.cartArray);
    setLocalStorage();
}
window.handlePlus = handlePlus;

// Handle minus button
function handleMinus(id) {
    cartList.quantityMinus(id);
    renderCart(cartList.cartArray);
    setLocalStorage();
}
window.handleMinus = handleMinus;

// Handle toast
function handleToast({ title, mes, type }) {
    let main = domId("toast");
    if (main) {
        const toast = document.createElement("div");
        // auto remove toast
        const autoRemoved = setTimeout(function () {
            main.removeChild(toast);
        }, 5000);

        // manual remove toast
        toast.onclick = (e) => {
            if (e.target.closest(".toast__close")) {
                main.removeChild(toast);
                clearTimeout(autoRemoved);
            }
        };
        const icons = {
            success: "fa-solid fa-circle-check",
            error: "fa-solid fa-circle-exclamation",
        };
        const icon = icons[type];

        toast.classList.add("toast-box", `toast--${type}`);
        toast.innerHTML = `
                <div class="toast__icon">
                <i class='${icon}'></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${mes}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
        `;
        main.appendChild(toast);
    }
}
function sleep(ms) {
    return new Promise(function (resolve) {
        setTimeout(resolve, ms);
    });
}

domId("payBtn").onclick = () => {
    if (cartList.cartArray.length === 0) {
        handleToast({
            title: "Thất bại!",
            mes: "Thanh toán thất bại. Giỏ hàng trống, vui lòng kiểm tra lại giỏ hàng.",
            type: "error",
        });
        setTimeout(function () {
            domId("shoppingBtn").click();
        }, 1500);
    } else {
        handleToast({
            title: "Thành công!",
            mes: "Thanh toán thành công",
            type: "success",
        });
        sleep(1000)
            .then(() => {
                domId("emptyBtn").click();
                return sleep(500);
            })
            .then(() => {
                domId("shoppingBtn").click();
            });
    }
};

// Handle filter
domId("selectList").onchange = async function () {
    const rs = await api.callApi(`capstoneJS`, "GET", "");
    const filtered = rs.data.filter(
        (item) => item.type.toLowerCase() === this.value.toLowerCase()
    );

    if (filtered.length > 0) {
        renderTable(filtered);
    } else {
        renderTable(rs.data);
    }
};
