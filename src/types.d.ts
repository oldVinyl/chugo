export interface PaymentSummary {
  subtotalPes: number;
  taxPes: number;
  serviceFeePes: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  pricePes: number;
  discountPerc?: number;
  image?: string;
  isActive?: boolean;
  quantityAvailiable?: number;
  promoQuantity?: number;
  promoEndsAt?: number;
  features?: string[];
  previewImage?: string;
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  orderId: string;
  name: string;
  contact?: string;
  time: Date | string;
  menu: OrderItem[];
  image?: string;
  modeOfPayment: "cash" | "card";
  notes?: string;
  paymentSummary: PaymentSummary;
}

export interface Transaction {
  id: string;
  amount: number;
  taxPerc: number;
  expensesPes: number;
  ordersPes: number;
  modeOfPayment: "card" | "credit";
}