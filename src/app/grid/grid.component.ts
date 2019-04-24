import {
  Component,
  NgModule,
  ViewChild,
  AfterViewInit,
  OnInit
} from "@angular/core";
import {
  CdkDrag,
  CdkDragStart,
  CdkDropList,
  CdkDropListGroup,
  CdkDragMove,
  CdkDragEnter,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { ViewportRuler } from "@angular/cdk/overlay";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"]
})
export class GridComponent implements OnInit, AfterViewInit {
  ngOnInit() {}

  @ViewChild(CdkDropListGroup) listGroup: CdkDropListGroup<CdkDropList>;
  @ViewChild(CdkDropList) placeholder: CdkDropList;

  public items: Array<number> = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  public matched: Array<number> = [0];

  public target: CdkDropList;
  public targetIndex: number;
  public source: CdkDropList;
  public sourceIndex: number;
  public dragIndex: number;
  public activeContainer;
  public activeCandidateNr: number;

  constructor(private viewportRuler: ViewportRuler) {
    this.target = null;
    this.source = null;
  }
  ngAfterViewInit() {
    const phElement = this.placeholder.element.nativeElement;

    phElement.style.display = "none";
    phElement.parentElement.removeChild(phElement);
  }

  dragMoved(e: CdkDragMove) {
    const point = this.getPointerPositionOnPage(e.event);
    this.listGroup._items.forEach(dropList => {
      if (this.__isInsideDropListClientRect(dropList, point.x, point.y)) {
        this.activeContainer = dropList;
        return;
      }
    });
  }

  dropListDropped(event: CdkDragDrop<string[]>) {
    if (!this.target) {
      return;
    }
    if (this.sourceIndex === -1) {
      this.sourceIndex = parseInt(
        this.source.id.split("candidate_list_")[1],
        10
      );
    }
    const phElement = this.placeholder.element.nativeElement;
    const parent = phElement.parentElement;

    phElement.style.display = "none";

    parent.removeChild(phElement);
    parent.appendChild(phElement);

    if (
      this.source.id === "matched_list" ||
      this.target.id === "matched_list"
    ) {
      console.log("dropListDropped", this.target.id, this.source.id);
      if (this.target.id === "matched_list") {
        // clear out list (only one can be added)
        console.log("dropListDropped source index = ", this.sourceIndex);
        while (this.matched.length > 0) {
          if (this.matched[0] === 0) {
            this.matched.shift();
          } else {
            transferArrayItem(
              this.matched,
              this.items,
              0,
              this.sourceIndex + 1
            );
          }
        }
        transferArrayItem(this.items, this.matched, this.sourceIndex, 0);
      } else {
        if (this.matched[0] === 0) {
          this.matched.shift();
        } else {
          transferArrayItem(this.matched, this.items, 0, this.targetIndex);
        }
      }
    } else {
      if (this.sourceIndex !== this.targetIndex) {
        parent.insertBefore(
          this.source.element.nativeElement,
          parent.children[this.sourceIndex]
        );
        moveItemInArray(this.items, this.sourceIndex, this.targetIndex);
      }
    }
    this.target = null;
    this.source = null;
  }

  dropListEnterPredicate = (drag: CdkDrag, drop: CdkDropList) => {
    if (drop === this.placeholder) {
      return true;
    }
    if (drop !== this.activeContainer) {
      return false;
    }

    const phElement = this.placeholder.element.nativeElement;
    const sourceElement = drag.dropContainer.element.nativeElement;
    const dropElement = drop.element.nativeElement;

    const dragIndex = this.__indexOf(
      dropElement.parentElement.children,
      this.source ? phElement : sourceElement
    );
    const dropIndex = this.__indexOf(
      dropElement.parentElement.children,
      dropElement
    );

    if (!this.source) {
      this.sourceIndex = dragIndex;
      this.source = drag.dropContainer;

      phElement.style.width = sourceElement.clientWidth + "px";
      phElement.style.height = sourceElement.clientHeight + "px";

      if (sourceElement.id !== "matched_list") {
        sourceElement.parentElement.removeChild(sourceElement);
      } else {
        this.matched.push(0);
      }
    }

    this.targetIndex = dropIndex;
    this.target = drop;

    phElement.style.display = "";
    dropElement.parentElement.insertBefore(
      phElement,
      dropIndex > dragIndex ? dropElement.nextSibling : dropElement
    );

    this.placeholder.enter(
      drag,
      drag.element.nativeElement.offsetLeft,
      drag.element.nativeElement.offsetTop
    );
    return false;
  };

  /** Determines the point of the page that was touched by the user. */
  getPointerPositionOnPage(event: MouseEvent | TouchEvent) {
    // `touches` will be empty for start/end events so we have to fall back to `changedTouches`.
    const point = this.__isTouchEvent(event)
      ? event.touches[0] || event.changedTouches[0]
      : event;
    const scrollPosition = this.viewportRuler.getViewportScrollPosition();

    return {
      x: point.pageX - scrollPosition.left,
      y: point.pageY - scrollPosition.top
    };
  }

  private __indexOf(collection, node) {
    return Array.prototype.indexOf.call(collection, node);
  }

  /** Determines whether an event is a touch event. */
  private __isTouchEvent(event: MouseEvent | TouchEvent): event is TouchEvent {
    return event.type.startsWith("touch");
  }

  private __isInsideDropListClientRect(
    dropList: CdkDropList,
    x: number,
    y: number
  ) {
    const {
      top,
      bottom,
      left,
      right
    } = dropList.element.nativeElement.getBoundingClientRect();
    return y >= top && y <= bottom && x >= left && x <= right;
  }
}
