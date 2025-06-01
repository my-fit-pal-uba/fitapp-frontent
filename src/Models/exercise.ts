export interface Exercise {
  exercise_id?: number;
  name: string;
  description: string;
  muscular_group: string;
  type: string;
  place: string;
  photo_guide?: string;
  video_guide?: string;
}