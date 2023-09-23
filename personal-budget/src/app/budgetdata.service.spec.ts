import { TestBed } from '@angular/core/testing';

import { BudgetdataService } from './budgetdata.service';

describe('BudgetdataService', () => {
  let service: BudgetdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BudgetdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
