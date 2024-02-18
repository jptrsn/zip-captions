import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserSavedSettingsComponent } from './user-saved-settings.component';

describe('UserSavedSettingsComponent', () => {
  let component: UserSavedSettingsComponent;
  let fixture: ComponentFixture<UserSavedSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserSavedSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserSavedSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
