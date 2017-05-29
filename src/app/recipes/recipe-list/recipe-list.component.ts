import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'Some recipe', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Alcohol-' +
      'Drink-Recipe-Cocktail-Cuba-Libre-Party-881004.jpg'),
    new Recipe('A Test Recipe', 'Some recipe', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Alcohol-' +
      'Drink-Recipe-Cocktail-Cuba-Libre-Party-881004.jpg')
  ];

  constructor() { }

  ngOnInit() {
  }

}
