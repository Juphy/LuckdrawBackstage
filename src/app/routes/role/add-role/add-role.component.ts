import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
})
export class AddRoleComponent implements OnInit {
  @Input() id: number;
  constructor() { }

  ngOnInit() {
  }

}
