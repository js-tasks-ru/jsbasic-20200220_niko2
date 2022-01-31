'use strict';

class CheckoutProductList {

  constructor(parentElement) {
    this.el = parentElement;
    this.getProducts();
    this.show();
    this.initListeners();
  }

  getProducts() {
    let productsLocalStorage = localStorage.getItem('cart-products');
    let productsInCart = JSON.parse(productsLocalStorage) || [];
    return productsInCart;
  }

  getRate(item) {
    
    const stars = new Array(5).fill('').map((value, index) => {
      if (item.rating != null) {
        let modificator = index < item.rating.stars ? 'checked' : 'active';
        return `<i class="icon-star ${modificator}"></i>`
      } else {
        return `<i class="icon-star"></i>`
      }
    }).join('');
    const reviews = item.rating === null ? 0 : item.rating.reviewsAmount;

    return `
        <div class = "rate" >
            ${stars}
        </div>
        <p class="rate-amount d-none d-md-block mt-1">${reviews} reviews <p>
    `
    
  }

  getPrice(item) {
    return `
    <div class="product-price">
      <p class="mb-0 font-weight-light">Price:</p>
      <h4 class="col-title price-text mb-2">${item.price}</h4>
    </div>
    `;
  }

  render() {
    const products = this.getProducts().map((item) => {
      const rate = this.getRate(item);
      const price = this.getPrice(item);

      const product = `
        <div data-product-id="${item.id}" class="product-wrapper box-inner-col description-col">
          <div class="product-image-container">
            <img class="product-image" src="${item.imageUrl}" alt="img">
          </div>
          <div class="product-description">
            <h4 class="col-title mb-2">${item.title}</h4>
            ${rate}
          </div>
          ${price}
          <div class="product-remove-button-wrapper">
            <button type="button"
              data-button-role="checkout-remove-product"
              class="product-remove-button">
            X
            </button>
          </div>
        </div>
      `;

      return product;
    }).join('');
    return products;
  }

  show() {
    const render = this.render();
    const productsInCart = `
    <div class="product-list-box">
      ${render}
    </div>
    `;

    return this.el.innerHTML = productsInCart;
  }

  initListeners() {
    this.el.querySelector('.product-list-box').addEventListener('click', event => {
      const { target } = event;
     
      if (target.getAttribute('data-button-role') !== 'checkout-remove-product') {
        return false;
      }
      if (confirm('Вы уверены, что хотите удалить этот товар из корзины?') !== true) {
        return false;
      } 
      const elem = target.closest('.product-wrapper');
      const id = elem.getAttribute('data-product-id');

      this.deleteProduct(id);
        
    });
  }

  deleteProduct(id) {
    const products = this.getProducts();

    const deletedElement = this.el.querySelector(`div[data-product-id='${id}']`);
    deletedElement.remove();

    const indexOfProductToDelete = products.filter(product => product.id != id);
  
    localStorage.setItem('cart-products', JSON.stringify(indexOfProductToDelete));
  }


}

window.CheckoutProductList = CheckoutProductList;