import { AfterContentChecked, Component, ContentChildren, DestroyRef, EventEmitter, Output, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { TabRemovedEvent } from './models/tab-removed-event.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-tab-view',
    standalone: true,
    imports: [NgTemplateOutlet, NgComponentOutlet, NgClass],
    templateUrl: './tab-view.component.html',
    styleUrl: './tab-view.component.css',
})
export class TabViewComponent implements AfterContentChecked {
    @ContentChildren(TabItemComponent) tabItems: QueryList<TabItemComponent>;
    @Output() tabRemoved = new EventEmitter<TabRemovedEvent>();

    private _activeIndex = 0;
    private _firstValueSet = false;

    constructor(private destroyRef: DestroyRef) {}

    // AfterContentChecked is the only lifecycle hook that assures proper render in this situation
    ngAfterContentChecked(): void {
        if (!this._firstValueSet) {
            if (this.tabItems && this.tabItems.length) {
                this.tabItems.first.active = true;
                this.tabItems.first.cd.detectChanges();
                this._listenForSingleTab();
                this._firstValueSet = true;
            }
        }
    }

    // sets the selected tab as active and hides the previously selected one
    setActiveTab(index: number): void {
        const currentlyActive = this.tabItems.get(this._activeIndex);
        this._activeIndex = index;
        const toActivate = this.tabItems.get(this._activeIndex);
        currentlyActive.active = false;
        toActivate.active = true;
        currentlyActive.cd.detectChanges();
        toActivate.cd.detectChanges();
    }

    // removes the clicked tab item and emits an event with the removed element index
    removeTab(event: MouseEvent, index: number): void {
        event.stopPropagation();
        const tabItem = this.tabItems.get(index);
        if (tabItem.active) {
            this.tabItems.first.active = true;
            this._activeIndex = 0;
            this.tabItems.first.cd.detectChanges();
        }
        tabItem.removed = true;
        tabItem.cd.detectChanges();
        this._checkForSingleElement();
        this.tabRemoved.emit({ removedIndex: index });
    }

    // sets active tab if it's the only item
    private _listenForSingleTab(): void {
        this.tabItems.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            this._checkForSingleElement();
        });
    }

    private _checkForSingleElement(): void {
        if (this.tabItems) {
            const notRemoved: TabItemComponent[] = [];
            this.tabItems.forEach((tab) => {
                if (!tab.removed) {
                    notRemoved.push(tab);
                }
            });
            if (notRemoved.length === 1) {
                const notRemovedItem = notRemoved[0];
                notRemovedItem.active = true;
                notRemovedItem.cd.detectChanges();
            }
        }
    }
}
