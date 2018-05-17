import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { MyAccountComponent } from './my-account.component';
import { UserService } from '../../services/user.service';
import { User } from '../../classes/pojo/user';
import { LoadingComponent } from '../loading/loading.component';
import { PageTitleComponent } from '../page-title/page-title.component';
import { MessageComponent } from '../message/message.component';
import { NavigationService } from '../../services/navigation.service';
import { NavigationServiceMock } from '../../../test/router-mock';

describe('my-account.component', () => {
  let component: MyAccountComponent;
  let fixture: ComponentFixture<MyAccountComponent>;

  class UserServiceMock {
    getAuthenticatedUser(): Promise<User> {
      return new Promise<User>((resolve, reject) => {
        const result = new User();
        result.userId = 1;
        result.name = 'testing';
        result.email = 'testing@test.com';
        resolve(result);
      });
    }
    save(user: User): Promise<User> {
      return new Promise<User>((resolve, reject) => {
        resolve(user);
      });
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ MyAccountComponent, LoadingComponent,  MessageComponent, PageTitleComponent ]
    })
    .overrideComponent(MyAccountComponent, {
      set: {
        providers: [
          {provide: UserService, useClass: UserServiceMock},
          {provide: NavigationService, useClass: NavigationServiceMock}
        ]
      }
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should display user information', () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      expect(component.user.userId).toBe(1);
      expect(component.user.name).toBe('testing');
      expect(component.user.email).toBe('testing@test.com');
    });
  });

  it('should update user name', () => {
    component.ngOnInit();
    fixture.whenStable().then(() => {
      component.user.name = 'testing-updated';
      component.onUpdateUser();
      expect(component.user.userId).toBe(1);
      expect(component.user.name).toBe('testing-updated');
      expect(component.user.email).toBe('testing@test.com');
    });
  });

});
