import { ModuleWithProviders } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {
    path: 'shopping-list',
    loadChildren: 'app/shopping-list/shopping-list.module#ShoppingListModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'recipes',
    loadChildren: 'app/recipes/recipes.module#RecipeModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/recipes'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  },
];

export const AppRoutingModule = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules
});
