import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../../services/items.service';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { CartService } from '../../services/cart.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/store';
import * as cartActions from '../../store/cart/cart.action';
import { CartDetail } from '../../models/CartDetail';
import { selectCart } from '../../store/cart/cart.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  items$: Observable<Item[]>;
  cartDetails$: Observable<CartDetail[]>;


  constructor(private itemsService: ItemsService, private cartService: CartService, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(cartActions.getCart());

    this.items$ = this.itemsService.getItems();
    this.cartDetails$ = this.store.select(selectCart);
  }

  addItem(item: Item): void {
    this.store.dispatch(cartActions.addToCart({ item }));
  }

  emptyCart(){
    this.store.dispatch(cartActions.emptyCart());
  }
}
