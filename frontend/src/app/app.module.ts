import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule}   from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';


import {AppComponent} from './app.component';
import {UsersApiService} from './users/users-api.service';
import {RecipesApiService} from './recipes/recipes-api.service';
import {RestrictionsApiService} from './restrictions/restrictions-api.service';

import {RecipeFormComponent} from './recipes/recipe-form.component';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './recipes/recipes.component';

import {RegisterFormComponent} from './users/register-form.component';
import {LoginFormComponent} from './users/login-form.component';

const appRoutes: Routes = [
  { path: 'new-recipe', component: RecipeFormComponent },
  { path: 'register', component: RegisterFormComponent },
  { path: 'login', component: LoginFormComponent },
  { path: '', component: RecipesComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    RecipeFormComponent,
    RecipesComponent,
    RegisterFormComponent,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
    ),
  ],
  providers: [UsersApiService, RecipesApiService, RestrictionsApiService],
  bootstrap: [AppComponent],  
})
export class AppModule {
    
}
