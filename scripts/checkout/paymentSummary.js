import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;

  cart.forEach((cartItem) => {
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
  });

  const paymentSummaryHTML = `  
    <button class="place-order-button button-primary js-place-order">
      Checkout
    </button>

    <div class="payment-summary-row">Subtotal:
      <span class="payment-summary-money">$${formatCurrency(productPriceCents)}
      </span>
    </div>
  `;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
