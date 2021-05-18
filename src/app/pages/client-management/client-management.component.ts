import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2/dist/sweetalert2.js';
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
  routeSubscription: Subscription;


  constructor(private ngxSpinnerService: NgxSpinnerService, private authService: AuthService, private router: Router) {
  }

  ngOnInit() {

    this.GetclinetList();


  }

  GetclinetList(): void {
    this.ngxSpinnerService.show();
    this.authService.GetClientList().subscribe(
      data => {
        if (data != null) {
          this.ClientList = data;
          this.ngxSpinnerService.hide();
        }
      },
      err => {
      }
    );
  }
  ApproveClinet(UserID): void {
    Swal.fire({
      title: 'Do you want to Approve the Client Request?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxSpinnerService.show();
        this.authService.ApproveClinet(UserID).subscribe(
          data => {
            if (data != null) {
              if (data.responseCode == 200) {
                this.ngxSpinnerService.hide();
                this.NotifyAlert(data.responseMessage, "Success", "success");
              }
              else if (data.responseCode == 400) {
                this.ngxSpinnerService.hide();
                this.NotifyAlert("", "Error", "error");

              }
            }
          },
          err => {
          }
        );
      }
    })
  }
  DeleteClient(UserID): void {

    Swal.fire({
      title: 'Do you want to delete the Client?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxSpinnerService.show();
        this.authService.DeleteClient(UserID).subscribe(
          data => {
            if (data != null) {
              if (data.responseCode == 200) {
                this.ngxSpinnerService.hide();
                this.NotifyAlert("Client Deleted.", "Success", "success");
                this.GetclinetList();
              }
              else if (data.responseCode == 400) {
                this.ngxSpinnerService.hide();
                this.NotifyAlert("", "Error", "error");
              }
            }
          },
          err => { }
        );
      }
    })
  }

  NotifyAlert(Massage, Title, icon) {
    Swal.fire({
      title: Title,
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
