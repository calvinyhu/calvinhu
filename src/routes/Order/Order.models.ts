import { History } from 'history';

export interface OrderProps {
  history: History;
}

export interface ProductItem {
  name: string;
  price: number;
}

export interface CartItem {
  [key: string]: ProductItem;
}
