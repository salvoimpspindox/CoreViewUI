import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CartDetail } from 'src/app/models/CartDetail';
import { selectCart } from 'src/app/store/cart/cart.selectors';
import { AppState } from 'src/app/store/store';
import * as cartActions from '../../store/cart/cart.action';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  cartDetails$: Observable<CartDetail[]>;

  constructor( private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(cartActions.getCart());
    this.cartDetails$ = this.store.select(selectCart);
  }

}
