import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgUploaderModule } from 'ngx-uploader';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { NewsService } from '../../@core/data/news.service';
import { UploadComponent } from './upload/upload.component';
import { MDepartComponent } from './mdepart/mdepart.component';
import { MClerksComponent } from './mclerks/mclerks.component';

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
    MDepartComponent,
    MClerksComponent
],
  providers: [
    NewsService,
  ],
  entryComponents: [
    UploadComponent,
    MDepartComponent,
    MClerksComponent
  ],
})
export class TablesModule { }
