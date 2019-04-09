import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-nested",
  templateUrl: "./nested.component.html",
  styleUrls: ["./nested.component.scss"]
})
export class NestedComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      name: [""],
      groups: this.fb.array([])
    });

    this.setGroups();
  }

  myForm: FormGroup;

  data = {
    groups: [
      {
        skills: [
          {
            skill: {
              years: null,
              title: ""
            }
          }
        ]
      }
    ]
  };

  onSubmit() {
    alert(this.myForm.value);
  }

  addNewGroup() {
    let control = <FormArray>this.myForm.controls.skills;
    control.push(
      this.fb.skills({
        skills: [""],
        skill: this.fb.array([])
      })
    );
  }

  deleteGroup(index) {
    let control = <FormArray>this.myForm.controls.groups;
    control.removeAt(index);
  }

  addNewSkill(control) {
    control.push(
      this.fb.group({
        skill: [""]
      })
    );
  }

  deleteSkill(control, index) {
    control.removeAt(index);
  }

  setGroups() {
    let control = <FormArray>this.myForm.controls.groups;
    this.data.groups.forEach(x => {
      control.push(
        this.fb.group({
          group: x.group,
          skills: this.setSkills(x)
        })
      );
    });
  }

  setSkills(x) {
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
  ngOnInit() {}

  groups = [
    {
      id: 1,
      title: "Group 1",
      items: [
        {
          name: "Item 1 - Group 1"
        },
        {
          name: "Item 2 - Group 1"
        },
        {
          name: "Item 3 - Group 1"
        },
        {
          name: "Item 4 - Group 1"
        }
      ]
    },
    {
      id: 2,
      title: "Group 2",
      items: [
        {
          name: "Item 1 - Group 2"
        },
        {
          name: "Item 2 - Group 2"
        },
        {
          name: "Item 3 - Group 2"
        },
        {
          name: "Item 4 - Group 2"
        }
      ]
    },
    {
      id: 3,
      title: "Group 3",
      items: [
        {
          name: "Item 1 - Group 3"
        },
        {
          name: "Item 2 - Group 3"
        },
        {
          name: "Item 3 - Group 3"
        },
        {
          name: "Item 4 - Group 3"
        }
      ]
    }
  ];

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
    return this.groups.map(x => `${x.id}`);
  }

  dropGroup(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.groups, event.previousIndex, event.currentIndex);
  }
}
