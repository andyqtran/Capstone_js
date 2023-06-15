const domId = (id) => document.getElementById(id);
const formatter = (num) => new Intl.NumberFormat("vn-VN").format(num);

export { domId, formatter };
