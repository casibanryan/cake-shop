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

function manageCart(id, process) {
  const carts = JSON.parse(localStorage.getItem('carts')) || []
  const cart = carts.find(item => item.id === id)
  if (process === 'up') {
    cart.qty += 1
  } else {
    if (cart.qty > 1) {
      cart.qty -= 1
    } else {
      const deleteCart = carts.filter(item => item.id !== id)
      if (deleteCart) {
        localStorage.setItem('carts', JSON.stringify(deleteCart))
        getCarts()
      }
      return false
    }
  }

  localStorage.setItem('carts', JSON.stringify(carts))
  getCarts()
}

document.addEventListener('DOMContentLoaded', function () {
  getCarts()
})

function getCarts() {
  const carts = JSON.parse(localStorage.getItem('carts')) || []
  let cartList = ''
  let tableCart = ''
  let total = 0
  carts.forEach(cart => {
    total += cart.price * cart.qty
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
                                          data-zeros="true"
                                          value="${cart.qty}"
                                          min="1"
                                          max="1000"
                                        />
                                        <span class="stepper-arrow up" onclick="event.preventDefault(), manageCart(${
                                          cart.id
                                        }, 'up')"></span>
                                        <span class="stepper-arrow down"
                                          onclick="manageCart(${cart.id}, 'down')"
                                        ></span>
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

    tableCart += ` <tr>
                  <td>
                    <a class="table-cart-figure" href="#!">
                      <img src="images/shop/${cart.image}" alt="" width="146" height="132" />
                    </a>
                    <a class="table-cart-link" href="#!">
                        ${cart.name}
                    </a>
                  </td>
                  <td>
                       ₱${cart.price.toLocaleString()}
                  </td>
                  <td>
                   <div class="table-cart-stepper">
                                    <div class="stepper">
                                        <input
                                          class="form-input stepper-input"
                                          type="number"
                                          data-zeros="true"
                                          value="${cart.qty}"
                                          min="1"
                                          max="1000"
                                        />
                                        <span class="stepper-arrow up" onclick="event.preventDefault(), manageCart(${
                                          cart.id
                                        }, 'up')"></span>
                                        <span class="stepper-arrow down"
                                          onclick="manageCart(${cart.id}, 'down')"
                                        ></span>
                                    </div>
                                  
                                  </div>
                  </td>
                  <td>
                        ₱${(cart.price * cart.qty).toLocaleString()}
                  </td>
                </tr>`
  })

  $('#cart-list').html(cartList)
  $('#cart-tbody').html(tableCart)
  $('.total-carts').text(carts.length)
  $('.total-price').text(`₱ ${total.toLocaleString()}`)
  $('.total-price').attr('data-total', total)
}
