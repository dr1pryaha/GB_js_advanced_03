class ProductList {
  constructor(container = ".products") {
    this.container = container;
    this.goods = [];
    this._fetchProducts(); //рекомендация, чтобы метод был вызван в текущем классе
    this.render(); //вывод товаров на страницу
  }
  _fetchProducts() {
    this.goods = [
      { id: 1, title: "Notebook", price: 2000, link: "img/notebook.jpg" },
      { id: 2, title: "Mouse", price: 20, link: "img/mouse.jpg" },
      { id: 3, title: "Keyboard", price: 200, link: "img/keyboard.jpg" },
      { id: 4, title: "Gamepad", price: 50, link: "img/gamepad.jpg" },
      { id: 5, title: "Headphones", price: 500, link: "img/headphones.jpg" },
      { id: 6, title: "Monitor", price: 1500, link: "img/monitor.jpg" },
      { id: 7, title: "Gamepad", price: 50, link: "img/gamepad.jpg" },
      { id: 8, title: "Notebook", price: 2000, link: "img/notebook.jpg" },
    ];
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
  constructor(product) {
    this.title = product.title;
    this.id = product.id;
    this.price = product.price;
    this.link = product.link;
  }
  render() {
    return `<div class="products-item">
           <img class="products-image" src="${this.link}" alt="product">
           <h3 class="products-title">${this.title}</h3>
           <p class="products-price">${this.price}</p>
           <button class="products-buy-btn">Купить</button>
       </div>`;
  }
}

let list = new ProductList();

class BasketList extends ProductList {
  // constructor(container = ".cart-items") {
  //   this.container = container;
  //   this.goods = [];
  //   this._fetchProducts(); //рекомендация, чтобы метод был вызван в текущем классе
  //   this.render(); //вывод товаров на страницу
  // }

  _fetchProducts() {
    this.goods = [
      { id: 1, title: "Notebook", price: 2000, link: "img/notebook.jpg" },
      { id: 2, title: "Mouse", price: 20, link: "img/mouse.jpg" },
      { id: 3, title: "Keyboard", price: 200, link: "img/keyboard.jpg" },
    ];
  }

  render() {
    const block = document.querySelector(".cart-items");
    for (let product of this.goods) {
      const item = new BasketItem(product);
      block.insertAdjacentHTML("afterbegin", item.render());
      //              block.innerHTML += item.render();
    }
  }

  getTotalValue() {
    let res = this.goods.reduce((acc, item) => acc + item.price, 0);
    return res;
  }

  addGood() {}
  removeGood() {}
  changeGood() {}
}

class BasketItem extends ProductItem {
  // constructor(product) {
  //   this.title = product.title;
  //   this.id = product.id;
  //   this.price = product.price;
  //   this.link = product.link;
  //   //this.count();
  // }
  render() {
    return `<li class="cart-item">
           <img class="cart-image" src="${this.link}" alt="product">
           <h3 class="cart-title">${this.title}</h3>
           <p class="cart-price">${this.price}</p>
           
       </li>`;
  }
}

let listBasket = new BasketList();
let totalValue = +listBasket.getTotalValue();

document.querySelector(".btn-cart").addEventListener("click", event => {
  if (event.currentTarget.classList.contains("btn-cart")) {
    document.querySelector(".cart-items").classList.toggle("hidden");
  }
});

document.querySelector(".basketTotalValue").textContent = totalValue;
