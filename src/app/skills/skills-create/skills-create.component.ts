import { Component, OnInit } from "@angular/core";
import { Skill } from "src/app/models/skills.model";
import { SkillsService } from "src/app/services/skills.service";

@Component({
  selector: "app-skills-create",
  templateUrl: "./skills-create.component.html",
  styleUrls: ["./skills-create.component.scss"]
})
export class SkillsCreateComponent implements OnInit {
  id: string;
  years: number;
  title: string;
  constructor(private skillsService: SkillsService) {}

  ngOnInit() {}

  onSubmit() {
    const newSkill = {
      id: this.generateId(),
      title: this.title,
      years: this.years
    };
    // Add new client
    this.skillsService.addSkill(newSkill);
  }

  generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
