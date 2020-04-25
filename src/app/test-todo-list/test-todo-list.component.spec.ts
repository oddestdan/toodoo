import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTodoListComponent } from './test-todo-list.component';

describe('TestTodoListComponent', () => {
  let component: TestTodoListComponent;
  let fixture: ComponentFixture<TestTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTodoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
