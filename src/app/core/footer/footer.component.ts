import { Component } from "@angular/core";

@Component({
  selector: "app-cfp-footer",
  template: `
    <footer class="page-footer indigo center-on-small-only mt-3">
      <div class="footer-copyright">
        <div class="container-fluid">
          © 2023 Copyright:
          <a href="mailto:jeffersonrmendonca@hotmail.com"> JRM3 | CFP Energy </a>

          <span style="float: right;">
            <i class="fa fa-globe"></i>
            Website:
            <a href="https://www.cfp.energy/" target="blank">CFP Energy UK</a>
          </span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .page-footer {
      bottom: 0;
    }
    footer{
      position:fixed;
      bottom:0px;
      width:100%;
    }
  `],
})
export class FooterComponent {
  constructor() {}
}
