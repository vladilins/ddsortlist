import { Injectable } from "@angular/core";
import { Skill } from "../models/skills.model";
import { Observable, of } from "rxjs";
import { Group } from "../models/group.model";

@Injectable({
  providedIn: "root"
})
export class SkillsService {
  skills: Skill[] = [];
  groups: [
    {
      groupName: "";
      skillArr: [
        {
          skillName: "";
          years: null;
        }
      ];
    }
  ];

  constructor() {}

  getSkills(): Observable<Skill[]> {
    if (localStorage.getItem("skills") === null) {
      this.skills = [];
    } else {
      this.skills = JSON.parse(localStorage.getItem("skills"));
    }

    return of(this.skills);
  }
  getGroups(): Observable<Group[]> {
    if (localStorage.getItem("groups") === null) {
      this.groups = [];
    } else {
      this.groups = JSON.parse(localStorage.getItem("groups"));
    }

    return of(this.groups);
  }

  addSkill(skill: Skill) {
    this.skills.unshift(skill);
    console.log(skill);

    // Add to local storage
    localStorage.setItem("skills", JSON.stringify(this.skills));
  }
  addGroup(group) {
    this.groups.unshift(group);
    console.log(group);

    // let endGroup = this.groups.skills.push(this.skills);
    // Add to local storage
    localStorage.setItem("groups", JSON.stringify(this.groups));
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
