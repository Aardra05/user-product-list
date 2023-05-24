import { Component, OnInit } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  constructor(private http: Http) {}
  id: number;
  private headers = new Headers({ 'Content-Type': 'application/json' });
  users = [];
  fetchData = function() {
    this.http
      .get('http://localhost:3000/users')
      .subscribe((res: Response) => {
        this.users = res.json();
      });
  };

  deleteUser = function(id) {
    if (confirm('Are you sure?')) {
      const url = `${'http://localhost:3000/users'}/${id}`;
      return this.http
        .delete(url, { headers: this.headers })
        .toPromise()
        .then(() => {
          this.fetchData();
        });
    }
  };

  ngOnInit() {
    this.fetchData();
  }
}
