import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { AlertService } from '../../_services/alert.service';
import { Alert, AlertType } from '../../_models/alert';
import { Subscription } from 'rxjs';
import { TokenstorageService } from '../../_services/tokenstorage.service';
//import { ResponseStatus } from '../../_services/ResponseStatus';

//import { MustMatch } from '../../validatore/must-match.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})


export class LoginComponent implements OnInit {
  @Input() id = 'default-alert';
  @Input() fade = true;

  registerForm: FormGroup;
  submitted = false;


  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;



  constructor(private alertService: AlertService, private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenstorageService, private router: Router) {
  }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
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
    const { email, password } = this.registerForm.value;

    this.authService.login(email, password).subscribe(
      data => {
        debugger;
        if (data != null) {
          if (data.responseCode == 200) {
            this.router.navigate(["/dashboard"]);
          }
          else if (data.responseCode == 400) {
            this.alertService.error(data.responseMessage);
          }
        }



      },
      err => {

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
