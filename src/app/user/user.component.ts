import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  constructor(private http: Http) {}
  confirmationString: string = 'New user has been Added !!';
  isAdded: boolean = false;
  userObj: object = [];

  addNewUser = function(user) {
    this.userObj = {
      u_id: user.u_id,
      u_name:user.u_name,
      u_pass: user.u_pass
    };
    this.http
      .post('http://localhost:3000/users', this.userObj)
      .subscribe((res: Response) => {
        this.isAdded = true;
      });
  };
  ngOnInit() { }
}