import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAtividadeComponent } from './add-atividade.component';

describe('AddAtividadeComponent', () => {
  let component: AddAtividadeComponent;
  let fixture: ComponentFixture<AddAtividadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAtividadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAtividadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
