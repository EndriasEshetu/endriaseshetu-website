import {
  cart,
  removeFromCart,
  updateDeliveryOption,
  calculateCartQuantity,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {
  let cartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    cartSummaryHTML += `
    <div class="cart-item-container js-cart-item-container    js-cart-item-container-${
      matchingProduct.id
    }">
      <div class="cart-item-details-grid">
        <img
          class="product-image"
          src="${matchingProduct.image}"
        />

        <div class="cart-item-details">
          <div class="name-price">
            <div class="product-name">
              ${matchingProduct.name}
            </div>

            <div class="product-price">
            ${matchingProduct.getPrice()}
            </div>

            <div class="product-quantity-container">
              <select class="select-option js-select-option">
                <option value="0">${cartItem.quantity}</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </select>
            </div>
          </div>
      
          <div class="product-quantity">          
            <button class="update-quantity-link link-primary">
             Move to Wishlist
            </button>
          
            <button class="delete-quantity-link link-primary js-delete-link" data-product-id="${
              matchingProduct.id
            }">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  });

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.remove();

      updateCartQuantity();

      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });

  updateCartQuantity();

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    document.querySelector(
      ".js-return-to-home-link"
    ).innerHTML = `${cartQuantity} items`;
  }
}
