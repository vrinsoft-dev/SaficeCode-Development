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

  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenstorageService, private router: Router) { }




  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      CompanyName: ['', Validators.required],
      FullName: ['', Validators.required],
      Industry: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.email]],
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

