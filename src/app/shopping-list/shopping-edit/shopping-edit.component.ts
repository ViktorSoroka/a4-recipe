import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef;
  @ViewChild('f') ingredientForm: NgForm;
  editSubscription: Subscription;
  isEditMode = false;
  editItem: Ingredient;
  editItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.editSubscription = this.shoppingListService.editingStarted.subscribe((index) => {
      this.isEditMode = true;
      this.editItemIndex = index;
      this.editItem = this.shoppingListService.getIngredientByIndex(index);
      this.ingredientForm.setValue({
        name: this.editItem.name,
        amount: this.editItem.amount
      });
    });
  }

  onSubmit() {
    const {name, amount} = this.ingredientForm.value;
    const ingredient = new Ingredient(name, amount);

    if (this.isEditMode) {
      this.shoppingListService.updateItemById(this.editItemIndex, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);
    }

    this.onClear();
  }

  onDelete() {
    this.shoppingListService.deleteItemById(this.editItemIndex);
    this.onClear();
  }

  onClear() {
    this.ingredientForm.reset();
    this.isEditMode = false;
    this.editItemIndex = null;
    this.editItem = null;
  }

  ngOnDestroy() {
    this.editSubscription.unsubscribe();
  }
}
