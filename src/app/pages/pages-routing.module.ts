import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { LayoutDefaultComponent } from '../layouts/default/default.component';

import { DashboardComponent } from './dashboard/dashboard.component';

import { HeaderComponent } from './dashboard/header/header.component';
import { SidebarComponent } from './dashboard/sidebar/sidebar.component';

import { TabTemplateComponent } from './dashboard/sidebar/tab-template/tab-template.component';
import { TabElementComponent } from './dashboard/sidebar/tab-element/tab-element.component';
import { TabIconComponent } from './dashboard/sidebar/tab-icon/tab-icon.component';
import { TabShapeComponent } from './dashboard/sidebar/tab-shape/tab-shape.component';
import { TabTextComponent } from './dashboard/sidebar/tab-text/tab-text.component';
import { TabDesignerComponent } from './dashboard/sidebar/tab-designer/tab-designer.component';

import { ColectionMaterialListComponent } from './dashboard/sidebar/@components/collection-material/collection.component';
import { ColectionTemplateListComponent } from './dashboard/sidebar/@components/collection-template/collection.component';

export const ENTRIES_COMPONENTS = [];

export const COMPONENTS = [
  DashboardComponent,
  HeaderComponent,
  SidebarComponent,
  TabElementComponent,
  TabIconComponent,
  TabShapeComponent,
  TabTextComponent,
  TabDesignerComponent,
  TabTemplateComponent,
  ColectionMaterialListComponent,
  ColectionTemplateListComponent,
];

const ROUTES: Routes = [];

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: '**',
        redirectTo: 'dashboard',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
