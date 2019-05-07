import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Component, OnInit} from '@angular/core';
import { DragulaService } from 'ng2-dragula';

export interface Vegetable {
  name: string;
}

@Component({
  selector: 'app-chips',
  templateUrl: './chips.component.html',
  styleUrls: ['./chips.component.scss']
})
export class ChipsComponent implements OnInit {

  constructor(private dragulaService: DragulaService) { 
    this.dragulaService.createGroup("M", {
      
      isContainer(el){
        return el.classList.contains('mat-chip-list-wrapper');
      },
      direction: "horizontal"
    });
  }

  ngOnInit() {
    
  }

  vegetables = [
    {name: 'apple'},
    {name: 'banana'},
    {name: 'strawberry'},
    {name: 'orange'},
    {name: 'kiwi'},
    {name: 'cherry'},
  ];

  // drop(event: CdkDragDrop<Vegetable[]>) {
  //   moveItemInArray(this.vegetables, event.previousIndex, event.currentIndex);
  // }



}
