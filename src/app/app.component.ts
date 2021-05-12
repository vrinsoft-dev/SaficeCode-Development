import { Component } from '@angular/core';
import { AuthService } from './_services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'argon-dashboard-angular';
  constructor(private authenticationService: AuthService) {

  }
  logout() {
    this.authenticationService.logout();
  }


}
