import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { provideMockStore } from '@ngrx/store/testing';
import { CartComponent } from './containers/cart/cart.component';
import { HomeComponent } from './containers/home/home.component';


describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        FormsModule
      ],
      declarations: [
        AppComponent,
        ToolbarComponent,
        CartComponent,
        HomeComponent
      ],
      providers: [
        provideMockStore({}),
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
