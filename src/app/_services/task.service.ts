// import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { TokenstorageService } from './tokenstorage.service';

// const prefixAPI = "https://localhost:44318/api/Task/";

// @Injectable({
//   providedIn: 'root'
// })
// export class TaskService {

//   constructor(private http: HttpClient, private tokenStorageService: TokenstorageService, private route: Router) { }

//   getTaskList(status: string): Observable<any> {
//     const token = this.tokenStorageService.getToken();
//     const user = this.tokenStorageService.getUser();
//     if (token != null && user != null) {
//       const headerOptions = {
//         headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + token }),
//         params: new HttpParams().set('status', status).set('userid', user.id)
//       }
//       return this.http.get(prefixAPI + 'list', headerOptions);
//     } else {
//       this.route.navigate(["/login"]);
//       return new BehaviorSubject(null);
//     }
//   }

//   updateTask(status: string, id: Number): Observable<any> {
//     const token = this.tokenStorageService.getToken();
//     if (token != null) {
//       const headerOptions = {
//         headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + token }),
//       }
//       const body = {
//         id: id,
//         status: status
//       }
//       return this.http.put(prefixAPI + 'update', body, headerOptions);
//     }
//     else {
//       this.route.navigate(["/login"]);
//       return new BehaviorSubject(null);
//     }
//   }

//   createTask(taskDetail: Taskmodel): Observable<any> {
//     const token = this.tokenStorageService.getToken();
//     if (token != null) {
//       const headerOptions = {
//         headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + token }),
//       }
//       return this.http.post(prefixAPI + 'create', taskDetail, headerOptions);
//     }
//     else {
//       this.route.navigate(["/login"]);
//       return new BehaviorSubject(null);
//     }
//   }

//   getUserList(): Observable<any> {
//     const token = this.tokenStorageService.getToken();
//     if (token != null) {
//       const headerOptions = {
//         headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": "Bearer " + token })
//       }
//       return this.http.get(prefixAPI + 'userlist', headerOptions);
//     } else {
//       this.route.navigate(["/login"]);
//       return new BehaviorSubject(null);
//     }
//   }

// }
