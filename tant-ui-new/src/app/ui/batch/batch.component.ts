import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DonorService } from 'src/app/services/shared';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  
})
export class BatchListComponent implements OnInit {
  batchForm: FormGroup;
  submitted = false;
  error: string = null;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private userService: DonorService) {
  }

  ngOnInit() {
    this.batchForm = this.formBuilder.group({
      BatchId: new FormControl('', {
        validators: Validators.compose([Validators.required,
        Validators.minLength(4), Validators.maxLength(20)]),
        updateOn: 'blur'
      }),
      BatchName: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ]))
    });
  }

  get user() { return this.batchForm.controls; }

  batch() {
    if (this.loading) {
      return;
    }
    this.loading = true;
    this.submitted = true;
    if (this.batchForm.invalid) {
      this.loading = false;
      return;
    }
    const user = this.batchForm.value;
    this.userService.createBatch(user).subscribe(
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
          this.error = 'Batch Id already in use!';
        }
      },
      err => {
        this.loading = false;
        this.error = err.statusText + ". Ensure you are using HTTP, not HTTPS, to access the site.";
      }
    );
  }

}
