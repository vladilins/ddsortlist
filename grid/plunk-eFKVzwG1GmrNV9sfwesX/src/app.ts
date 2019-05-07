//our root app component
import { Component, NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { MdChipsModule } from '@angular/material';

import { DragulaModule, DragulaService } from 'ng2-dragula';

@Component({
  selector: 'my-app',
  template: `
    <md-chip-list>
      <md-chip color="primary" selected="true">Chip 1</md-chip>
      <md-chip color="primary">Chip 2</md-chip>
      <md-chip color="primary">Chip 3</md-chip>
      <md-chip color="primary">Chip 4</md-chip>
      <md-chip color="primary">Chip 5</md-chip>
    </md-chip-list>

    <md-chip-list>
      <md-chip>Chip 6</md-chip>
      <md-chip color="primary" selected="true">Chip 7</md-chip>
      <md-chip>Chip 8</md-chip>
      <md-chip color="accent" selected="true">Chip 9</md-chip>
      <md-chip>Chip 10</md-chip>
    </md-chip-list>
  `,
})
export class App {
  constructor(private dragula: DragulaService) {
    dragula.setOptions('bag-chips', {
      isContainer(el) {
        return el.classList.contains('md-chip-list-wrapper');
      }
    });
  }
}

@NgModule({
  imports: [ BrowserModule, MdChipsModule, DragulaModule ],
  declarations: [ App ],
  bootstrap: [ App ]
})
export class AppModule {}