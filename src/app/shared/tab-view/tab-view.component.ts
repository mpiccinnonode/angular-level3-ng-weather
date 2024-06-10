import { AfterContentChecked, Component, ContentChildren, DestroyRef, EventEmitter, Output, QueryList } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';
import { NgClass, NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { TabRemovedEvent } from './models/tab-removed-event.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject } from 'rxjs';

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

    private _activeIndex$ = new BehaviorSubject<number>(0);
    private _firstValueSet = false;

    constructor(private destroyRef: DestroyRef) {}

    // AfterContentChecked is the only lifecycle hook that assures proper render in this situation
    ngAfterContentChecked(): void {
        if (!this._firstValueSet) {
            if (this.tabItems && this.tabItems.length) {
                this._updateActivationStatus();
                this._listenForSingleTab();
                this._firstValueSet = true;
            }
        }
    }

    /**
     * sets the selected tab as active
     * @param index
     */
    setActiveTab(index: number): void {
        this._activeIndex$.next(index);
    }

    /**
     * removes the clicked tab item and emits an event with the removed element index
     * @param event
     * @param index
     */
    removeTab(event: MouseEvent, index: number): void {
        event.stopPropagation();
        const tabItem = this.tabItems.get(index);
        tabItem.removed = true;
        tabItem.cd.detectChanges();
        if (tabItem.active) {
            this._activeIndex$.next(0);
        }
        this.tabRemoved.emit({ removedIndex: index });
    }

    /**
     * sets active tab if it's the only item
     */
    private _listenForSingleTab(): void {
        this.tabItems.changes.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
            if (this.tabItems.length === 1) {
                this._activeIndex$.next(0);
            }
        });
    }

    /**
     * updates the activation status of all tabs whenever the active index changes
     * @private
     */
    private _updateActivationStatus(): void {
        this._activeIndex$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((value) => {
            this.tabItems.forEach((tab, index) => {
                if (!tab.removed) {
                    tab.active = index === value;
                    tab.cd.detectChanges();
                }
            });
        });
    }
}
