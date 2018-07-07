import { TestBed, inject } from '@angular/core/testing';

import { ExamResultsService } from './exam-results.service';

describe('ExamResultsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExamResultsService]
    });
  });

  it('should be created', inject([ExamResultsService], (service: ExamResultsService) => {
    expect(service).toBeTruthy();
  }));
});
