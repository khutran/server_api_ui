import { NotificationService } from './notification/notification.service';
import { PreloaderService } from './preloader/preloader.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilityService } from './utility/utility.service';

@NgModule({
  imports: [CommonModule],
  declarations: [],
  providers: [PreloaderService, NotificationService, UtilityService]
})
export class ServicesModule {}
