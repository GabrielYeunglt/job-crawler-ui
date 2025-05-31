import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordCategoryFormComponent } from './keyword-category-form.component';

describe('KeywordCategoryFormComponent', () => {
  let component: KeywordCategoryFormComponent;
  let fixture: ComponentFixture<KeywordCategoryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordCategoryFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
