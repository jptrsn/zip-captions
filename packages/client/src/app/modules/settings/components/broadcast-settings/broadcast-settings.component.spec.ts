import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BroadcastSettingsComponent } from './broadcast-settings.component';

describe('BroadcastSettingsComponent', () => {
  let component: BroadcastSettingsComponent;
  let fixture: ComponentFixture<BroadcastSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BroadcastSettingsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BroadcastSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
