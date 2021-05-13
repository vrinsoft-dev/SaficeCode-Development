import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-default', class: '' },
  { path: '/client-management', title: 'Client Management ', icon: 'ni-planet text-default', class: '' },
  { path: '/quote-management', title: 'Quote Management ', icon: 'ni-single-02 text-default', class: '' },
  { path: '/invoice-management', title: 'Invoice Management ', icon: 'ni ni-collection text-default', class: '' },
  { path: '/project-management', title: 'Project Management ', icon: 'ni ni-air-baloon text-default', class: '' },
  // { path: '/login', title: 'Support Ticket ',  icon:'ni-key-25 text-info', class: '' },
  { path: '/support-ticket', title: 'Support Ticket ', icon: 'ni ni-circle-08 text-default', class: '' },
  { path: '/client-report', title: 'Client Report', icon: 'ni ni-folder-17 text-default', class: '' },
  { path: '/project-report', title: 'Project Report', icon: 'ni ni-folder-17 text-default', class: '' },
  { path: '/quote-report', title: 'Quote Report', icon: 'ni ni-folder-17 text-default', class: '' },

  // { path: '/master', title: 'Master',  icon:'ni ni-settings-gear-65 text-pink', class: '' },

  // Custom Lable 
  { path: '', title: 'Master', icon: 'ni text-default', class: 'nav-label-custom' },

  { path: '/master-client', title: 'Client Type', icon: 'ni ni-single-02 text-default', class: '' },
  { path: '/master-country', title: 'Client Country', icon: 'ni ni-square-pin text-default', class: '' },
  { path: '/master-project', title: 'Project Type', icon: 'ni ni-paper-diploma text-default', class: '' },
  { path: '/master-support-ticket', title: 'Support Ticket Impact', icon: 'ni ni-circle-08 text-default', class: '' },

  // Custom Lable 
  { path: '', title: 'CMS Management', icon: 'ni text-default', class: 'nav-label-custom' },

  { path: '/cms-management', title: 'CMS Management', icon: 'ni ni-single-02 text-default', class: '' },

  // { path: '/client-edit', title: 'client-edit',  icon:'ni ni-atom text-pink', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });
  }
}
