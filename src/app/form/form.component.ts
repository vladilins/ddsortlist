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
    template_details: [
      {
        template_name: "Template One",
        template_data: [
          {
            propertyOne: "Property One"
          }
        ]
      }
    ]
  };

  myForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      template_details: this.fb.array([])
    });

    this.setCompanies();
  }

  addNewTemplate() {
    let control = <FormArray>this.myForm.controls.template_details;
    control.push(
      this.fb.group({
        template_name: [""],
        template_data: this.fb.array([])
      })
    );
  }

  addNewProperty(control) {
    control.push(
      this.fb.group({
        propertyOne: [""]
      })
    );
  }

  setCompanies() {
    let control = <FormArray>this.myForm.controls.template_details;
    this.data.template_details.forEach(x => {
      control.push(
        this.fb.group({
          template_name: x.template_name,
          template_data: this.setProperty(x)
        })
      );
    });
  }

  setProperty(x) {
    let arr = new FormArray([]);
    x.template_data.forEach(y => {
      arr.push(
        this.fb.group({
          propertyOne: y.propertyOne
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
