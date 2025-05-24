import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GenerateImageService {
  constructor(private http: HttpClient) {}

  /**
   * Sends image generation request to API with user prompt
   * @param prompt User's text input for image generation
   * @returns an observable which have the generated image/generated id
   */
  generateImage(prompt: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/generate-image`,
      {
        prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }

  /**
   * Checks the current status of image generation by ID
   * @param generatedId Unique ID for tracking image generation request
   * @returns an observable which have the generated image
   */
  checkImageStatus(generatedId: string) {
    return this.http.get<any>(
      `${environment.apiUrl}/image-status/${generatedId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
