import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-default', class: '' },
  { path: '/client-management', title: 'Client Management ', icon: 'ni-planet text-blue', class: '' },
  { path: '/quote-management', title: 'Quote Management ', icon: 'ni-pin-3 text-orange', class: '' },
  { path: '/invoice-management', title: 'Invoice Management ', icon: 'ni-single-02 text-yellow', class: '' },
  { path: '/project-management', title: 'Project Management ', icon: 'ni-bullet-list-67 text-red', class: '' },
  // { path: '/login', title: 'Support Ticket ',  icon:'ni-key-25 text-info', class: '' },
  { path: '/support-ticket', title: 'Support Ticket ', icon: 'ni ni-circle-08 text-orange', class: '' },
  { path: '/client-report', title: 'Client Report', icon: 'ni ni-folder-17 text-pink', class: '' },
  { path: '/project-report', title: 'Project Report', icon: 'ni ni-folder-17 text-pink', class: '' },
  { path: '/quote-report', title: 'Quote Report', icon: 'ni ni-folder-17 text-pink', class: '' },
  { path: '/master', title: 'Master', icon: 'ni ni-settings-gear-65 text-pink', class: '' },
  { path: '/client-type', title: 'Client Type', icon: 'ni-single-02 text-pink', class: '' },
  { path: '/client-country', title: 'Client Country', icon: 'ni ni-square-pin text-pink', class: '' },
  { path: '/project-type', title: 'Project Type', icon: 'ni ni-paper-diploma text-pink', class: '' },
  { path: '/support-ticket-impact', title: 'Support Ticket Impact', icon: 'ni ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router, private authservice: AuthService) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
    });

  }

  Logout(event?: MouseEvent) {
    this.authservice.logout();

  }


  // logout() {
  //   // remove user from local storage to log user out
  //   localStorage.removeItem('user');
  //   this.userSubject.next(null);
  //   this.router.navigate(['/login']);
  // }
}
