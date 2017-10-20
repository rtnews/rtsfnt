import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgUploaderModule } from 'ngx-uploader';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { NewsService } from '../../@core/data/news.service';
import { ModalComponent } from './modal/modal.component';

@NgModule({
  imports: [
    ThemeModule,
    TablesRoutingModule,
    Ng2SmartTableModule,
    NgUploaderModule
  ],
  declarations: [
    ...routedComponents,
    ModalComponent,
  ],
  providers: [
    NewsService,
  ],
  entryComponents: [
    ModalComponent,
  ],
})
export class TablesModule { }
