import { CartHandler } from '../Cart/Cart.models';

export interface CartItemProps {
  handleRemoveItem: CartHandler;
  name: string;
  price: number;
}
