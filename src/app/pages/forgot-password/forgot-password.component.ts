import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { TokenstorageService } from '../../_services/tokenstorage.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  isShown: boolean = false;
  ServerErrorMassage: string = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenstorageService, private router: Router) {
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
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
    const { email } = this.registerForm.value;
    this.authService.ForgotPassword(email).subscribe(
      data => {
        debugger;

        if (data.responseCode == 200) {
          this.ServerErrorMassage = data.responseMessage;
          //chnage color green
          this.isShown = true;
        }
        else {
          this.ServerErrorMassage = data.responseMessage;
          this.isShown = true;
          //chnage color red
        }

      },
      err => {

      }
    );
  }



}
