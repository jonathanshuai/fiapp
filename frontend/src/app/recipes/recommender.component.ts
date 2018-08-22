import {Component, Renderer, ElementRef, ViewChild, OnInit} from '@angular/core';
import {RequestOptions, Request, RequestMethod} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Router} from "@angular/router";

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';

import {UsersApiService} from '../users/users-api.service';
import {RecipesApiService} from "./recipes-api.service";

@Component({
  selector: 'recommender',
  templateUrl: './recommender.component.html',  
  styleUrls: ['../app.component.css']
})
export class RecommenderComponent implements OnInit{
 @ViewChild('uploadFile') uploadFile: ElementRef;

 constructor(private recipesApi: RecipesApiService, 
              private usersApi: UsersApiService, 
              private router: Router,
              private renderer: Renderer) { }

  ngOnInit(){
    if (!this.usersApi.loggedIn()){
      this.router.navigate(['/login'])
    }
  }

  showImageBrowseDlg() {
    this.uploadFile.nativeElement.click();
  }

  fileChange(event) {
      let fileList: FileList = event.target.files;
      
      if (fileList.length > 0) {
          let file: File = fileList[0];
          let formData: FormData = new FormData();
          formData.append('uploadFile', file, file.name);
          let headers = new Headers();
          /** In Angular 5, including the header Content-Type can invalidate your request */
          headers.append('Content-Type', 'multipart/form-data');
          headers.append('Accept', 'application/json');
          
          let options = new RequestOptions({ headers: headers });
          
          console.log(formData);
          console.log(options);

          this.recipesApi
            .getSuggestions(formData, options)
            .subscribe(
              result => console.log(result),
              error => console.log('error')
            );
          
          // this.http.post(`${this.apiEndPoint}`, formData, options)
          //     .map(res => res.json())
          //     .catch(error => Observable.throw(error))
          //     .subscribe(
          //         data => console.log('success'),
          //         error => console.log(error)
          //     )
      }
  }


}