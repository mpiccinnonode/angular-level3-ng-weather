import { Component, Input } from "@angular/core";

@Component({
  selector: "app-tab-item",
  standalone: true,
  imports: [],
  templateUrl: "./tab-item.component.html",
  styleUrl: "./tab-item.component.css",
})
export class TabItemComponent {
  @Input() title: string;
}
