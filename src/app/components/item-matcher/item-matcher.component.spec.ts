import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemMatcherComponent } from './item-matcher.component';

describe('ItemMatcherComponent', () => {
  let component: ItemMatcherComponent;
  let fixture: ComponentFixture<ItemMatcherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemMatcherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemMatcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
