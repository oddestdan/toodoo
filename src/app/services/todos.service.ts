import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import ITodo from 'src/app/models/ITodo';
import { API_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Array<ITodo>> {
    return this.http.get<Array<ITodo>>(API_URL);
  }
}
