import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Recipe} from './recipe.model';
import {RecipesApiService} from './recipes-api.service';

@Component({
  selector: 'recipes',
  template: `
    <div>
      <button routerLink="/new-recipe">New Recipe</button>
      <button routerLink="/register">Register</button>
      <ul>
        <li *ngFor="let recipe of recipesList">
          {{recipe.title}}
        </li>
      </ul>
    </div>
  `
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipesListSubs: Subscription;
  recipesList: Recipe[];

  constructor(private recipesApi: RecipesApiService) {
  }

  ngOnInit() {
    this.recipesListSubs = this.recipesApi
      .getRecipes()
      .subscribe(res => {
          this.recipesList = res;
        },
        console.error
      );
  }

  ngOnDestroy() {
    this.recipesListSubs.unsubscribe();
  }
}