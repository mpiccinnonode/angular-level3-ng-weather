import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Input } from '@angular/core';

@Component({
    selector: 'app-tab-item',
    standalone: true,
    imports: [],
    templateUrl: './tab-item.component.html',
    styleUrl: './tab-item.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabItemComponent {
    @Input() title: string;
    @Input() active: boolean = false;
    cd = inject(ChangeDetectorRef);
}
