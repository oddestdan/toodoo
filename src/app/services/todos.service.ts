import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import ITodo from 'src/app/models/ITodo';
import { API_URL } from 'src/app/constants';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<ITodo[]>(API_URL);
  }

  create(todo: ITodo) {
    return this.http.post<ITodo>(`${API_URL}`, todo);
  }

  remove(id: string) {
    return this.http.delete(`${API_URL}/${id}`);
  }

  edit(id: string, todo: ITodo) {
    return this.http.put(`${API_URL}/${id}`, { ...todo });
  }

  toggle(id: string, completed: boolean) {
    return this.http.put<ITodo>(`${API_URL}/${id}`, { completed });
  }
}
