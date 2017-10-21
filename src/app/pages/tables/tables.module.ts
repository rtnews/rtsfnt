import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgUploaderModule } from 'ngx-uploader';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { NewsService } from '../../@core/data/news.service';
import { UploadComponent } from './upload/upload.component';
import { DepartComponent } from './depart/depart.component';
import { ClerksComponent } from './clerks/clerks.component';
import { DpartComponent } from './dpart/dpart.component';
import { NewsTmpComponent } from './newstmp/newstmp.component';
import { MDepartComponent } from './mdepart/mdepart.component';
import { MClerksComponent } from './mclerks/mclerks.component';
import { OndutyComponent } from './onduty/onduty.component';

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NgUploaderModule
  ],
  declarations: [
    ...routedComponents,
    UploadComponent,
    DepartComponent,
    ClerksComponent,
    DpartComponent,
    NewsTmpComponent,
    MDepartComponent,
    MClerksComponent,
    OndutyComponent
],
  providers: [
    NewsService,
  ],
  entryComponents: [
    UploadComponent,
  ],
})
export class TablesModule { }
