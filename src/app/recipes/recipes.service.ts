import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient, HttpParams } from '@angular/common/http';

import 'rxjs/Rx';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class RecipeService {
  private url = 'https://ng-recipe-983de.firebaseio.com/recipes';
  public recipesChanged = new Subject();
  private recipes: Recipe[];

  constructor(private http: HttpClient,
              private shoppingListService: ShoppingListService,
              private authService: AuthService) {
  }

  public saveRecipes(): Observable<any> {
    return this.http.put(`${this.url}.json`, this.getRecipes());
  }

  public fetchRecipes() {
    return this.http.get<Recipe[]>(`${this.url}.json`)
      .map((recipes) => recipes ? recipes.map((item) => {
        item.ingredients = item.ingredients || [];

        return item;
      }) : [])
      .subscribe((recipes: Recipe[]) => {
        this.setRecipes(recipes);
      });
  }

  public getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  private setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }

  public addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  public addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  public updateRecipe(idx: number, recipe: Recipe) {
    this.recipes[idx] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  public fetchRecipeById(id) {
    return this.http.get(`${this.url}/${id}.json`);
  }

  public deleteRecipe(id) {
    return this.http.delete(`${this.url}/${id}.json`).do(() => {
      this.recipes.splice(id, 1);
      this.recipesChanged.next(this.getRecipes());
    });
  }
}
