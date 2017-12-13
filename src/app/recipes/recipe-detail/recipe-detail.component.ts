import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipes.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromShoppingList from './../../shopping-list/store/shopping-list.reducer';


@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromShoppingList.AppState>) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = JSON.parse(params['id']);
      this.recipeService.fetchRecipeById(this.id).subscribe((recipe: Recipe) => {
        this.recipe = recipe;
      });
    });
  }

  public onAddToShoppingList() {
    const { ingredients } = this.recipe;
    if (!ingredients.length) {
      return;
    }
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  public onDelete() {
    this.recipeService.deleteRecipe(this.id).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
