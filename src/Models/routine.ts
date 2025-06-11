import { Exercise } from "./exercise";

export interface Routine {
  routine_id?: number;
  name: string;
  description: string;
  muscular_group: string;
  series: number;
  exercises: Exercise[];
}