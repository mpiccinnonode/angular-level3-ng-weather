import { AfterContentChecked, Component, ContentChildren, QueryList, signal } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'app-tab-view',
    standalone: true,
    imports: [NgTemplateOutlet, NgComponentOutlet, NgClass],
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

    // sets the selected tab as active and hides the previously selected one
    setActiveTab(index: number): void {
        const currentlyActive = this.tabItems.get(this.activeIndex());
        this.activeIndex.set(index);
        const toActivate = this.tabItems.get(this.activeIndex());
        currentlyActive.active = false;
        toActivate.active = true;
        currentlyActive.cd.markForCheck();
        toActivate.cd.markForCheck();
    }
}
