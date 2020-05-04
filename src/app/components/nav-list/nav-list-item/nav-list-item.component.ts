import { Component, OnInit, Input } from '@angular/core';
import { TodosStoreService } from 'src/app/services/todos-store.service';

@Component({
  selector: 'app-nav-list-item',
  templateUrl: './nav-list-item.component.html',
  styleUrls: ['./nav-list-item.component.scss'],
})
export class NavListItemComponent implements OnInit {
  @Input() title: string;
  @Input() icon: string;
  @Input() filter: string;
  @Input() selected: boolean;

  constructor(private todosStore: TodosStoreService) {}

  ngOnInit(): void {}

  filterBy(value: string): void {
    this.todosStore.filter = value;
  }
}
