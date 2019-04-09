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
  ngOnInit() {}

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.myForm = this.fb.group({
      group: this.fb.array([])
    });

    this.setCompanies();
  }

  data = {
    group: [
      {
        group_title: "",
        skills: [
          {
            skill: {
              id: "",
              years: null,
              title: ""
            }
          }
        ]
      }
    ]
  };

  closeResult: string;

  myForm: FormGroup;

  addNewTemplate() {
    let control = <FormArray>this.myForm.controls.group;
    control.push(
      this.fb.group({
        group_title: [""],
        skills: this.fb.array([])
      })
    );
  }

  addNewProperty(control) {
    control.push(
      this.fb.group({
        skill: [""]
      })
    );
  }

  setCompanies() {
    let control = <FormArray>this.myForm.controls.group;
    this.data.group.forEach(x => {
      control.push(
        this.fb.group({
          group_title: x.group_title,
          skills: this.setProperty(x)
        })
      );
    });
  }

  setProperty(x) {
    let arr = new FormArray([]);
    x.skills.forEach(y => {
      arr.push(
        this.fb.group({
          skill: y.skill
        })
      );
    });
    return arr;
  }

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
