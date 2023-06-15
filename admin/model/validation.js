import { domId, formatter } from '../controller/controller.js';
export default class Validation {
    constructor() {
        //
        this.emptyCheck = function (value, errorId, mess) {
            if (value === '') {
                //False
                domId(errorId).style.display = 'block';
                domId(errorId).innerHTML = mess;
                return false;
            }

            //True
            domId(errorId).style.display = 'none';
            domId(errorId).innerHTML = '';
            return true;
        };

        // 
        this.lengthCharacterCheck = function (value, errorId, mess, min, max) {
            if (min <= value.length && value.length <= max) {
                //True
                domId(errorId).style.display = 'none';
                domId(errorId).innerHTML = '';
                return true;
            }

            //False
            domId(errorId).style.display = 'block';
            domId(errorId).innerHTML = mess;
            return false;
        };

        // 
        this.stringCharacterCheck = function (value, errorId, mess) {
            var letter =
                '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ' +
                'ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ' +
                'ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s.,?!@#$%^]+$';
            if (value.match(letter)) {
                //True
                domId(errorId).style.display = 'none';
                domId(errorId).innerHTML = '';
                return true;
            }

            //False
            domId(errorId).style.display = 'block';
            domId(errorId).innerHTML = mess;
            return false;
        };

        this.paternCheck = function (value, letter, errorId, mess) {
            if (value.match(letter)) {
                //True
                domId(errorId).style.display = 'none';
                domId(errorId).innerHTML = '';
                return true;
            }

            //False
            domId(errorId).style.display = 'block';
            domId(errorId).innerHTML = mess;
            return false;
        };

        //
        this.priceCheck = function (value, errorId, mess) {
            //False
            if (value < 500000 || value > 1000000000) {
                domId(errorId).style.display = 'block';
                domId(errorId).innerHTML = mess;
                return false;
            }

            //True
            // if (value >= 1000000 && value <= 20000000) {
                domId(errorId).style.display = 'none';
                domId(errorId).innerHTML = '';
                return true;
            // }
        };

        //
        this.brandCheck = function (idSelect, errorId, mess) {
            if (domId(idSelect).selectedIndex !== 0) {
                //True
                domId(errorId).style.display = 'none';
                domId(errorId).innerHTML = '';
                return true;
            }

            //False
            domId(errorId).style.display = 'block';
            domId(errorId).innerHTML = mess;
            return false;
        };
    }
}
