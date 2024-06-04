import { AfterContentChecked, Component, ContentChildren, QueryList, signal } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-tab-view',
    standalone: true,
    imports: [NgTemplateOutlet, NgComponentOutlet],
    templateUrl: './tab-view.component.html',
    styleUrl: './tab-view.component.css',
})
export class TabViewComponent implements AfterContentChecked {
    @ContentChildren(TabItemComponent) tabItems: QueryList<TabItemComponent>;

    activeIndex = signal<number>(0);

    private _firstValueSet = false;

    constructor() {}

    // AfterContentChecked is the only lifecycle hook that assures proper render in this situation
    ngAfterContentChecked(): void {
        if (!this._firstValueSet) {
            if (this.tabItems && this.tabItems.length) {
                this.tabItems.first.active = true;
                this.tabItems.first.cd.markForCheck();
                this._firstValueSet = true;
            }
        }
    }

    private _setActiveTab(): void {
        this.tabItems.map((item, index) => {
            item.active = index === this.activeIndex();
            return item;
        });
    }
}
