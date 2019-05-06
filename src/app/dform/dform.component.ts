import { Component, OnInit } from '@angular/core';
import { NgOption } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

// import { NgSelectComponent } from '../../../src/ng-select/ng-select.component';

@Component({
  selector: 'app-dform',
  templateUrl: './dform.component.html',
  styleUrls: ['./dform.component.scss']
})
export class DformComponent implements OnInit {

  myForm: FormGroup

  constructor(private fb: FormBuilder, private dragulaService: DragulaService) {
    this.dragulaService.createGroup("LOL", {

      moves: (el, source, handle) => handle.className === "lol"
    });
   }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: '',
      password: '',
      cities: this.fb.array([
        this.fb.control('')
      ])
    })
  }

  get cities(){
    return this.myForm.get('cities') as FormArray
  }

  addCities() {
    this.cities.push(this.fb.control(''));
  }

  citiesList: NgOption[] = [
    { id: 1, name: 'Vilnius' },
    { id: 2, name: 'Kaunas' },
    { id: 3, name: 'Pavilnys'},
    { id: 4, name: 'Pabradė' },
  ];

}
