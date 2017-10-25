import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgUploaderModule } from 'ngx-uploader';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { NewsService } from '../../@core/data/news.service';
import { UploadComponent } from './upload/upload.component';
import { MDepartComponent } from './mdepart/mdepart.component';
import { MClerksComponent } from './mclerks/mclerks.component';
import { MDpartComponent } from './mdpart/mdpart.component';

@NgModule({
  imports: [
    ThemeModule,
    FormsModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NgUploaderModule
  ],
  declarations: [
    ...routedComponents,
    UploadComponent,
    MDepartComponent,
    MClerksComponent,
    MDpartComponent
],
  providers: [
    NewsService,
  ],
  entryComponents: [
    UploadComponent,
    MDepartComponent,
    MClerksComponent,
	MDpartComponent
  ],
})
export class TablesModule { }
