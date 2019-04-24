import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDragEnter
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-nested",
  templateUrl: "./nested.component.html",
  styleUrls: ["./nested.component.scss"]
})
export class NestedComponent implements OnInit {
  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      skillsGroup: this.fb.array([])
    });

    this.setSkillsGroup();
  }

  myForm: FormGroup;

  data = {
    skillsGroup: [
      {
        skillsArray: [
          {
            skill: ""
          }
        ]
      }
    ]
  };

  onSubmit() {
    alert(this.myForm.value);
  }

  addGroup() {
    let control = <FormArray>this.myForm.controls.skillsGroup;
    control.push(
      this.fb.group({
        skills: this.fb.array([])
      })
    );
  }

  deleteGroup(index) {
    let control = <FormArray>this.myForm.controls.skillsGroup;
    control.removeAt(index);
  }

  addSkillArray(control) {
    control.push(
      this.fb.group({
        skill: [""]
      })
    );
  }

  deleteSkill(control, index) {
    control.removeAt(index);
  }

  setSkillsGroup() {
    let control = <FormArray>this.myForm.controls.skillsGroup;
    this.data.skillsGroup.forEach(x => {
      control.push(
        this.fb.group({
          skillsArray: this.setSkills(x)
        })
      );
    });
  }

  setSkills(x) {
    let arr = new FormArray([]);
    x.skillsArray.forEach(y => {
      arr.push(
        this.fb.group({
          skill: y.skill
        })
      );
    });
    return arr;
  }
  ngOnInit() {}

  skillsGroup = [
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
        },
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
        },
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
        },
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
        },
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

  entered(event: CdkDragEnter) {
    moveItemInArray(event.container.data, event.item.data, event.container.data);
  }

  getConnectedList(): any[] {
    return this.skillsGroup.map(x => `${x.id}`);
  }

  dropGroup(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.skillsGroup, event.previousIndex, event.currentIndex);
  }
}
