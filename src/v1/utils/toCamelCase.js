// Hàm để chuyển đổi tên từ định dạng "name.service" thành "nameService"
const toCamelCase = (name) => {
  return name
    .split(".")
    .map((part, index) =>
      index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
    )
    .join("");
};

module.exports = {
  toCamelCase,
};
