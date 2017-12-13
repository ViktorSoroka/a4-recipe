import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';

export interface AppState {
  shoppingList: State
}

interface State {
  ingredients: Ingredient[];
  editedIngredientIndex: number;
  editedIngredient: Ingredient;
}

const initialState = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredientIndex: -1,
  editedIngredient: null
};

export function shoppingListReducer(state = initialState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT: {
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    }
    case ShoppingListActions.ADD_INGREDIENTS: {
      return {
        ...state,
        ingredients: state.ingredients.concat(action.payload),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    }
    case ShoppingListActions.UPDATE_INGREDIENT: {
      return {
        ...state,
        ingredients: [
          ...state.ingredients.slice(0, state.editedIngredientIndex),
          action.ingredient,
          ...state.ingredients.slice(state.editedIngredientIndex + 1),
        ],
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    }
    case ShoppingListActions.DELETE_INGREDIENT: {
      return {
        ...state,
        ingredients: state.ingredients.filter((item, i) => i !== state.editedIngredientIndex),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    }
    case ShoppingListActions.SET_SELECTED_INGREDIENT: {
      const editedIngredient = action.payload === -1 ? null : { ...state.ingredients[action.payload] };

      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient
      }
    }
    default:
      return state;
  }
}
