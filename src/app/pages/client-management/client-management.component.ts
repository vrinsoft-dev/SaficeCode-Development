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

  //#region pagging
  @Input() totalRecords = 50;
  @Input() recordsPerPage = 10;

  @Output() onPageChange: EventEmitter<number> = new EventEmitter();

  public pages: number[] = [];
  activePage: number;

  ngOnChanges(): any {
    const pageCount = this.getPageCount();
    this.pages = this.getArrayOfPage(pageCount);
    this.activePage = 1;
    this.onPageChange.emit(1);
  }

  private getPageCount(): number {
    let totalPage = 0;

    if (this.totalRecords > 0 && this.recordsPerPage > 0) {
      const pageCount = this.totalRecords / this.recordsPerPage;
      const roundedPageCount = Math.floor(pageCount);

      totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
    }

    return totalPage;
  }

  private getArrayOfPage(pageCount: number): number[] {
    const pageArray = [];

    if (pageCount > 0) {
      for (let i = 1; i <= pageCount; i++) {
        pageArray.push(i);
      }
    }

    return pageArray;
  }

  onClickPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.pages.length) {
      this.activePage = pageNumber;
      this.onPageChange.emit(this.activePage);
    }
  }

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

  ApproveClinet(UserID): void {
    Swal.fire({
      text: 'Do you want to Approve the Client Request?',
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: `Yes`,
      confirmButtonColor: '#11cdef',
      denyButtonColor: '#fb6340',
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
      text: 'Do you want to delete the Client?',
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

    });
  }

}
