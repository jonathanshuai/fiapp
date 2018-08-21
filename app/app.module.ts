import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {UsersApiService} from './users/users-api.service';
import {RecipesApiService} from './recipes/recipes-api.service';
import {RestrictionsApiService} from './restrictions/restrictions-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [UsersApiService, RecipesApiService, RestrictionsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
    
}
