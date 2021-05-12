import { Injectable } from '@angular/core';

const TOKEN_SESSION_KEY = "auth-token";
const USER_SESSION_KEY = "auth-user";

@Injectable({
  providedIn: 'root'
})
export class TokenstorageService {

  constructor() { }

  logout(): void{
    window.sessionStorage.clear();
  }

  public storeToken(token: string): void{
    window.sessionStorage.removeItem(TOKEN_SESSION_KEY);
    window.sessionStorage.setItem(TOKEN_SESSION_KEY, token);
  }

  public getToken(): string | null{
    return window.sessionStorage.getItem(TOKEN_SESSION_KEY);
  }

  public storeUser(user: any){
    window.sessionStorage.removeItem(USER_SESSION_KEY);
    window.sessionStorage.setItem(USER_SESSION_KEY, user);
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_SESSION_KEY);
    if (user){
      return JSON.parse(user);
    }
    return {};
  }

}
