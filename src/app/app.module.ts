import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SkillsComponent } from "./skills/skills.component";
import { SkillsCreateComponent } from "./skills/skills-create/skills-create.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormComponent } from "./form/form.component";
import { GroupComponent } from "./group/group.component";
import { SkillsGroupComponent } from "./skills/skills-group/skills-group.component";
import { NestedComponent } from "./nested/nested.component";
import { CityComponent } from "./city/city.component";
import { EmployeeGroupComponent } from "./employee-group/employee-group.component";
import { GridComponent } from './grid/grid.component';
import { FlexComponent } from './flex/flex.component';
import { WrapComponent } from './wrap/wrap.component';
import { GridsterModule } from 'angular-gridster2';
import { DragulaComponent } from './dragula/dragula.component';
import { DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    SkillsCreateComponent,
    FormComponent,
    GroupComponent,
    SkillsGroupComponent,
    NestedComponent,
    CityComponent,
    EmployeeGroupComponent,
    GridComponent,
    FlexComponent,
    WrapComponent,
    DragulaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatFormFieldModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    GridsterModule,
    DragulaModule.forRoot()
  ],
  exports: [MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
