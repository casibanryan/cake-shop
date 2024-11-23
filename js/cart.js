function addCart(product) {
  const carts = JSON.parse(localStorage.getItem('carts')) || []
  if (carts && carts.length > 0) {
    const cart = carts.find(item => item.id === product.id)
    if (cart) {
      cart.qty += 1
      localStorage.setItem('carts', JSON.stringify(carts))
      getCarts()
      return
    }
  }

  carts.push({
    ...product,
    qty: 1
  })
  getCarts()
  localStorage.setItem('carts', JSON.stringify(carts))
}

getCarts()

function getCarts() {
  const carts = JSON.parse(localStorage.getItem('carts')) || []
  let cartList = ''
  let total = 0
  carts.forEach(cart => {
    total += cart.price
    cartList += `<div class="cart-inline-item">
                          <div class="unit unit-spacing-sm align-items-center">
                            <div class="unit-left">
                              <a class="cart-inline-figure" href="javascript:void(0)">
                                <img src="images/shop/${cart.image}" alt="${cart.image}" />
                              </a>
                            </div>
                            <div class="unit-body">
                              <h6 class="cart-inline-name"><a href="javascript:void(0)">
                              ${cart.name}
                              </a></h6>
                              <div>
                                <div class="group-xs group-middle">
                                  <div class="table-cart-stepper">
                                    <div class="stepper">
                                        <input
                                          class="form-input stepper-input"
                                          type="number"
                                          data-zeros="${true}"
                                          value="${cart.qty}"
                                          min="1"
                                          max="1000"
                                        />
                                        <span class="stepper-arrow up"></span>
                                        <span class="stepper-arrow down"></span>
                                    </div>
                                  
                                  </div>
                                  <h6 class="cart-inline-title">
                                    ₱${cart.price.toLocaleString()}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>`

    document.querySelector('#cart-list').innerHTML = cartList
    $('.total-carts').text(carts.length)
    $('.total-price').text(`₱ ${total.toLocaleString()}`)
  })
}
