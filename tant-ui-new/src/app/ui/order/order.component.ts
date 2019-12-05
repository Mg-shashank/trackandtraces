import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonorService } from 'src/app/services/shared';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',

})
export class OrderListComponent implements OnInit {
  orderForm: FormGroup;
  submitted = false;
  error: string = null;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: DonorService) {
  }

  ngOnInit() {
    this.orderForm = this.formBuilder.group({
      OrderId: new FormControl('', {
        validators: Validators.compose([Validators.required,
        Validators.minLength(4), Validators.maxLength(20)]),
        updateOn: 'blur'
      }),
      OredrName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      Quantity: new FormControl('', Validators.compose([
        Validators.required,
        Validators.Quantity
      ]))

    });
  }

  get user() { return this.orderForm.controls; }

  signup() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.submitted = true;
    if (this.orderForm.invalid) {
      this.loading = false;
      return;
    }
    const user = this.orderForm.value;
    this.userService.createOrder(user).subscribe(
      data => {
        if (data.success) {
        
            resp => {
              this.router.navigate(['ngolist']);
              return;
            },
            err => {
              this.loading = false;
              this.error = err.statusText;
            }
          
        } else {
          this.loading = false;
          this.error = 'Order Id already in use!';
        }
      },
      err => {
        this.loading = false;
        this.error = err.statusText + ". Ensure you are using HTTP, not HTTPS, to access the site.";
      }
    );
  }

}
