import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APP_CONFIG, IAppConfig } from '../app.config';
import { Observable } from 'rxjs';
import { Item } from '../models/Item';

@Injectable()
export class ItemsService {
  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: IAppConfig) {}

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.config.apiEndpoint}items`);
  }
}
