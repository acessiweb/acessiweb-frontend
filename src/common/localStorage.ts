export function getCart() {
  return localStorage.getItem("acessibiweb-cart");
}

export function setCart(cart: {
  name: string;
  desc: string;
  guidelines: { id: number; name: string }[];
}) {
  localStorage.setItem("acessibiweb-cart", JSON.stringify(cart));
}
