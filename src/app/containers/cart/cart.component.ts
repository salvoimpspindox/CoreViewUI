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
import { Cart } from 'src/app/models/Cart';
import { OrderDetail } from '../../models/OrderDetail';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [ './cart.component.scss' ]
})
export class CartComponent implements OnInit {
  cartDetails: CartDetail[];
  discount: Discount;

  constructor(private store: Store<AppState>, private discountService: DiscountsService,
    private cartSrevice: CartService) {}

  ngOnInit() {
    this.store.dispatch(cartActions.getCart());
    this.store.select(selectCart).subscribe((dets) => {
      this.cartDetails = dets.map((d) => Object.assign(new CartDetail(), d));
    });
  }

  getDiscount(discountCode): void {
    this.discountService.getDiscount(discountCode).subscribe((d) => (this.discount = d));
  }

  calculateSummary(): void {
    let cart = new Cart();
    cart.details = this.cartDetails.map(x => Object.assign(new OrderDetail(), {itemId: x.item.id, quantity : x.quantity}));
    if (this.discount){
      cart.appliedDiscountCode = this.discount.name;
    }
    this.cartSrevice.calculateSummary(cart).subscribe(x => console.log(x));
  }
}
