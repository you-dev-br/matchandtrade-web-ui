import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconicCardComponent } from './iconic-card.component';

describe('IconicCardComponent', () => {
  let component: IconicCardComponent;
  let fixture: ComponentFixture<IconicCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconicCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconicCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
