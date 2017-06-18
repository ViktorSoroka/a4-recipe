import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';


@Injectable()
export class ShoppingListService {
  public ingredientChanged = new Subject<Ingredient[]>();
  public editingStarted = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  constructor() {
  }

  public getIngredients(): Ingredient[] {
    return this.ingredients.slice(0);
  }

  public getIngredientByIndex(index: number): Ingredient {
    return this.ingredients[index];
  }

  public addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.getIngredients());
  }

  public addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.getIngredients());
  }

  public updateItemById(id: number, item: Ingredient) {
    this.ingredients[id] = item;
    this.ingredientChanged.next(this.getIngredients());
  }

  public deleteItemById(editItemIndex: number) {
    this.ingredients.splice(editItemIndex, 1);
    this.ingredientChanged.next(this.getIngredients());
  }
}
