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
        if(index!=-1){
            this.cartArray.splice(index, 1);
        }
    }
}
