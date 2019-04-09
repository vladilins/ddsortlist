import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  myForm: FormGroup;
  closeResult: string;

  ngOnInit() {}

  data = {
    skillsGroup: [
      {
        skills: [
          {
            title: "",
            years: null
          }
        ]
      }
    ]
  };

  constructor(private modalService: NgbModal, private fb: FormBuilder) {
    this.myForm = this.fb.group({
      skillsGroups: this.fb.array([])
    });

    this.setSkillsGroups();
  }

  addSkillsGroup() {
    let control = <FormArray>this.myForm.controls.skillsGroups;
    control.push(
      this.fb.group({
        skills: this.fb.array([])
      })
    );
  }

  addSkillsArray(control) {
    control.push(
      this.fb.group({
        title: [""],
        years: [null]
      })
    );
  }

  setSkillsGroups() {
    let control = <FormArray>this.myForm.controls.skillsGroup;
    this.data.skillsGroup.forEach(x => {
      control.push(
        this.fb.group({
          skills: this.setSkillsArray(x)
        })
      );
    });
  }

  setSkillsArray(x: { skills: any }) {
    let arr = new FormArray([]);
    x.skills.forEach((y: { title: string; years: number }) => {
      arr.push(
        this.fb.group({
          title: y.title,
          years: y.years
        })
      );
    });
    return arr;
  }

  // Drag and Drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  // drop(event: CdkDragDrop<any[]>) {
  //   moveItemInArray(
  //     this.skills,
  //     // event.container.data,
  //     event.previousIndex,
  //     event.currentIndex
  //   );

  //   // Add to local storage
  //   localStorage.setItem("skills", JSON.stringify(this.skills));
  //   // this.skills.splice(event.previousIndex, event.currentIndex);
  //   console.log(event);
  // }

  // Hide-open form
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
