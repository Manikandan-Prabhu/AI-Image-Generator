export interface GenerateImageSuccess {
  status: string;
  image: string;
  queuePosition?: number;
}

export interface GenerateImagePending {
  status: string;
  message: string;
  generatedId: string;
  queuePosition: number;
  waitTime: number;
  image?: string;
}
