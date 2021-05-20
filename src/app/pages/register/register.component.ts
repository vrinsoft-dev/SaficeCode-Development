import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { TokenstorageService } from '../../_services/tokenstorage.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ModalService } from '../../components/_modal';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() id = 'default-alert';
  @Input() fade = true;
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  routeSubscription: Subscription;
  mdltertmcondtion: false;
  regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenstorageService, private router: Router) { }




  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      CompanyName: ['', Validators.required],
      FullName: ['', Validators.required],
      Industry: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.pattern(this.regularExpression)]],
      MobileNumber: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      IstermsCondition: [false, Validators.requiredTrue]

    });
  }

  get f() {
    return this.registerForm.controls;
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
          if (data.responseCode == 200) {

            this.NotifyAlert(data.responseMessage, "Success", "success");
            this.loading = false;
          }
          else if (data.responseCode == 400) {
            this.NotifyAlert(data.responseMessage, "Error", "warning");
            this.loading = false;
          }
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
      text: Massage,
      icon: icon,
      width: 500,
      showCancelButton: false,
      confirmButtonText: 'Ok',
      confirmButtonColor: '#141d28',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    }).then((result) => {
      if (icon == "success") {
        this.router.navigate(["/login"]);
      }

    });
  }


  OpenModalForTermAndCondition() {
    debugger;
    this.modalService.open("custom-modal-1");
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


  onCheckboxChange(e) {
    this.mdltertmcondtion = e.target.checked;
  }


}

