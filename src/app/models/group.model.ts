import { Skill } from "./skills.model";

export interface Group {
  title?: string;
  skills: Skill[];
}
