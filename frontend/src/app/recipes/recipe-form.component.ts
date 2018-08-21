import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipesApiService} from "./recipes-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'recipe-form',
  template: `
    <div>
      <h2>New Recipe</h2>
      <label for="recipe-title">Title</label>
      <input id="recipe-title" (keyup)="updateTitle($event)">
      <label for="recipe-url">URL</label>
      <input id="recipe-url" (keyup)="updateUrl($event)">
      <label for="recipe-imgsrc">Imgsrc</label>
      <input id="recipe-imgsrc" (keyup)="updateImgsrc($event)">
      <label for="recipe-userid">userid</label>
      <input id="recipe-userid" (keyup)="updateUserid($event)">
      <button (click)="saveRecipe()">Save Recipe</button>
    </div>
  `
})
export class RecipeFormComponent {
  recipe = {
    title: '',
    url: '',
    imgsrc: '',
    userid: 0,
  };

  constructor(private recipesApi: RecipesApiService, private router: Router) { }

  updateTitle(event: any) {
    this.recipe.title = event.target.value;
  }

  updateUrl(event: any) {
    this.recipe.url = event.target.value;
  }

  updateImgsrc(event: any) {
    this.recipe.imgsrc = event.target.value;
  }

  updateUserid(event: any) {
    this.recipe.userid = event.target.value;
  }


  saveRecipe() {
    this.recipesApi
      .saveRecipe(this.recipe)
      .subscribe(
        () => this.router.navigate(['/']),
        error => alert(error.message)
      );
  }
}
