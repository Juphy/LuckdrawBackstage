import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent implements OnInit {
  @Input() id: number;
  constructor() { }

  ngOnInit() {
  }

}
