document.addEventListener('DOMContentLoaded', async function () {
  let = productList = ''
  await fetch('/database/products.json')
    .then(response => response.json())
    .then(products => {
      products.forEach(product => {
        productList += ` <div class="col-sm-6 col-md-4 col-lg-3"> 
          <article class="product wow fadeInRight">
            <div class="product-body">
              <div class="product-figure">
              <img src="images/shop/${product.image}" alt="${product.image}" width="148" height="128"/> </div>
              <h5 class="product-title">
              <a href="#!">
                ${product.name}
              </a>
              </h5>
              <div class="product-price-wrap">
                `

        if (product.isSale) {
          productList += `<div class="product-price product-price-old">₱${product.price.toLocaleString()}</div>`
          productList += `<div class="product-price">₱${product.salePrice.toLocaleString()}</div>`
        } else {
          productList += `<div class="product-price">₱${product.price.toLocaleString()}</div>`
        }

        productList += `</div>
            </div>`

        if (product.isSale) {
          productList += '<span class="product-badge product-badge-sale">Sale</span>'
        }

        const props = JSON.stringify(product).replace(/"/g, '&quot;')
        productList += `<div class="product-button-wrap">
                      <div class="product-button">
                        <a class="button button-primary-2 button-zakaria fl-bigmug-line-shopping202" href="#!"
                        onclick='event.preventDefault(), addCart(${props})'
                        >
                        </a>
                      </div>
                    </div>
                  </article>
                </div>`
      })
    })

  document.querySelector('#product-list').innerHTML = productList
})
