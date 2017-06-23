import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';


const routes: Routes = [
  {
    path: '',
    component: ShoppingListComponent
  }
];

export const ShoppingListRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
