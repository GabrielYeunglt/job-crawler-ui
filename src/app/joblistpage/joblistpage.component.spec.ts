import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoblistpageComponent } from './joblistpage.component';

describe('JoblistpageComponent', () => {
  let component: JoblistpageComponent;
  let fixture: ComponentFixture<JoblistpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoblistpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoblistpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
