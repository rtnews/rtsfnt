import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { HomeComponent } from './home/home.component';
import { NoticeComponent } from './notice/notice.component';
import { GlobalComponent } from './global/global.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [{
    path: 'home',
    component: HomeComponent
  },{
    path: 'notice',
    component: NoticeComponent
  },{
    path: 'global',
    component: GlobalComponent
  },{
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TablesRoutingModule { }

export const routedComponents = [
  TablesComponent,
  HomeComponent,
  NoticeComponent,
  GlobalComponent
];
