import { Component, OnInit, ViewContainerRef, ViewChild } from "@angular/core";

import { ComponentFactoryResolver } from "@angular/core/src/render3";

@Component({
  selector: "app-group",
  template: `
    <p>Paragraph One</p>
    <template #clone>
      <p>Paragraph Two</p>
    </template>
    <p>Paragraph Three</p>

    <button (click)="cloneTemplate()">Clone Template</button>

    <div #container></div>
  `,
  styleUrls: ["./group.component.scss"]
})
export class GroupComponent {
  // What to clone
  @ViewChild("clone") template;

  // Where to insert the cloned content
  @ViewChild("container", { read: ViewContainerRef }) container;

  constructor() {}

  cloneTemplate() {
    this.container.createEmbeddedView(this.template);
  }
}
