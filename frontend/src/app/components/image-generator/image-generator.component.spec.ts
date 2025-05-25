import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGeneratorComponent } from './image-generator.component';
import { GenerateImageService } from 'src/app/services/generate-image.service';
import { environment } from 'src/environments/environment';

class MockGenerateImageService {}

describe('ImageGeneratorComponent', () => {
  let component: ImageGeneratorComponent;
  let fixture: ComponentFixture<ImageGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageGeneratorComponent],
      imports: [environment],
      providers: [
        { provide: GenerateImageService, useClass: MockGenerateImageService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
