import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipes.service';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  isEditMode = false;
  recipe: Recipe;
  id: number;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) {
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'] && JSON.parse(params['id']);
      this.isEditMode = this.id != null;

      if (this.isEditMode) {
        this.recipeService.fetchRecipeById(this.id).subscribe((recipe) => {
          this.recipe = recipe;
          this.initForm(this.recipe);
        });
      } else {
        this.initForm();
      }
    });
  }

  public initForm(recipe: Recipe = new Recipe('', '', '', [])) {
    const recipeIngredients = new FormArray([]);

    if (this.isEditMode) {
      if (recipe.ingredients) {
        recipe.ingredients.forEach((ingredient: Ingredient) => {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            }));
        });
      }
    }

    // todo: move strings to variables
    this.recipeForm = new FormGroup({
      'recipe-name': new FormControl(recipe.name, Validators.required),
      'image-path': new FormControl(recipe.imagePath, Validators.required),
      'recipe-description': new FormControl(recipe.description, Validators.required),
      'recipe-ingredients': recipeIngredients
    });
  }

  public onAddIngredient() {
    (<FormArray>this.recipeForm.get('recipe-ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  public onDeleteIngredient(idx: number) {
    (<FormArray>this.recipeForm.get('recipe-ingredients')).removeAt(idx);
  }

  public getControls() {
    return (<FormArray>this.recipeForm.get('recipe-ingredients')).controls;
  }

  public onSubmit() {
    const recipe = new Recipe(
      this.recipeForm.value['recipe-name'],
      this.recipeForm.value['recipe-description'],
      this.recipeForm.value['image-path'],
      this.recipeForm.value['recipe-ingredients']
    );

    if (this.isEditMode) {
      this.recipeService.updateRecipe(this.id, recipe);
    } else {
      this.recipeService.addRecipe(recipe);
    }

    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
