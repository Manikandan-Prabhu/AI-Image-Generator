import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GenerateImageService {
  constructor(private http: HttpClient) {}

  generateImage(prompt: string) {
    return this.http.post<any>(
      'http://localhost:3000/generate-image',
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

  checkImageStatus(generatedId: string) {
    return this.http.get<any>(
      `http://localhost:3000/image-status/${generatedId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
  }
}
