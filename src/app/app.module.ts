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
import { GroupComponent } from './group/group.component';
import { SkillsGroupComponent } from './skills/skills-group/skills-group.component';
import { NestedComponent } from './nested/nested.component';
import { CityComponent } from './city/city.component';

@NgModule({
  declarations: [
    AppComponent,
    SkillsComponent,
    SkillsCreateComponent,
    FormComponent,
    GroupComponent,
    SkillsGroupComponent,
    NestedComponent,
    CityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatFormFieldModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule
  ],
  exports: [MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
