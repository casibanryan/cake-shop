$(document).ready(function () {
  let totalPrice = Number($('.total-price').attr('data-total'))
  const shippingPrice = 75
  $('.shipping-price').text(`₱ ${shippingPrice.toLocaleString()}`)
  const hasDiscount = localStorage.getItem('discount-price')
  if (hasDiscount) {
    const discountPrice = Number(hasDiscount)
    totalPrice -= discountPrice
    $('.discount-price').text(`₱ ${discountPrice.toLocaleString()}`)
  } else {
    $('.discount-price').text(`None`)
  }
  totalPrice += shippingPrice
  $('.overall-total').text(`₱ ${totalPrice.toLocaleString()}`)

  let amount = Number(`${totalPrice}00`)
  $('#proceed').click(function () {
    const url = 'https://api.paymongo.com/v1/links'
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Basic c2tfdGVzdF9tVkJMR2RSaWl2MW1DYldhQ2ltM3lVWFc6'
      },
      body: JSON.stringify({
        data: { attributes: { amount: amount, description: 'Online Payment for cake shop' } }
      })
    }

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        const data = json.data.attributes
        console.log(json, data)
        window.open(data.checkout_url, '_blank', 'width=800,height=600')
      })
      .catch(err => console.error(err))
  })
})
