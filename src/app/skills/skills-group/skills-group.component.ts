import { Component, OnInit } from "@angular/core";
import { Group } from "src/app/models/group.model";
import { SkillsService } from "src/app/services/skills.service";
import { Skill } from "src/app/models/skills.model";

@Component({
  selector: "app-skills-group",
  templateUrl: "./skills-group.component.html",
  styleUrls: ["./skills-group.component.scss"]
})
export class SkillsGroupComponent implements OnInit {
  title: string;
  skills: Skill[];
  constructor(private skillsService: SkillsService) {}

  ngOnInit() {}

  onSubmit() {
    const newGroup = {
      title: this.title,
      skills: this.skills
    };
    // Add new client
    this.skillsService.addGroup(newGroup);
  }
}
