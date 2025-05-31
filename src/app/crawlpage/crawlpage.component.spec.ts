import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrawlpageComponent } from './crawlpage.component';

describe('CrawlpageComponent', () => {
  let component: CrawlpageComponent;
  let fixture: ComponentFixture<CrawlpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrawlpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrawlpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
