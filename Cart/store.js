if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready) // sự kiện phát ra khi toàn bộ cấu trúc HTML đã tải xong
    // tức khi xong DOMContentLoaded thì gọi hàm ready 
} else {
    ready() // gọi ngay lập tức
}

function ready(){
    let removeCartButton = document.getElementsByClassName("btn-danger") //get All btn-danger's classes
    for (let i=0; i<removeCartButton.length; i++){
        let btn = removeCartButton[i]; // take all of it
        btn.addEventListener('click', removeCart)
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for (let i=0; i<quantityInputs.length; i++){
        let quantity = quantityInputs[i]; 
        quantity.addEventListener('change', changeQuantity)
    }

    let addItems = document.getElementsByClassName('btn-primary')
    for (let i=0; i<addItems.length; i++){
        let item = addItems[i]; 
        item.addEventListener('click', addToCart)
    }
}

function addToCart(event){
    const clickedBtn = event.target;
    let price = clickedBtn.parentElement.querySelector('.shop-item-price').innerText
    
    let par = clickedBtn.parentElement.parentElement
    let title = par.querySelector('.shop-item-title').innerText
    let img = par.querySelector('.shop-item-image').src
    
    const cart = document.getElementsByClassName('cart-items')[0]
    let cartItems = cart.querySelectorAll('.cart-item-title')
    for (let i=0; i<cartItems.length; i++){
        let item = cartItems[i]; 
        if (title.trim() === item.innerText.trim()) {
            let quantity = item.parentElement.parentElement.querySelector('.cart-quantity-input')
            quantity.value = parseInt(quantity.value) + 1 // value mặc định sẽ là string
            updateTotal()
            return;
        }
    }
    let cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    let cartRowContent = 
    `
        <div class="cart-item">
            <img class="cart-item-image" src= ${img} alt="Album 1" width="100" height="100">
            <span class="cart-item-title"> ${title} </span>
        </div>
        <span class="cart-price"> ${price} </span>
        <div class="cart-quantity">
            <input class="cart-quantity-input" type="number" value="1" min="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = cartRowContent
    cart.append(cartRow)

    // thêm eventlistener cho các nút mới được thêm vào do ready chỉ dặn dò các nút đã có sẵn
    cartRow.querySelector('.btn-danger').addEventListener('click', removeCart)
    cartRow.querySelector('.cart-quantity-input').addEventListener('change', changeQuantity)
    updateTotal()
}

function removeCart(event){ // event use for each btn
    const clickedBtn = event.target;
    clickedBtn.parentElement.parentElement.remove(); // extend scope to their parent
    updateTotal();
}

function changeQuantity (e){
    if (isNaN(e.target.value) || e.target.value <= 0){ // check if input is not a number or less than 0
        e.target.value = 1;
    }
    updateTotal();
};

function updateTotal(){
    let cart = document.getElementsByClassName("cart-items")[0] // lấy 1 phần tử = querySelector
    let cartRows = cart.getElementsByClassName("cart-row")
    let total = 0;
    for (let i=0; i<cartRows.length; i++){
        let cart = cartRows[i]
        let priceElement = cart.getElementsByClassName('cart-price')[0];
        let price = parseFloat(priceElement.innerText.replace('$', '')) // lấy nội dung price và xóa $, đồng thời ép kiểu number (parse float)

        let quantityElement = cart.getElementsByClassName('cart-quantity-input')[0]
        let quantity = parseFloat(quantityElement.value) // input phải dùng value
        
        total+= quantity * price
        console.log(total)
    }
    total = Math.round(total * 100) / 100 // làm tròn số thập phân
    document.querySelector('.cart-total-price').innerText = '$' + total;
}
