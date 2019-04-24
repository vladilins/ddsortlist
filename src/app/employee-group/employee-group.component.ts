import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: "app-employee-group",
  templateUrl: "./employee-group.component.html",
  styleUrls: ["./employee-group.component.scss"]
})
export class EmployeeGroupComponent implements OnInit {
  ngOnInit() {}
  data = {
    skillGroups: [
      {
        groupName: "",
        id: this.generateId(),
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

  closeResult: string;

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.myForm = this.fb.group({
      skillGroups: this.fb.array([])
    });

    this.setSkillGroups();
  }

  generateId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
    console.log(this.data.skillGroups[0].skillArr);
  }

  addSkillGroup() {
    let control = <FormArray>this.myForm.controls.skillGroups;
    control.push(
      this.fb.group({
        id: [""],
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
          id: x.id,
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

  // get getSkillArr() {
  //   return this.myForm.get("skillArr") as FormArray;
  // }

  // get getSkillGroup() {
  //   return this.myForm.get("skillGroup") as FormArray;
  // }

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
    return this.data.skillGroups.map(x => `${x.id}`);
  }

  // dropGroup(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(
  //     this.myForm.get("skillGroups").controls,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }

  // dropGroup(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(
  //     this.myForm.get("skillGroups").controls,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }
  // dropItem(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(
  //     this.myForm.get("skillGroups").controls,
  //     event.previousIndex,
  //     event.currentIndex
  //   );
  // }
}
