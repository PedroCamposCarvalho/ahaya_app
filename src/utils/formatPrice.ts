export default (price: number): string =>
  `R$ ${String(price).padStart(2, '0')},00`;
