import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { UserService } from './user.service';
import { BehaviorSubject, Observable } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  id: String = "";
  pwd: String = "";
  shipperid: String = "";
  body: Object;
  options: Object;


  private StationsData = new BehaviorSubject([]);
  stations$: Observable<any[]> = this.StationsData.asObservable();

  private AssetsData = new BehaviorSubject([]);
  assets$: Observable<any[]> = this.AssetsData.asObservable();

  private ActivitiesData = new BehaviorSubject([]);
  activities$: Observable<any[]> = this.ActivitiesData.asObservable();


  baseUrl = "https://isprojectbackend.herokuapp.com";

  constructor(private httpClient: HttpClient, private userService: UserService) {}



  createUserAuthorizationHeader(headers: HttpHeaders) {
    const currentUser = this.userService.getCurrentUser();
    return headers.append('Authorization', 'Basic ' + btoa(currentUser.userid+':'+currentUser.password)); 
  }

  createStation() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl + '/api/stations', this.body, {headers:headers})
  }

  createAsset() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl + '/api/assets', this.body, {headers:headers})
  }

  createActivity() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.post(this.baseUrl + '/api/activities', this.body, {headers:headers})
  }


  getAllUsers(){
    let headers = new HttpHeaders();

    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    // replace with this line to pass in the current user vs admin
    //headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/users/', {headers:headers});
  }

  getAllStations() {
    let headers = new HttpHeaders();
    //
    //  NOTE: an admin identity is needed to invoke this API since it calls the CA methods. 
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    // replace with this line to pass in the current user vs admin
    //headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/stations/', {headers:headers});
  }

  getAllAssets() {
    let headers = new HttpHeaders();
    //
    //  NOTE: an admin identity is needed to invoke this API since it calls the CA methods. 
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    // replace with this line to pass in the current user vs admin
    //headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/assets/', {headers:headers});
  }

  getAllActivities() {
    let headers = new HttpHeaders();
    //
    //  NOTE: an admin identity is needed to invoke this API since it calls the CA methods. 
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    // replace with this line to pass in the current user vs admin
    //headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/activities/', {headers:headers});
  }

  // This API is used during login to get the details of specific user trying to log in
  // The 'usertype' is retrieved to set the currentUser for this application
  getUser(){
    let headers = new HttpHeaders();
    //
    headers = headers.append('Authorization', 'Basic ' + btoa('admin:adminpw')); 
    // replace with this line to pass in the user trying to log in vs admin
    //headers = headers.append('Authorization', 'Basic ' + btoa(this.id+':'+this.pwd)); 
    return this.httpClient.get(this.baseUrl + '/api/users/'+ this.id, {headers:headers});
  }

  // This API checks to see if user credentials exist in Wallet
  isUserEnrolled(){
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    return this.httpClient.get(this.baseUrl + '/api/is-user-enrolled/' + this.id, {headers:headers});
  }

  

  queryStations() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    this.httpClient.get<any[]>(this.baseUrl + '/api/stations/', {headers:headers}).subscribe (stations => {
      console.log (stations);

      this.StationsData.next(stations);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting stations: " + error['error']['message']);
    })
  }

  queryAllAssets() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    this.httpClient.get<any[]>(this.baseUrl + '/api/assets/', {headers:headers}).subscribe (assets => {
      console.log (assets);

      this.AssetsData.next(assets);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting assets: " + error['error']['message']);
    })
  }

  queryAllActivities() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    this.httpClient.get<any[]>(this.baseUrl + '/api/activities/', {headers:headers}).subscribe (activities => {
      console.log (activities);

      this.ActivitiesData.next(activities);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting activities: " + error['error']['message']);
    })
  }

  queryAssetsFromStation() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    this.httpClient.get<any[]>(this.baseUrl + '/api/assets-station/' + this.id, {headers:headers}).subscribe (assets => {
      console.log (assets);
      this.AssetsData.next(assets);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting assets: " + error['error']['message']);
    })
  }
  
  //Zur Füllung eines dynamischen Observables
  queryActivityFromAsset() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    this.httpClient.get<any[]>(this.baseUrl + '/api/activities-asset/' + this.id, {headers:headers}).subscribe (activities => {
      console.log (activities);

      this.ActivitiesData.next(activities);
    }, error => {
      console.log(JSON.stringify(error));
      alert("Problem getting activities: " + error['error']['message']);
    })
  }

  //Zur Füllung des Arrays
  getActivityFromAsset() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);

    return this.httpClient.get(this.baseUrl + '/api/activities-asset/' + this.id, {headers:headers});
  }

  setQualitiy() {
    let headers = new HttpHeaders();
    headers = this.createUserAuthorizationHeader(headers);
    console.log(this.id);
    return this.httpClient.put(this.baseUrl + '/api/quality/' + this.id, {}, {headers:headers});
  }
}
