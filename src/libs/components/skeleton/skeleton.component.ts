import { Component, Input } from "@angular/core";

@Component({
  selector: "app-cfp-skeleton",
  templateUrl: "./skeleton.component.html",
  styleUrls: ["./skeleton.component.scss"],
})
export class SkeletonComponent {
  @Input() loops: number = 1;
  @Input() useTitles = true;
  @Input() card = true;

  constructor() {}

  arrayOne(value: number): any[] {
    return Array(value);
  }
}
