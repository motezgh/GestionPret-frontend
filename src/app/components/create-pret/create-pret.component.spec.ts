import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePretComponent } from './create-pret.component';

describe('CreatePretComponent', () => {
  let component: CreatePretComponent;
  let fixture: ComponentFixture<CreatePretComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePretComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePretComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
