import { Component, OnInit } from '@angular/core';
import { navbarData } from '../sidenav/nav-data';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

  constructor() { }
  navData = navbarData

  ngOnInit(): void {
  }

}
