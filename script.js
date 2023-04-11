
/////// Decelaration and displaying of products

const products = [
        { name: "Nike Black Snicker", price: 500, image: "./assets/images/nike-black-snicker.jpg", inCart: 0 },
        { name: "Forever Black n White", price: 600, image: "assets/images/nike-forever-black-white-jade_Basketball_Shoes_CQ9327-002.jpg", inCart: 0 },
        { name: "Nike Lebron", price: 700, image: "assets/images/nike-lebron-cannon-9-0.jpg", inCart: 0 },
        { name: "Nike White Snicker", price: 800, image: "assets/images/nike-white-sneaker.jpg", inCart: 0 }
      ];

      
       const productList = document.getElementById("items");

      for (let i = 0; i < products.length; i++) {
        let product = products[i];
        let li = document.createElement("div");
        let img = document.createElement("img");
        let button = document.createElement("button");
        button.classList.add("add-to-cart-button" + (i+1) );
        button.classList.add("cart-button");
        button.innerHTML = "Add to Cart"
        img.classList.add("img");
        let name = document.createElement("p");
        name.classList.add("name-class");
        img.src = product.image;
        img.alt = product.name;
        li.appendChild(img);
        name.innerText = `${product.name} - $${product.price}`;
        li.appendChild(name);
        li.appendChild(button);
        productList.appendChild(li);
        li.classList.add("product-div");
      }



//////////// Setting up the cart

let cart = document.querySelectorAll(".cart-button");


for (let i = 0; i < cart.length; i++) {

  cart[i].addEventListener('click',()=>{
    cartItems(products[i]);
    totalCost(products[i]);
    
  })
  
}

function cartItems(product){
  
 
  let productCount = localStorage.getItem("items");
  productCount = Number(productCount);
  if (productCount) {
    localStorage.setItem("items", productCount + 1);
    document.querySelector(".cart-icon span").textContent = productCount + 1;
  } else {
    localStorage.setItem("items", 1);
    document.querySelector(".cart-icon span").textContent = 1;
  }
  setItems(product);
}
function setItems(product){
  let cartItems = localStorage.getItem('productInCart');
  cartItems = JSON.parse(cartItems);
  // console.log("My cart Items are", cartItems);
  if (cartItems !== null) {
    if(cartItems[product.name] == undefined){
      cartItems = {
        ...cartItems,
        [product.name]:product
      }
    }
    cartItems[product.name].inCart += 1;

  } else {
      product.inCart = 1;
      cartItems = {
      [product.name]:product
  }

};
localStorage.setItem("productInCart", JSON.stringify(cartItems));
}
onLoadCartItems();
function onLoadCartItems(){
let productCount = localStorage.getItem("items");
if (productCount){
  document.querySelector(".cart-icon span").textContent = productCount;
}
}

function totalCost(product){
//console.log("The product price is", product.price);
let cartCost = localStorage.getItem("totalCost");


if (cartCost !== null) {
  cartCost = Number(cartCost);
  localStorage.setItem("totalCost", cartCost + product.price);
} else {
  localStorage.setItem("totalCost", product.price);
  
}
}

