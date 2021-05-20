import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  isAdmin: string;
}



export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-default', class: '', isAdmin: "0" },
  { path: '/client-management', title: 'Client Management ', icon: 'ni-planet text-default', class: '', isAdmin: "1" },
  { path: '/quote-management', title: 'Quote Management ', icon: 'ni-single-02 text-default', class: '', isAdmin: "0" },
  { path: '/invoice-management', title: 'Invoice Management ', icon: 'ni ni-collection text-default', class: '', isAdmin: "0" },
  { path: '/project-management', title: 'Project Management ', icon: 'ni ni-air-baloon text-default', class: '', isAdmin: "0" },
  // { path: '/login', title: 'Support Ticket ',  icon:'ni-key-25 text-info', class: '' },
  { path: '/support-ticket', title: 'Support Ticket ', icon: 'ni ni-circle-08 text-default', class: '', isAdmin: "0" },
  { path: '/client-report', title: 'Client Report', icon: 'ni ni-folder-17 text-default', class: '', isAdmin: "1" },
  { path: '/project-report', title: 'Project Report', icon: 'ni ni-folder-17 text-default', class: '', isAdmin: "0" },
  { path: '/quote-report', title: 'Quote Report', icon: 'ni ni-folder-17 text-default', class: '', isAdmin: "0" },

  // { path: '/master', title: 'Master',  icon:'ni ni-settings-gear-65 text-pink', class: '' },

  // Custom Lable 
  { path: '', title: 'Master', icon: 'ni text-default', class: 'nav-label-custom', isAdmin: "1" },

  { path: '/master-client', title: 'Client Type', icon: 'ni ni-single-02 text-default', class: '', isAdmin: "1" },
  { path: '/master-country', title: 'Client Country', icon: 'ni ni-square-pin text-default', class: '', isAdmin: "1" },
  { path: '/master-project', title: 'Project Type', icon: 'ni ni-paper-diploma text-default', class: '', isAdmin: "1" },
  { path: '/master-support-ticket', title: 'Support Ticket Impact', icon: 'ni ni-circle-08 text-default', class: '', isAdmin: "1" },

  // Custom Lable 
  { path: '', title: 'CMS Management', icon: 'ni text-default', class: 'nav-label-custom', isAdmin: "1" },

  { path: '/cms-management', title: 'CMS Management', icon: 'ni ni-single-02 text-default', class: '', isAdmin: "1" },
  { path: 'App-table', title: 'App-table', icon: 'ni ni-single-02 text-default', class: '', isAdmin: "1" },
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

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {


    if (this.authService.userValue.userTypeId == 2) {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      debugger;
      this.menuItems = this.menuItems.filter(x => x.isAdmin == "0");
      debugger;

      console.log(this.menuItems);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    }
    else {
      this.menuItems = ROUTES.filter(menuItem => menuItem);
      this.router.events.subscribe((event) => {
        this.isCollapsed = true;
      });
    }



  }
}
