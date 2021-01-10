import { inject, TestBed } from '@angular/core/testing';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { CartService } from './cart.service';
import { CreateOrder } from '../models/CreateOrder';
import { HttpClientFake } from '../test/http-client-fake.service';
import { HttpClient } from '@angular/common/http';

describe('CartService', () => {
    let testSubject: CartService;
    let httpClient: HttpClientFake;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                CartService,
                { provide: APP_CONFIG, useValue: <IAppConfig>{ apiEndpoint: 'url/'} },
                { provide: HttpClient, useClass: HttpClientFake }
            ]
        });

        testSubject = TestBed.get(CartService);
        httpClient = TestBed.get(HttpClient);
    });

    it('should be created', inject([CartService], (service: CartService) => {
        expect(service).toBeTruthy();
    }));

    describe('calculateSummary', () => {
        it('should call calculateSummary API', () => {
           const createOrder = new CreateOrder();
            testSubject.calculateSummary(createOrder);

            expect(httpClient.post).toHaveBeenCalled();
            expect(httpClient.post).toHaveBeenCalledWith(`url/cart/calculateSummary`, createOrder);
        });
    });
});
