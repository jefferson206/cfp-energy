import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-cfp-carousel",
  templateUrl: "./carousel.component.html",
  styleUrls: ["./carousel.component.scss"],
})
export class CarouselComponent implements OnInit {
  readonly CAROUSEL_ITENS = [
    {
      image: './assets/images/carousel/iphone_box.jpg',
      alternativeText: 'Iphone',
      title: 'Iphone',
      paragraph: 'Iphone Box',
    }
  ];

  constructor(
  ) {
  }

  ngOnInit() {}

}
