import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromShoppingList from './store/shopping-list.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  public shoppingListState: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromShoppingList.AppState>) {
  }

  public ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  public onEdit(index: number) {
    this.store.dispatch(new ShoppingListActions.SetSelectedIngredient(index));
  }
}
