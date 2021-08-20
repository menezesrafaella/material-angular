import { TestBed } from '@angular/core/testing';

import { QDemoNavigationService } from './q-demo-navigation.service';

describe('QDemoNavigationService', () => {
  let service: QDemoNavigationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QDemoNavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
