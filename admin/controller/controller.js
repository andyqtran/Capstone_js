export default class Controller {
    domId(id) {
        return document.getElementById(id);
    }
    formatter(num) {
        return new Intl.NumberFormat("vn-VN").format(num);
    }
   
}
