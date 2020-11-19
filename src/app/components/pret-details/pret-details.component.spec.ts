import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PretDetailsComponent } from './pret-details.component';

describe('PretDetailsComponent', () => {
  let component: PretDetailsComponent;
  let fixture: ComponentFixture<PretDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PretDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PretDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
