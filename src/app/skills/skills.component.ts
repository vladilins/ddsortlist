import { Component, OnInit } from "@angular/core";
import { CdkDragDrop, moveItemInArray } from "@angular/cdk/drag-drop";
import { SkillsService } from "../services/skills.service";
import { Skill } from "../models/skills.model";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { FormGroup } from "@angular/forms";
import { Group } from "../models/group.model";

@Component({
  selector: "app-skills",
  templateUrl: "./skills.component.html",
  styleUrls: ["./skills.component.scss"]
})
export class SkillsComponent implements OnInit {
  groups: Group[] = [];
  skills: Skill[];
  skill: Skill;

  closeResult: string;
  formJoin: FormGroup;

  loaded: boolean = false;
  constructor(
    private skillsService: SkillsService,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.skillsService.getSkills().subscribe(skills => {
      this.skills = skills;
      this.loaded = true;
    });
    this.skillsService.getGroups().subscribe(groups => {
      this.groups = groups;
      this.loaded = true;
    });
    this.formJoin = new FormGroup({
      // form1: this.groups,
      // form2: this.skills
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(
      this.skills,
      // event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    // Add to local storage
    localStorage.setItem("skills", JSON.stringify(this.skills));
    // this.skills.splice(event.previousIndex, event.currentIndex);
    console.log(event);
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        reason => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return "by pressing ESC";
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return "by clicking on a backdrop";
    } else {
      return `with: ${reason}`;
    }
  }
}
