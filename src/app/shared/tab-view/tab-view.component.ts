import {
  AfterContentChecked,
  Component,
  ContentChildren,
  QueryList,
  signal,
} from "@angular/core";
import { TabItemComponent } from "./tab-item/tab-item.component";
import { NgComponentOutlet, NgTemplateOutlet } from "@angular/common";

@Component({
  selector: "app-tab-view",
  standalone: true,
  imports: [NgTemplateOutlet, NgComponentOutlet],
  templateUrl: "./tab-view.component.html",
  styleUrl: "./tab-view.component.css",
})
export class TabViewComponent implements AfterContentChecked {
  @ContentChildren(TabItemComponent)
  tabItems: QueryList<TabItemComponent>;

  activeIndex = signal<number>(0);

  ngAfterContentChecked(): void {
    if (this.tabItems && this.tabItems.length) {
      this._setActiveTab();
    }
  }

  private _setActiveTab(): void {
    this.tabItems.map((item, index) => {
      item.active = index === this.activeIndex();
      return item;
    });
  }
}
