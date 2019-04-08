import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { SkillsService } from "../services/skills.service";
import { Skill } from "../models/skills.model";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"]
})
export class SkillsComponent implements OnInit {
  skills: Skill[];
  skill: Skill;

  loaded: boolean = false;
  constructor(private skillsService: SkillsService) {}

  ngOnInit() {
    this.skillsService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.loaded = true;
    });
  }

  timePeriods = [
    "Bronze age",
    "Iron age",
    "Middle ages",
    "Early modern period",
    "Long nineteenth century"
  ];

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.skills,
      // event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    // this.skills.splice(event.previousIndex, event.currentIndex);
    console.log(event);
  }
}
