import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobdetailpageComponent } from './jobdetailpage.component';

describe('JobdetailpageComponent', () => {
  let component: JobdetailpageComponent;
  let fixture: ComponentFixture<JobdetailpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobdetailpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobdetailpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
