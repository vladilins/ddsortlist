import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"]
})
export class CityComponent implements OnInit {
  ngOnInit() {}
  data = {
    skillGroups: [
      {
        groupName: "",
        skillArr: [
          {
            skillName: "",
            years: null
          }
        ]
      }
    ]
  };

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [""],
      skillGroups: this.fb.array([])
    });

    this.setSkillGroups();
  }

  onSubmit() {
    alert(this.myForm.value);
  }

  addSkillGroup() {
    let control = <FormArray>this.myForm.controls.skillGroups;
    control.push(
      this.fb.group({
        groupName: [""],
        skillArr: this.fb.array([])
      })
    );
  }

  deleteSkillArrs(index) {
    let control = <FormArray>this.myForm.controls.skillGroups;
    control.removeAt(index);
  }

  addSkill(control) {
    control.push(
      this.fb.group({
        skillName: [""],
        years: []
      })
    );
  }

  deleteSkill(control, index) {
    control.removeAt(index);
  }

  setSkillGroups() {
    let control = <FormArray>this.myForm.controls.skillGroups;
    this.data.skillGroups.forEach(x => {
      control.push(
        this.fb.group({
          groupName: x.groupName,
          skillArr: this.setSkillArr(x)
        })
      );
    });
  }

  setSkillArr(x) {
    let arr = new FormArray([]);
    x.skillArr.forEach(y => {
      arr.push(
        this.fb.group({
          skillName: y.skillName,
          years: y.years
        })
      );
    });
    return arr;
  }

  // Drag and Drop
  dropItem(event: CdkDragDrop<string[]>) {
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

  getConnectedList(): any[] {
    return this.data.skillGroups.map(x => `${x.skillArr}`);
  }

  dropGroup(event: CdkDragDrop<string[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
  }
}
