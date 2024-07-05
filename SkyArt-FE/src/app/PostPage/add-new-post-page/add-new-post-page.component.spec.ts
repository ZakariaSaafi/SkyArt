import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewPostPageComponent } from './add-new-post-page.component';

describe('AddNewPostPageComponent', () => {
  let component: AddNewPostPageComponent;
  let fixture: ComponentFixture<AddNewPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewPostPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
