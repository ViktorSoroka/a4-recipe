import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('f') ingredientForm: NgForm;
  isEditMode = false;
  editItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) {
  }

  public ngOnInit() {
    this.store.select('shoppingList').subscribe((state) => {
      if (state.editedIngredientIndex > -1) {
        this.isEditMode = true;
        this.editItem = state.editedIngredient;
        this.ingredientForm.setValue({
          name: this.editItem.name,
          amount: this.editItem.amount
        });
      }
    });
  }

  public onSubmit() {
    const {name, amount} = this.ingredientForm.value;
    const ingredient = new Ingredient(name, amount);

    if (this.isEditMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    }

    this.onClear();
  }

  public onDelete() {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  public onClear() {
    this.ingredientForm.reset();
    this.isEditMode = false;
    this.editItem = null;
  }

  public ngOnDestroy() {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(-1));
  }
}
