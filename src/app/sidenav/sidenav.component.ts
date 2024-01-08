import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { navbarData, navbarDataSupervisor } from './nav-data';
import { LoginservicesService } from '../logindesign/services/login.service';
import { ResponseI } from '../logindesign/modelos/response.interface';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  rol: string | null = null
  responseI: ResponseI | null = null

  constructor(
    private loginservice: LoginservicesService
  ) {
  }
  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  navData = [{
    routeLink: '',
    icon: '',
    label: ''
  }]


  ngOnInit(): void {


    this.screenWidth = window.innerWidth;
    const responseStr = localStorage.getItem('responseActual');
    if (responseStr != null) {
      this.responseI = JSON.parse(responseStr) as ResponseI

    }

    if (this.responseI?.data.rol == "Administrador") {
      this.navData = navbarDataSupervisor
    } else {
      this.navData = navbarData
    }

  }
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  public logout(): void {
    this.loginservice.logout()
  }

}