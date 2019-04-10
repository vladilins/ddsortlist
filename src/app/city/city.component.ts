import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

@Component({
  selector: "app-city",
  templateUrl: "./city.component.html",
  styleUrls: ["./city.component.scss"]
})
export class CityComponent implements OnInit {
  ngOnInit() {}
  data = {
    cities: [
      {
        city: "",
        addressLines: [
          {
            addressLine: "",
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
      cities: this.fb.array([])
    });

    this.setCities();
  }

  onSubmit() {
    alert(this.myForm.value);
  }

  addNewCity() {
    let control = <FormArray>this.myForm.controls.cities;
    control.push(
      this.fb.group({
        city: [""],
        addressLines: this.fb.array([])
      })
    );
  }

  deleteCity(index) {
    let control = <FormArray>this.myForm.controls.cities;
    control.removeAt(index);
  }

  addNewAddressLine(control) {
    control.push(
      this.fb.group({
        addressLine: [""],
        years: []
      })
    );
  }

  deleteAddressLine(control, index) {
    control.removeAt(index);
  }

  setCities() {
    let control = <FormArray>this.myForm.controls.cities;
    this.data.cities.forEach(x => {
      control.push(
        this.fb.group({
          city: x.city,
          addressLines: this.setAddressLines(x)
        })
      );
    });
  }

  setAddressLines(x) {
    let arr = new FormArray([]);
    x.addressLines.forEach(y => {
      arr.push(
        this.fb.group({
          addressLine: y.addressLine,
          years: y.years
        })
      );
    });
    return arr;
  }
}
