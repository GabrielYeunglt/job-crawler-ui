import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlButtonComponent } from './crawl-button.component';

describe('CrawlButtonComponent', () => {
  let component: CrawlButtonComponent;
  let fixture: ComponentFixture<CrawlButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrawlButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrawlButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
