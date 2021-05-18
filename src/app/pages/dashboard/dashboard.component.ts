import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import Chart from 'chart.js';
import { ModalService } from '../../components/_modal';
import { MustMatch } from '../../_helpers/must-match.validator';
import { NgxSpinnerService } from "ngx-spinner";
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  constructor(private ngxSpinnerService: NgxSpinnerService, private modalService: ModalService, private formBuilder: FormBuilder, private authService: AuthService) { }
  bodyText: string;
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  TotalClinetRegistered: number;


  ngOnInit() {

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartOrderss = document.getElementById('chart-orderss');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrderss, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
    this.bodyText = 'This text can be updated in modal 1';

    setTimeout(() => this.openModal(), 1000);


    this.registerForm = this.formBuilder.group({
      newpass: ['', [Validators.required]],
      confirmpass: ['', [Validators.required]]

    }, {
      validator: MustMatch('newpass', 'confirmpass')
    });


    this.GetDashboardDetail();


  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }


  //#region  for Reset Password 
  openModal() {

    if (this.authService.userValue.isAutoPass) {
      this.modalService.open("custom-modal-1");
    }


  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const { newpass } = this.registerForm.value;

    this.loading = true;
    this.ngxSpinnerService.show();
    this.authService.resetpassword(newpass).subscribe(
      data => {
        if (data.responseCode == 200) {
          this.modalService.close("custom-modal-1");
          this.loading = false;
          this.ngxSpinnerService.hide();
        }
        else if (data.responseCode == 400) {
          this.modalService.close("custom-modal-1");
          this.loading = false;
          this.ngxSpinnerService.hide();
        }
      },
      err => {

      }
    );
  }

  //#endregion nd region for Reset Password 



  //#region  For Dashboard Count 

  GetDashboardDetail() {
    this.ngxSpinnerService.show();
    this.authService.GetDashboardDetail().subscribe(
      data => {
        if (data.responseCode == 200) {
          debugger;
          this.TotalClinetRegistered = data.responseObject.totalClinetRegistered;
          this.ngxSpinnerService.hide();
        }
        else if (data.responseCode == 400) {
          this.ngxSpinnerService.hide();
        }
      },
      err => {

      }
    );
  }

  //#endregion




}
