import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables.component';
import { NewsBoardComponent } from './news-board/news-board.component';
import { NoticesComponent } from './notices/notices.component';
import { WnewsComponent } from './wnews/wnews.component';

const routes: Routes = [{
  path: '',
  component: TablesComponent,
  children: [{
    path: 'newsboard',
    component: NewsBoardComponent
  },{
    path: 'notices',
    component: NoticesComponent
  },{
    path: 'wnews',
    component: WnewsComponent
  },{
    path: '',
    redirectTo: 'newsboard',
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
  NewsBoardComponent,
  NoticesComponent,
  WnewsComponent
];
