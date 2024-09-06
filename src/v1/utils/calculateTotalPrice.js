const calTotalPriceCart = (cartData) => {
    let totalPrice = 0;
    for (let i = 0; i < cartData.length; i++) {
        const item = cartData[i];
        const quantity = item.cb_book_num;
        const price = parseFloat(item.book.book_spe_price.replace(",", "")); // Parse price to float
        totalPrice += quantity * price;
    }
    return totalPrice;
}

module.exports = {
    calTotalPriceCart
}