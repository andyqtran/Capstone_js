export default class Controller {
    domId(id) {
        return document.getElementById.bind(document)(id);
    }

    formatter(num) {
        return new Intl.NumberFormat("vn-VN").format(num);
    }

    handleNavbar() {
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
    handleCart() {
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
