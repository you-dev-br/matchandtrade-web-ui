import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErratumComponent } from './erratum.component';

describe('ErratumComponent', () => {
  let component: ErratumComponent;
  let fixture: ComponentFixture<ErratumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErratumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErratumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
