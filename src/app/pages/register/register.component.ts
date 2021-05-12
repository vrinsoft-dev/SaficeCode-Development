import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { TokenstorageService } from '../../_services/tokenstorage.service';
import { AlertService } from '../../_services/alert.service';
import { Alert, AlertType } from '../../_models/alert';
import { Subscription } from 'rxjs';


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

  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;

  constructor(private alertService: AlertService, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenstorageService, private router: Router) { }

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

    this.alertSubscription = this.alertService.onAlert(this.id)
      .subscribe(alert => {
        // clear alerts when an empty alert is received
        if (!alert.message) {
          // filter out alerts without 'keepAfterRouteChange' flag
          this.alerts = this.alerts.filter(x => x.keepAfterRouteChange);

          // remove 'keepAfterRouteChange' flag on the rest
          this.alerts.forEach(x => delete x.keepAfterRouteChange);
          return;
        }
        // add alert to array
        this.alerts.push(alert);
        setTimeout(() => this.removeAlert(alert), 3000);

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
    const Model = this.registerForm.value;
    this.authService.Register(Model).subscribe(
      data => {
        debugger;
        if (data != null) {
          this.alertService.error(data.responseMessage);
        }

      },
      err => {
        // if (err.status == 401) 
        // {
        //   this.errormessage = "Email or password is incorrect"
        // } else {
        //   this.errormessage = err.error.message || "Something went wrong please try again";
        // }
        // this.isloginfail = true;
      }
    );
  }


  removeAlert(alert: Alert) {
    // check if already removed to prevent error on auto close
    if (!this.alerts.includes(alert)) return;

    if (this.fade) {
      // fade out alert
      this.alerts.find(x => x === alert).fade = true;

      // remove alert after faded out
      setTimeout(() => {
        this.alerts = this.alerts.filter(x => x !== alert);
      }, 250);
    } else {
      // remove alert
      this.alerts = this.alerts.filter(x => x !== alert);
    }
  }

  cssClass(alert: Alert) {
    if (!alert) return;

    const classes = ['alert', 'alert-dismissable'];

    const alertTypeClass = {
      [AlertType.Success]: 'alert-success',
      [AlertType.Error]: 'alert-danger',
      [AlertType.Info]: 'alert-info',
      [AlertType.Warning]: 'alert-warning'
    }

    classes.push(alertTypeClass[alert.type]);

    if (alert.fade) {
      classes.push('fade');
    }

    return classes.join(' ');
  }


}

