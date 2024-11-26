$('.apply-coupon').on('click', function (event) {
  let value = $('#coupon-code').val()
  if (value === 'bea123') {
    let totalPrice = $('.total-price').attr('data-total')
    let discountPrice = totalPrice - totalPrice * 0.1
    $('.total-price').text(`₱ ${discountPrice.toLocaleString()}`)
    localStorage.setItem('discount-price', totalPrice - discountPrice)
  }
})
