import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';

describe('loading.component', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('when not loading, then it should not display the loading component', () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('.app-loading')).toBeNull();
    });
  });

  it('when loading, then it should display the loading component', () => {
    component.loading = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(fixture.nativeElement.querySelector('.app-loading')).toBeTruthy();
      expect(fixture.nativeElement.querySelector('.app-loading').offsetWidth).toBeGreaterThan(5);
    });
  });

});
