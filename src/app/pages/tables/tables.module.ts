import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgUploaderModule } from 'ngx-uploader';

import { ThemeModule } from '../../@theme/theme.module';
import { TablesRoutingModule, routedComponents } from './tables-routing.module';
import { SmartTableService } from '../../@core/data/smart-table.service';
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
    SmartTableService,
  ],
  entryComponents: [
    ModalComponent,
  ],
})
export class TablesModule { }
