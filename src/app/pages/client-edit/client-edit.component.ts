import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { TokenstorageService } from '../../_services/tokenstorage.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';




@Component({
  selector: 'app-maps',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClienteditComponent implements OnInit {

  public copy: string;
  id: number;
  private sub: any;
  paramsSubscription: Subscription;
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  routeSubscription: Subscription;
  ClientTypeList: Array<any>;




  constructor(private ngxSpinnerService: NgxSpinnerService, private activatedroute: ActivatedRoute, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenstorageService, private router: Router) { }

  ngOnInit() {
    this.sub = this.activatedroute.params.subscribe(params => {
      this.id = +params['id'];

      this.registerForm = this.formBuilder.group({
        CompanyName: ['', Validators.required],
        FullName: ['', Validators.required],
        EmailId: ['', [Validators.required, Validators.email]],
        CurrencyName: ['', [Validators.required]],
        ClientType: ['', [Validators.required]],
        UserId: ['', [Validators.required]]
      });

      this.GetClientTypeList();
      this.GetClinetDetails()



    });
  }

  get f() {
    return this.registerForm.controls;
  }

  GetClientTypeList(): void {
    this.ngxSpinnerService.show();
    this.authService.GetClinetTypeList().subscribe(
      data => {
        if (data != null) {
          debugger;
          this.ClientTypeList = data;
          this.ngxSpinnerService.hide();
        }
      },
      err => {
      }
    );
  }

  GetClinetDetails(): void {
    this.ngxSpinnerService.show();
    this.authService.GetClinetDetail(this.id).subscribe(
      data => {
        if (data != null) {

          this.registerForm.setValue({
            UserId: data.responseObject.userId,
            CompanyName: data.responseObject.companyName,
            FullName: data.responseObject.fullName,
            EmailId: data.responseObject.emailId,
            CurrencyName: data.responseObject.currencyName,
            ClientType: data.responseObject.clientType
          });
          this.ngxSpinnerService.hide();

        }
      },
      err => {
      }
    );
  }



  onSubmit() {

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    const Model = this.registerForm.value;
    this.authService.Register(Model).subscribe(
      data => {
        if (data != null) {
          this.NotifyAlert(data.responseMessage, "Success", "success")
          this.loading = false;


        }

      },
      err => {
        this.loading = false;
        this.NotifyAlert("", "Error", "error")
      }
    );
  }

  NotifyAlert(Massage, Titel, icon) {
    Swal.fire({
      title: Titel,
      text: Massage,
      icon: icon,
      width: 500,
      showCancelButton: false,
      confirmButtonText: 'Ok',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {

    });
  }


}

