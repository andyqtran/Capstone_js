export default class Controller {
    domId(id) {
        return document.getElementById(id);
    }
    formatter(num) {
        return new Intl.NumberFormat("vn-VN").format(num);
    }
    renderTable(array) {
        let renderRow = this.domId("renderRow");
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
                                        $${this.formatter(
                                            cur.price
                                        )} <span>$${this.formatter(
                    cur.price * 1.5
                )}</span>
                                    </p>
                                    <div class="brand mb-3">
                                        <span>${cur.type}</span>
                                    </div>
                                    <p class="desc">
                                        <strong>Description: </strong>${
                                            cur.desc
                                        }
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
                                                    >Back Camera:
                                                </strong></span
                                            >
                                            <span>${cur.backCamera}</span>
                                        </div>

                                        <div class="detail-line d-flex justify-content-start mt-3 mb-5">
                                            <span
                                                ><strong class="mr-2"
                                                    >Front Camera:
                                                </strong></span
                                            >
                                            <span>${cur.frontCamera}</span>
                                        </div>
                                    </div>
                                    <a href="#!" class="detailLink text-light d-block text-center"
                                        >Click here for more details</a
                                    >
                                </div>
                                <button class="btn addToCard-btn text-light bg-warning ">Add to cart</button>
                            </div>
                        </div>`
            );
        }, "");
    }
    openNavbar() {
        document.onscroll = () => {
            let scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop < 200) {
                this.domId("navbar").style.backgroundColor = "rgba(0, 0, 0, 0)";
            } else {
                this.domId("navbar").style.backgroundColor =
                    "rgba(0, 0, 0, 0.8)";
            }
        };
    }
    openCart() {
        this.domId("navToggle").onclick = function () {
            document
                .querySelector(".offcanvas-collapse")
                .classList.toggle("open");
        };

        this.domId("navbar-overlay").onclick = function () {
            document
                .querySelector(".offcanvas-collapse")
                .classList.remove("open");
        };

        this.domId("shoppingBtn").onclick = function () {
            document
                .querySelector(".offcanvas-collapse")
                .classList.remove("open");
        };
    }
}
