import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Router} from "@angular/router";

import {Recipe} from './recipe.model';
import {RecipesApiService} from './recipes-api.service';
import {UsersApiService} from '../users/users-api.service';

import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'recipes',
  templateUrl: `./recipes.component.html`
})
export class RecipesComponent implements OnInit{
  constructor(private recipesApi: RecipesApiService, 
              private usersApi: UsersApiService, 
              private router: Router,
              private sanitizer: DomSanitizer) { }
  
  recipesList = []

  ngOnInit(){
    if (!this.usersApi.loggedIn()){
      this.router.navigate(['/login'])
    }
    else{
      this.getRecipes();
    }
  }

  getRecipes() {
    this.recipesApi
      .getRecipes()
      .subscribe(
        result => {
          this.recipesList = result;
          for (let recipe of this.recipesList){
            recipe['url'] = this.sanitizer.bypassSecurityTrustUrl(recipe.url);
            recipe['imgsrc'] = this.sanitizer.bypassSecurityTrustStyle(`url(${recipe.imgsrc})`);
            console.log(this.recipesList)
          }
        },
        error => console.log('error')
      );
  }

  leakCredentials() {
    console.log(localStorage.getItem("id_token"));
  }

  sendDummy(){
    this.recipesApi
      .sendDummy()
      .subscribe(
        result => console.log('result'),
        error => console.log('result') 
      );
  }

  loggedIn(){
    console.log(this.usersApi.loggedIn())
  }

  externalLink(url){
    this.router.navigateByUrl(url);
  }
}