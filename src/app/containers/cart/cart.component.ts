import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartDetail } from 'src/app/models/CartDetail';
import { selectCart } from 'src/app/store/cart/cart.selectors';
import { AppState } from 'src/app/store/store';
import * as cartActions from '../../store/cart/cart.action';
import { DiscountsService } from '../../services/discouts.service';
import { Discount } from 'src/app/models/Discount';
import { CartService } from '../../services/cart.service';
import { CreateOrder } from 'src/app/models/CreateOrder';
import { OrderDetail } from '../../models/OrderDetail';
import { CartSummary } from '../../models/CartSummary';
import { OrderService } from 'src/app/services/order.service';
import { PaymentModeEnum } from '../../models/PaymentModeEnum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [ './cart.component.scss' ]
})
export class CartComponent implements OnInit {
  cartDetails: CartDetail[];
  discount: Discount;
  step: number = 1;
  cartSummary: CartSummary;
  orderId: number;
  paymentMode: PaymentModeEnum;
  paid: boolean = false;

  constructor(
    private store: Store<AppState>,
    private discountService: DiscountsService,
    private cartService: CartService,
    private orderService: OrderService,
    private toastrSevice: ToastrService
  ) {}

  ngOnInit() {
    this.store.dispatch(cartActions.getCart());
    this.store.select(selectCart).subscribe((dets) => {
      this.cartDetails = dets.map((d) => Object.assign(new CartDetail(), d));
    });
  }

  getDiscount(discountCode): void {
    this.discountService.getDiscount(discountCode).subscribe((d) => (this.discount = d),
    (e) => {
      if (e.status === 404){
        this.toastrSevice.warning('SCONTO NON TROVATO', '', {timeOut: 800})
      }
    });
  }

  calculateSummary(): void {
    this.cartService.calculateSummary(this.createOrder()).subscribe((x) => {
      this.cartSummary = x;
      this.step = 2;
    });
  }

  saveOrder(): void {
    this.orderService.createOrder(this.createOrder()).subscribe((x) => {
      this.orderId = x;
      this.step = 3;
      this.emptyCart();
    });
  }

  payOrder(): void {
    this.orderService.payOrder(this.orderId, { paymentMode: this.paymentMode }).subscribe((x) => {
      this.paid = true;
      this.toastrSevice.success("ORDINE PAGATO");
    });
  }

  private createOrder(): CreateOrder {
    let order = new CreateOrder();
    order.details = this.cartDetails.map((x) =>
      Object.assign(new OrderDetail(), { itemId: x.item.id, quantity: x.quantity })
    );
    if (this.discount) {
      order.appliedDiscountCode = this.discount.name;
    }
    return order;
  }

  emptyCart() {
    this.store.dispatch(cartActions.emptyCart());
  }
}
