import { Injectable } from '@angular/core';
import { NEVER } from 'rxjs';

@Injectable()
export class HttpClientFake {
    get: jasmine.Spy = jasmine.createSpy('get').and.returnValue(NEVER);
    post: jasmine.Spy = jasmine.createSpy('post').and.returnValue(NEVER);
    put: jasmine.Spy = jasmine.createSpy('put').and.returnValue(NEVER);
    delete: jasmine.Spy = jasmine.createSpy('delete').and.returnValue(NEVER);
    patch: jasmine.Spy = jasmine.createSpy('patch').and.returnValue(NEVER);
}
