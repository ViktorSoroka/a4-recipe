import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';


@Component({
  selector: 'app-header',
  styleUrls: ['header.component.css'],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private recipeService: RecipeService, private authService: AuthService) {
  }

  public get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  public onSave() {
    this.recipeService.saveRecipes().subscribe(() => {
    });
  }

  public onFetch() {
    this.recipeService.fetchRecipes();
  }

  public onSignout() {
    this.authService.signoutUser();
  }
}
