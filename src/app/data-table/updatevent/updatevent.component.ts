import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-updatevent',
  templateUrl: './updatevent.component.html',
  styleUrls: ['./updatevent.component.scss']
})
export class UpdateventComponent implements OnInit {
  editEmployeeForm: employeeForm = new employeeForm();


  constructor() { }

  ngOnInit(): void {
  }

}
export class employeeForm {
  Id: number = 0;
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
  Address: string = "";
  Phone: string = "";
}
