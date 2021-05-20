import { Injectable, PipeTransform } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Country } from './country';
//import { COUNTRIES } from './countries';
import { DecimalPipe } from '@angular/common';
import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';
import { SortColumn, SortDirection } from './sortable.directive';
import { AuthService } from '../../_services/auth.service';

interface SearchResult {
    countries: Country[];
    total: number;
}

interface State {
    page: number;
    pageSize: number;
    searchTerm: string;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
}

const compare = (v1: string | number | boolean | Date, v2: string | number | boolean | Date) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

function sort(countries: Country[], column: SortColumn, direction: string): Country[] {
    if (direction === '' || column === '') {
        return countries;
    } else {
        return [...countries].sort((a, b) => {
            const res = compare(a[column], b[column]);
            return direction === 'asc' ? res : -res;
        });
    }
}

function matches(country: Country, term: string, pipe: PipeTransform) {
    return country.fullName.toLowerCase().includes(term.toLowerCase());
    // || pipe.transform(country.emailId).includes(term)
    // || pipe.transform(country.industry).includes(term)
    // || pipe.transform(country.companyName).includes(term)
    // || pipe.transform(country.mobileNumber).includes(term);
}


@Injectable({ providedIn: 'root' })
export class CountryService {
    public _loading$ = new BehaviorSubject<boolean>(true);
    public _search$ = new Subject<void>();
    public _countries$ = new BehaviorSubject<Country[]>([]);
    public countriesBk = new BehaviorSubject<Country[]>([]);
    public _total$ = new BehaviorSubject<number>(0);
    //countriesSubject: BehaviorSubject<Country[]> = new BehaviorSubject<Country[]>([]);
    // countries$: Observable<Country[]> = this.countriesSubject.asObservable();
    // total$: Observable<number>;


    private _state: State = {
        page: 1,
        pageSize: 2,
        searchTerm: '',
        sortColumn: '',
        sortDirection: ''
    };

    constructor(private pipe: DecimalPipe, private authService: AuthService) {
        this._search$.pipe(
            tap(() => this._loading$.next(true)),
            debounceTime(200),
            switchMap(() => this._search()),
            delay(200),
            tap(() => this._loading$.next(false))
        ).subscribe(result => {
            console.log(result);
            this._countries$.next(result.countries);
            this._total$.next(result.total);
        });

        this._search$.next();
    }

    get countries$() { return this._countries$.asObservable(); }
    get total$() { return this._total$.asObservable(); }
    get loading$() { return this._loading$.asObservable(); }
    get page() { return this._state.page; }
    get pageSize() { return this._state.pageSize; }
    get searchTerm() { return this._state.searchTerm; }

    set page(page: number) { this._set({ page }); }
    set pageSize(pageSize: number) { this._set({ pageSize }); }
    set searchTerm(searchTerm: string) { this._set({ searchTerm }); }
    set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
    set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {

        console.log('search called: ', new Date());
        // debugger;
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;
        console.log(this._state);

        // 1. sort
        let countries = sort(this._countries$.value, sortColumn, sortDirection);
        console.log(countries);
        // 2. filter
        countries = countries.filter(country => matches(country, searchTerm, this.pipe));
        const total = countries.length;

        // 3. paginate
        countries = countries.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);

        if (searchTerm == '') {
            this._countries$.next(this.countriesBk.getValue());
        } else {
            this._countries$.next(countries);
        }
        // countries = this._countries$.getValue();
        return of({ countries, total });
    }
}
