import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordMainComponent } from './keyword-main.component';

describe('KeywordMainComponent', () => {
  let component: KeywordMainComponent;
  let fixture: ComponentFixture<KeywordMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeywordMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KeywordMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
