const API =
  "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    // this._fetchProducts(); //рекомендация, чтобы метод был вызван в текущем классе
    this.getProducts = this._getProducts().then(data => {
      //data - объект js
      this.goods = data;
      //                 console.log(data);
      this.render();
    });
    // this.render(); //вывод товаров на страницу
  }

  _getProducts() {
    return fetch(`${API}/catalogData.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const block = document.querySelector(this.container);
    for (let product of this.goods) {
      const item = new ProductItem(product);
      block.insertAdjacentHTML("beforeend", item.render());
      //              block.innerHTML += item.render();
    }
  }
}

class ProductItem {
  constructor(product, img = "https://via.placeholder.com/200x150") {
    this.title = product.product_name;
    this.id = product.id;
    this.price = product.price;
    this.link = img;
  }
  render() {
    return `<div class="products-item data-id="${this.id}">
           <img class="products-image" src="${this.link}" alt="product">
           <h3 class="products-title">${this.title}</h3>
           <p class="products-price">${this.price}</p>
           <button class="products-buy-btn">Купить</button>
       </div>`;
  }
}

let list = new ProductList();

class BasketList extends ProductList {
  constructor(container = ".cart-items") {
    super((container = ".cart-items"));
    this.getProducts.then(() => {
      this.getTotalValue = this.getTotalValue();
      document.querySelector(".basketTotalValue").textContent =
        this.getTotalValue;
    });
  }

  _getProducts() {
    return fetch(`${API}/getBasket.json`)
      .then(result => result.json())
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const block = document.querySelector(".cart-items");
    for (let product of this.goods.contents) {
      const item = new BasketItem(product);
      block.insertAdjacentHTML("afterbegin", item.render());
      //              block.innerHTML += item.render();
    }
  }

  getTotalValue() {
    let res = this.goods.contents.reduce((acc, item) => acc + item.price, 0);
    return res;
  }

  addGood() {}
  removeGood() {}
  changeGood() {}
}

class BasketItem extends ProductItem {
  render() {
    return `<li class="cart-item data-id="${this.id}">
           <img class="cart-image" src="${this.link}" alt="product">
           <h3 class="cart-title">${this.title}</h3>
           <p class="cart-price">${this.price}</p>
           
       </li>`;
  }
}

let listBasket = new BasketList();
console.log(listBasket);
console.log(list);
listBasket._getProducts();

document.querySelector(".btn-cart").addEventListener("click", event => {
  if (event.currentTarget.classList.contains("btn-cart")) {
    document.querySelector(".cart-items").classList.toggle("hidden");
  }
});
