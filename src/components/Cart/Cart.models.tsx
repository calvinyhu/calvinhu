export interface CartProps {
  confirmRemoveItem?: boolean;
}

export type CartHandler = () => void;

export interface CartHandlers {
  [key: string]: CartHandler;
}
