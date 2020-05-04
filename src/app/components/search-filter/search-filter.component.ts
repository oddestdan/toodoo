import { Component, ElementRef, ViewChild } from '@angular/core';
import { TodosStoreService } from 'src/app/services/todos-store.service';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
})
export class SearchFilterComponent {
  get query(): string {
    return this.todosStore.searchQuery;
  }
  set query(value: string) {
    this.todosStore.searchQuery = value;
  }
  @ViewChild('inputEl') private inputEl: ElementRef;

  constructor(private todosStore: TodosStoreService) {}

  blurInput(): void {
    setTimeout(() => this.inputEl.nativeElement.blur());
  }

  reset(): void {
    this.query = '';
    this.blurInput();
  }
}
