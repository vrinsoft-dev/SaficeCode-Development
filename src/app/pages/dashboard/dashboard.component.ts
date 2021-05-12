import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { ModalService } from '../../components/_modal';

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
  constructor(private modalService: ModalService) { }
  bodyText: string;

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

}
