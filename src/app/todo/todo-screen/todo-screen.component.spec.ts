import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoScreenComponent } from './todo-screen.component';

describe('TodoScreenComponent', () => {
  let component: TodoScreenComponent;
  let fixture: ComponentFixture<TodoScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
