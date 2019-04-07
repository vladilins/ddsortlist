import { Injectable } from "@angular/core";
import { Skill } from "../models/skills.model";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SkillsService {
  skills: Skill[] = [];

  constructor() {}

  getSkills(): Observable<Skill[]> {
    if (localStorage.getItem("skills") === null) {
      this.skills = [];
    } else {
      this.skills = JSON.parse(localStorage.getItem("skills"));
    }

    return of(this.skills);
  }

  addSkill(skill: Skill) {
    this.skills.unshift(skill);
    console.log(skill);

    // Add to local storage
    localStorage.setItem("skills", JSON.stringify(this.skills));
  }

  // getskill(id: string): Observable<skill> {
  //   this.skillDoc = this.afs.doc<skill>(`skills/${id}`);
  //   this.skill = this.skillDoc.snapshotChanges().map(action => {
  //     if(action.payload.exists === false) {
  //       return null;
  //     } else {
  //       const data = action.payload.data() as skill;
  //       data.id = action.payload.id;
  //       return data;
  //     }
  //   });

  //   return this.skill;
  // }

  updateskill(skill: Skill) {}

  deleteskill(skill: Skill) {}
}
