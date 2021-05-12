import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
import Chart from 'chart.js';
import { ModalService } from '../../components/_modal';
import { MustMatch } from '../../_helpers/must-match.validator';
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
  constructor(private modalService: ModalService, private formBuilder: FormBuilder, private authService: AuthService) { }
  bodyText: string;
  registerForm: FormGroup;
  submitted = false;


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


  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  openModal() {
    //this.modalService.open(id);

    this.modalService.open("custom-modal-1");

  }
  closeModal(id: string) {
    this.modalService.close(id);
  }

  get f() {
    return this.registerForm.controls;
  }


  onSubmit() {


    debugger;
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }
    const { newpass } = this.registerForm.value;

    this.authService.resetpassword(newpass).subscribe(
      data => {
        debugger;
        if (data.responseCode == 200) {
          this.modalService.close("custom-modal-1");
        }
        else if (data.responseCode == 400) {
          //this.alertService.error(data.responseMessage);
          this.modalService.close("custom-modal-1");
        }
      },
      err => {

      }
    );
  }



}
