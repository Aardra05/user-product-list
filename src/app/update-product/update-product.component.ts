import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  id: number;
  data: object = {};
  products = [];
  exist = false;
  productObj: object = {};
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: Http
  ) {}
  confirmationString: string = 'Product updated successfully !!';
  isUpdated: boolean = false;

  updateProduct = function(product) {
    this.productObj = {
      p_id: product.p_id,
      p_name: product.p_name,
      p_cost: product.p_cost
    };
    const url = `${'http://localhost:3000/products'}/${this.id}`;
    this.http
      .put(url, JSON.stringify(this.productObj), { headers: this.headers })
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
      .get('http://localhost:3000/products')
      .subscribe((res: Response) => {
        this.isUpdated = true;
        this.products = res.json();
        for (var i = 0; i < this.products.length; i++) {
          if (parseInt(this.products[i].id) === this.id) {
            this.exist = true;
            this.data = this.products[i];
            break;
          } else {
            this.exist = false;
          }
        }
      });
  }
}
