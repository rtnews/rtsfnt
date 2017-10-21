import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { HomeComponent } from './home/home.component';
import { NoticeComponent } from './notice/notice.component';
import { GlobalComponent } from './global/global.component';
import { NewsTmpComponent } from './newstmp/newstmp.component';
import { DepartComponent } from './depart/depart.component';
import { ClerksComponent } from './clerks/clerks.component';
import { DpartComponent } from './dpart/dpart.component';
import { OndutyComponent } from './onduty/onduty.component';

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
    path: 'newstmp',
    component: NewsTmpComponent
  },{
    path: 'depart',
    component: DepartComponent
  },{
    path: 'clerks',
    component: ClerksComponent
  },{
    path: 'dpart',
    component: DpartComponent
  },{
    path: 'onduty',
    component: OndutyComponent
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
  GlobalComponent,
  NewsTmpComponent,
  DepartComponent,
  ClerksComponent,
  DpartComponent,
  OndutyComponent
];
