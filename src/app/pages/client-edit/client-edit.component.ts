import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-maps',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClienteditComponent implements OnInit {

  public copy: string;
  id: number;
  private sub: any;
  paramsSubscription: Subscription;


  constructor(private router: ActivatedRoute) { }


  ngOnInit() {
    this.sub = this.router.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      alert(this.id);
      // In a real app: dispatch action to load the details here.
    });
  }
}