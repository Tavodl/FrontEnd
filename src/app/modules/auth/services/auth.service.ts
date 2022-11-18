import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize } from 'rxjs/operators';
import { UserModel } from '../models/user.model';
import { AuthModel } from '../models/auth.model';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export type UserType = UserModel | undefined;

@Injectable({
  providedIn: 'root',
})

export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/
  private authLocalStorageToken = 'SecretKeyToExample'
  //`${environment.appVersion}-${environment.USERDATA_KEY}`;
  private URL = environment.apiUrl

  // public fields
  currentUser$: Observable<UserType>;
  isLoading$: Observable<boolean>;
  currentUserSubject: BehaviorSubject<UserType>;
  isLoadingSubject: BehaviorSubject<boolean>;

  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserType) {
    this.currentUserSubject.next(user);
  }

  constructor(
    private router: Router,
    private HttpClient : HttpClient
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.currentUserSubject = new BehaviorSubject<UserType>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    this.isLoading$ = this.isLoadingSubject.asObservable();
    const subscr = this.getUserByToken().subscribe();
    //console.log('-------');
    console.log('aut services');
    
    console.log(subscr);
    this.unsubscribe.push(subscr);
  }

  // public methods

  login (username: string, password: string){
    //console.log(username, password)
    this.isLoadingSubject.next(true);
    //this.getUserByToken()
    let url = `${this.URL}/company/login`
    //let url = `http://localhost:3200/company/login`
    return this.HttpClient.post(url, {username, password})
    .pipe(
      map ((user : any )=>{  
        const auth = new AuthModel();
        
        auth.authToken = user['authToken'];
        //auth.refreshToken = user['refreshToken'];
        auth.expiresIn = new Date(Date.now() + 100 * 24 * 60 * 60 * 1000);
        console.log(auth);

        this.setAuthFromLocalStorage(auth);
        if (user) {
          this.currentUserSubject.next(user);
          return user;
        } else {
          this.logout();
        }
        
      }),
      switchMap(() => this.getUserByToken()),
      catchError((err) => {
        console.error('err', err);
        return of(undefined);
      }),      
      finalize(() => this.isLoadingSubject.next(false))
      )//End .pipe
  }


  logout() {
    localStorage.removeItem(this.authLocalStorageToken);
    localStorage.removeItem('TOKEN');
    this.router.navigate(['/auth/sesion'], {
      queryParams: {},
    });
  }

  getUserByToken(): Observable<UserType> {
    this.isLoadingSubject.next(true);
    return this.HttpClient.get<UserModel>(`${this.URL}/company/sesion/`)
    .pipe(
      map((user: UserType) => {
        if (user) {
          console.log('user en sesion');
          this.currentUserSubject.next(user);
        } else {
          this.logout();
        }
        return user;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  // need create new user then login
  registration(user: UserModel): Observable<any> {
    this.isLoadingSubject.next(true);
    console.log('No disponible');
    let url = `${this.URL}/company/companyTest`
   return this.HttpClient.get(url)
    .pipe(
      map ((resp : any )=>{  
        console.log(resp);
          return resp
      }),      
      finalize(() => this.isLoadingSubject.next(false))
      )//End .pipe
  }



  forgotPassword(email: string): Observable<boolean> {
    this.isLoadingSubject.next(true);
    
    console.log('No disponible');
    let url = `${this.URL}/company/companyTest`
   return this.HttpClient.get(url)
    .pipe(
      map ((resp : any )=>{  
        console.log(resp);
          return resp
      }),      
      finalize(() => this.isLoadingSubject.next(false))
      )//End .pipe


  }

  // private methods
  private setAuthFromLocalStorage(auth: AuthModel): boolean {
    // store auth authToken/refreshToken/epiresIn in local storage to keep user logged in between page refreshes
    // almacenar auth authToken/refreshToken/epiresIn en almacenamiento local para mantener al usuario conectado entre actualizaciones de página
    if (auth && auth.authToken) {
      //console.log('setAuthFromLocalStorage');
      localStorage.setItem(this.authLocalStorageToken, JSON.stringify(auth));
      localStorage.setItem('TOKEN', JSON.stringify(auth.authToken));
      return true;
    }
    return false;
  }

  private getAuthFromLocalStorage(): AuthModel | undefined {
    try {
      const lsValue = localStorage.getItem(this.authLocalStorageToken);
      if (!lsValue) {
        return undefined;
      }

      const authData = JSON.parse(lsValue);
      return authData;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }


   listaClientes(){
    this.isLoadingSubject.next(true);
    let url = `${this.URL}/company/getCompanies`
   return  this.HttpClient.get(url).pipe(
    map ((resp : any )=>{  
      console.log(resp);
        return resp
    }),      
    finalize(() => this.isLoadingSubject.next(false))
    )//End .pipe
  }


  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
