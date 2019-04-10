import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

import { ComponentFactoryResolver } from "@angular/core/src/render3";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.scss"]
})
export class GroupComponent {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      skillsGroups: this.fb.array([
        {
          skills: this.fb.array([])
        }
      ])
    });
  }

  get skillsGroups() {
    return this.myForm.get("skillGroups") as FormArray;
  }

  get skills() {
    return this.myForm.get("skills") as FormArray;
  }

  addSkillsArray() {
    const skillArray = this.fb.control({
      skills: []
    });

    this.skillsGroups.push(skillArray);
  }

  addSkills() {
    const skill = this.fb.group({
      title: [],
      years: []
    });

    this.skills.push(skill);
  }

  deleteSkillsArray(i) {
    this.skillsGroups.removeAt(i);
  }

  deleteSkills(i) {
    this.skills.removeAt(i);
  }
}
