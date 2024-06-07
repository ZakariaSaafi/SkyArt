import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesSearchPageComponent } from './categories-search-page.component';

describe('CategoriesSearchPageComponent', () => {
  let component: CategoriesSearchPageComponent;
  let fixture: ComponentFixture<CategoriesSearchPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesSearchPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesSearchPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
