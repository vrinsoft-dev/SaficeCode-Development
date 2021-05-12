import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../../_services/alert.service';
import { Alert, AlertType } from '../../_models/alert';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss']
})

export class ClientManagementComponent implements OnInit {
  @Input() id = 'default-alert';
  @Input() fade = true;
  public copy: string;
  ClientList: Array<any>;


  alerts: Alert[] = [];
  alertSubscription: Subscription;
  routeSubscription: Subscription;


  constructor(private alertService: AlertService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.GetclinetList();

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

  GetclinetList(): void {
    this.authService.GetClientList().subscribe(
      data => {
        if (data != null) {
          this.ClientList = data;
        }
      },
      err => {

      }
    );
  }

  ApproveClinet(UserID): void {

    this.authService.ApproveClinet(UserID).subscribe(
      data => {
        if (data != null) {
          if (data.responseCode == 200) {
            this.alertService.success(data.responseMessage);
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
