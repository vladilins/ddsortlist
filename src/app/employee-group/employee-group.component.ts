import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";

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

  onSubmit() {
    console.log(this.myForm.value);
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

  // Pop up Form
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
