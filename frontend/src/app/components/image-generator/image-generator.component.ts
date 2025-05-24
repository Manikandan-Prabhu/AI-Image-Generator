import { Component } from '@angular/core';
import {
  GenerateImagePending,
  GenerateImageSuccess,
} from 'src/app/models/generate-image.model';
import { GenerateImageService } from 'src/app/services/generate-image.service';

@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.scss'],
})
export class ImageGeneratorComponent {
  prompt: string = '';
  loading: boolean = false;
  error: string = '';
  generatedId!: string;
  generatedImage!: GenerateImageSuccess | GenerateImagePending;

  constructor(private generateService: GenerateImageService) {}

  onGenerate() {
    if (!prompt) return;
    this.loading = true;
    this.generateService.generateImage(this.prompt).subscribe({
      next: (res) => {
        // console.log(res);
        this.loading = false;
        this.error = null!;
        this.generatedId = res.generatedId;
        this.generatedImage = res;
      },
      error: (err) => {
        this.handleErrorMsgs();
      },
    });
  }

  checkImageStatus() {
    this.loading = true;
    this.generateService.checkImageStatus(this.generatedId).subscribe({
      next: (res) => {
        this.loading = false;
        this.error = null!;
        this.generatedImage = res;
      },
      error: (err) => {
        this.handleErrorMsgs();
      },
    });
  }

  handleErrorMsgs() {
    this.error = 'Something went wrong. Please try again later!!';
    this.loading = false;
    this.generatedImage = null!;
  }
}
