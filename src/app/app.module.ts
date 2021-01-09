import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemsService } from './services/items.service';
import { HomeComponent } from './containers/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { APP_CONFIG, AppConfig } from './app.config';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { CartService } from './services/cart.service';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from './store/store';
import { ToastrModule } from 'ngx-toastr';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CartComponent } from './containers/cart/cart.component';
import { FormsModule } from '@angular/forms';
import { DiscountsService } from './services/discouts.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    ToastrModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 20
    }),
    FormsModule
  ],
  providers: [ItemsService, CartService,
    DiscountsService,
    {
      provide: APP_CONFIG,
      useValue: AppConfig
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
