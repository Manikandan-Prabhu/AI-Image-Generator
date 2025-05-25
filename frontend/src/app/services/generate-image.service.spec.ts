import { TestBed } from '@angular/core/testing';

import { GenerateImageService } from './generate-image.service';
import { environment } from 'src/environments/environment';

describe('GenerateImageService', () => {
  let service: GenerateImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [environment],
    });
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
