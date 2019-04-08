import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-form",
  templateUrl: "./form.component.html",
  styleUrls: ["./form.component.scss"]
})
export class FormComponent implements OnInit {
  ngOnInit() {}

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

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      group: this.fb.array([])
    });

    this.setCompanies();
  }

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
}
