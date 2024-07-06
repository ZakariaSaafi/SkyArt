import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewEventPageComponent } from './add-new-event-page.component';

describe('AddNewEventPageComponent', () => {
  let component: AddNewEventPageComponent;
  let fixture: ComponentFixture<AddNewEventPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewEventPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewEventPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
