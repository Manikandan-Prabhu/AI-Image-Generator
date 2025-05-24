import { Component, OnInit } from '@angular/core';
import {
  GenerateImagePending,
  GenerateImageSuccess,
} from 'src/app/models/generate-image.model';
import { GenerateImageService } from 'src/app/services/generate-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-image-generator',
  templateUrl: './image-generator.component.html',
  styleUrls: ['./image-generator.component.scss'],
})
export class ImageGeneratorComponent implements OnInit {
  /**
   * User's text input for image generation
   * @type {string}
   */
  prompt: string = '';
  /**
   * Loading state indicator for UI feedback
   * @type {boolean}
   */
  loading: boolean = false;
  /**
   * Error message to display to user
   * @type {string}
   */
  error: string = '';
  /**
   * Unique ID for tracking image generation request
   * @type {string}
   */
  generatedId!: string;
  /**
   * Response object containing image data or generation status
   * @type {GenerateImagePending | GenerateImageSuccess}
   */
  generatedImage!: GenerateImageSuccess | GenerateImagePending;
  /**
   * Authentication token for API requests
   * @type {string}
   */
  token!: string;

  constructor(private generateService: GenerateImageService) {}

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');

    if (token) {
      localStorage.setItem('token', token);
      window.history.replaceState({}, document.title, '/'); // clean URL
    }

    this.token = localStorage.getItem('token') || '';
  }

  /**
   * Redirects user to Google OAuth authentication endpoint
   */
  loginWithGoogle() {
    window.location.href = `${environment.apiUrl}/auth/google`;
  }

  /**
   * Generates an AI image based on user prompt
   */
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

  /**
   * Checks the current status of image generation process
   */
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

  /**
   * Handles API errors by showing user-friendly message
   */
  handleErrorMsgs() {
    this.error = 'Something went wrong. Please try again later!!';
    this.loading = false;
    this.generatedImage = null!;
  }
}
