import {AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, QueryList} from '@angular/core';
import {TabItemComponent} from './tab-item/tab-item.component';

@Component({
  selector: 'app-tab-view',
  standalone: true,
  imports: [],
  templateUrl: './tab-view.component.html',
  styleUrl: './tab-view.component.css'
})
export class TabViewComponent implements AfterViewInit {
  @ContentChildren(TabItemComponent, {read: ElementRef}) tabItems: QueryList<TabItemComponent>;

  ngAfterViewInit(): void {
    console.log(this.tabItems)
  }
}
