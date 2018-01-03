import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankStateComponent } from './blank-state.component';

describe('BlankStateComponent', () => {
  let component: BlankStateComponent;
  let fixture: ComponentFixture<BlankStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlankStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlankStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
