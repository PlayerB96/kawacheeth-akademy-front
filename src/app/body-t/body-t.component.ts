import { Component, Input, OnInit } from '@angular/core';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-body-t',
  templateUrl: './body-t.component.html',
  styleUrls: ['./body-t.component.scss']
})
export class BodyTComponent {


  @Input() collapsed = false;
  @Input() screenWidth = 0;
  getBodyClass(): string {

    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'body-trimmed';
    } else if (this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'body-md-screen'
    }
    return styleClass;
  }


}
