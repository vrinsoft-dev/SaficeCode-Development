import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';
import { Subscription, BehaviorSubject, combineLatest, of } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { map } from "rxjs/operators";
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
  AllClientList: Array<any>;
  routeSubscription: Subscription;
  searchText = '';
  // items = [];
  pageOfItems: Array<any>;
  initialPage = 1;
  pageSize = 5;
  maxPages = 8;
  message: String
  //#endregion



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
          this.AllClientList = data;
          this.ngxSpinnerService.hide();
        }
      },
      err => {
      }
    );
  }




  public inputChange(event: string) {

    if (event.length > 0) {
      this.ClientList = this.ClientList.filter(item => { return (item.fullName.search(new RegExp(event, 'i')) > -1) || (item.companyName.search(new RegExp(event, 'i')) > -1) || (item.emailId.search(new RegExp(event, 'i')) > -1) || (item.industry.search(new RegExp(event, 'i')) > -1) || (item.mobileNumber.search(new RegExp(event, 'i')) > -1) })
        ;
    }
    else {

      this.ClientList = this.AllClientList;

    }

  }





  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.ClientList = pageOfItems;
  }






  // applyFilter(filterValue: string) {
  //   filterValue = filterValue.trim(); // Remove whitespace
  //   filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
  //   this.ClientList = this.ClientList.find(
  //     x => x.fullName == filterValue ||
  //       x.companyName == filterValue ||
  //       x.mobileNumber == filterValue ||
  //       x.emailId == filterValue ||
  //       x.industry == filterValue);
  // }

  ActiveInactiveClinet(UserID, Isactive): void {
    if (Isactive) {
      this.message = 'Do you want to active the client?'
    }
    else {
      this.message = 'Do you want to inactive the client?'
    }
    Swal.fire({
      text: this.message,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      confirmButtonColor: '#11cdef',
      denyButtonColor: '#fb6340',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxSpinnerService.show();
        this.authService.ActiveInactiveClinet(UserID, Isactive).subscribe(
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

  ApproveClinet(UserID, isApproved): void {

    if (isApproved) {
      this.message = 'Do you want to approve the client request?'
    }
    else {
      this.message = 'Do you want to reject the client request?'
    }
    Swal.fire({
      text: this.message,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      confirmButtonColor: '#11cdef',
      denyButtonColor: '#fb6340',
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngxSpinnerService.show();
        this.authService.ApproveClinet(UserID, isApproved).subscribe(
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
      text: 'Do you want to delete the client?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonColor: '#11cdef',
      denyButtonColor: '#fb6340',
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
                this.NotifyAlert("Client deleted.", "Success", "success");

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
      text: Massage,
      icon: icon,
      confirmButtonColor: '#11cdef',
      denyButtonColor: '#fb6340',
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
      this.GetclinetList();
    });
  }

}
