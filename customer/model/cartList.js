export default class cartList {
    constructor() {
        this.cartArray = [];
    }

    addToCart(item) {
        this.cartArray.push(item);
    }

    findIndex(id) {
        return this.cartArray.findIndex((item) => item.product.id === id);
    }

    empty() {
        this.cartArray = [];
    }

    delete(id) {
        let index = this.findIndex(id);
        if (index != -1) {
            this.cartArray.splice(index, 1);
        }
    }

    quantityPlus(id) {
        let index = this.findIndex(id);
        if (index != -1) {
            this.cartArray[index].quantity++;
        }
    }

    quantityMinus(id) {
        let index = this.findIndex(id);
        if (index != -1) {
            if (this.cartArray[index].quantity > 1) {
                this.cartArray[index].quantity--;
            } else {
                this.delete(id);
            }
        }
    }

    totalQuantity() {
        if (this.cartArray || this.cartArray.length > 0) {
            return this.cartArray.reduce(
                (total, item) => total + item.quantity,
                0
            );
        } else {
            return 0;
        }
    }
}
