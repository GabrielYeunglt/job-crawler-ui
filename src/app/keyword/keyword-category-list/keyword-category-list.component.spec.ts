import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordCategoryListComponent } from './keyword-category-list.component';

describe('KeywordCategoryListComponent', () => {
  let component: KeywordCategoryListComponent;
  let fixture: ComponentFixture<KeywordCategoryListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordCategoryListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
