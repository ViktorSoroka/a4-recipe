import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


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
              private router: Router) {
  }

  public ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = JSON.parse(params['id']);
      this.recipeService.fetchRecipeById(this.id).subscribe((recipe) => {
        this.recipe = recipe;
      });
    });
  }

  public onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  public onDelete() {
    this.recipeService.deleteRecipe(this.id).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
