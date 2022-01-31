class ProductList {
  constructor(element) {
    this.el = element;
    this.productsUrl = '/assets/data/products.json';
  }

  initListeners() {
    this.el.addEventListener('click', event => {
      const { target } = event;
     
      if (target.getAttribute('data-button-role') == 'add-to-cart') {
        if (!confirm('Вы уверены, что хотите добавить этот товар в корзину?')) {
          return false;
        }
       
        const elem = target.closest('.products-list-product');
        const id = elem.getAttribute('data-product-id');

        this.putProducts(id);
      }
      
    });
  };

  load() {
    return fetch(this.productsUrl)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.data = data;
      });
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
            <span class = "rate-amount ml-2" >${reviews}</span>
        </div>
    `
  }

  getPrice(item) {
    const oldPriceLabel = item.oldPrice ? `<small className="ml-2">${item.oldPrice}</small>` : '';

    return `
     <p class="card-text price-text discount"><strong>${item.price}</strong>
        ${oldPriceLabel}
     </p>
    `;
  }

  render() {
    const products = this.data.map((item) => {
      const rate = this.getRate(item);
      const price = this.getPrice(item);

      const product = `
        <div data-product-id="${item.id}" class="products-list-product col-md-6 col-lg-4 mb-4">
          <div class="card">
            <div class="card-img-wrap">
                <img class="card-img-top" src="${item.imageUrl}" alt="Card image cap">
            </div>
            <div class="card-body">
                <h5 class="card-title">${item.title}</h5>
                ${rate}
                ${price}
                <button class="product-add-to-cart" data-button-role="add-to-cart">
                  Add to cart
                </button>
            </div>
          </div>
        </div>
        `;

      return product;
    }).join('');
    return products;
  }

  show() {
    
    return this.load().then(() => {
      const render = this.render();
      const template = `
      <div class="row justify-content-end">
        <div class="col-lg-9">
          <h3 class="section-title">Top Recommendations for You</h3>
          <div class="row homepage-cards">
          ${render}
          </div>
        </div>
      </div>
      `;

    
      return new Promise((resolve, reject) => {
        this.el.innerHTML = template;
        this.initListeners();
        resolve(template);
      });
    })
    
  }

  putProducts(id) {
    
    let productsLocalStorage = localStorage.getItem('cart-products');
    let productsInCart = JSON.parse(productsLocalStorage) || [];
    let hasProduct = productsInCart.some(product => product.id == id);

    if (!hasProduct) {
      const productToCart = this.data.find(product => product.id == id);

      productsInCart.push(productToCart);
      localStorage.setItem('cart-products', JSON.stringify(productsInCart));
    }
  
  }
}

window.ProductList = ProductList;