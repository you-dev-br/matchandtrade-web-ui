import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMatcherOfferComponent } from './item-matcher-offer.component';

describe('ItemMatcherOfferComponent', () => {
  let component: ItemMatcherOfferComponent;
  let fixture: ComponentFixture<ItemMatcherOfferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMatcherOfferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMatcherOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
