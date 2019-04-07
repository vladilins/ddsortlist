import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { SkillsComponent } from "./skills/skills.component";
import { SkillsCreateComponent } from "./skills/skills-create/skills-create.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent, SkillsComponent, SkillsCreateComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [MatFormFieldModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
