import { Component, OnInit } from '@angular/core';
import { DragulaService } from 'ng2-dragula';


@Component({
  selector: 'app-dragula',
  templateUrl: './dragula.component.html',
  styleUrls: ['./dragula.component.scss']
})
export class DragulaComponent implements OnInit {

  constructor(private dragulaService: DragulaService) {
    this.dragulaService.createGroup("COLUMNS", {
      direction: 'horizontal',
      moves: (el, source, handle) => handle.className === "group-handle"
    });
  }

  public groups:Array<any> = [
    {
      name: 'Group A',
      items: [{name: 'Item A'}, {name: 'Item B'}, {name: 'Item C'}, {name: 'Item D'},{name: 'Item E'}, {name: 'Item F'}, {name: 'Item G'}, {name: 'Item H'}]
    },
    {
      name: 'Group B',
      items: [{name: 'Item 1'}, {name: 'Item 2'}, {name: 'Item 3'}, {name: 'Item 4'}, {name: 'Item 5'}, {name: 'Item 6'}, {name: 'Item 7'}, {name: 'Item 8'}]
    }
  ];

  ngOnInit() {
  }

}
