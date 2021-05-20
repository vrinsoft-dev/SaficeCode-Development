import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CountryService } from './country.service';
import { NgbdSortableHeader, SortEvent } from './sortable.directive';
import { AuthService } from '../../_services/auth.service';
import { Country } from './country';
@Component({
  selector: 'app-app-table',
  templateUrl: './app-table.component.html',
  styleUrls: ['./app-table.component.css'],
  providers: [CountryService, DecimalPipe]
})
export class AppTableComponent {

  // countriesSubject: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
  // countries$: Observable<Country[]> = this.countriesSubject.asObservable();
  // total: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  // total$: Observable<number> = this.total.asObservable();
  // country$: Observable<Country[]>;
  // public country$: Country[] = [];

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(public service: CountryService, private authService: AuthService) {


    this.authService.GetClientList().subscribe((data: Country[]) => {

      this.service._countries$.next(data);
      this.service.countriesBk.next(data);
      //this.service._total$.next(data.length);
    },
      (err) => {
        console.error(err);
      }
    );
    //this.countries$ = service.countries$;
    //this.total$ = service.total$;

  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });



    this.service.sortColumn = column;
    this.service.sortDirection = direction;
  }
}