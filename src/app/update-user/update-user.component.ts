import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id: number;
  data: object = {};
  user = [];
  exist = false;
  userObj: object = {};
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http
  ) {}
  confirmationString: string = 'User updated successfully !!';
  isUpdated: boolean = false;

  updateUser= function(user) {
    this.userObj = {
      u_id:user.u_id,
      u_name: user.u_name,
      u_pass: user.u_pass
    };
    const url = `${'http://localhost:3000/user'}/${this.id}`;
    this.http
      .put(url, JSON.stringify(this.userObj), { headers: this.headers })
      .toPromise()
      .then(() => {
        this.router.navigate(['/']);
      });
  };
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });
    this.http
      .get('http://localhost:3000/user')
      .subscribe((res: Response) => {
        this.isUpdated = true;
        this.user = res.json();
        for (var i = 0; i < this.user.length; i++) {
          if (parseInt(this.user[i].id) === this.id) {
            this.exist = true;
            this.data = this.user[i];
            break;
          } else {
            this.exist = false;
          }
        }
      });
  }
}

