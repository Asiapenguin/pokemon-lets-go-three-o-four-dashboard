import { Component, OnInit } from '@angular/core';
import { MoveAcrossLogService } from 'src/app/services/move-across-log.service';
import { ListResponse } from 'src/app/services/resource.service';
import { MoveAcrossLog } from 'src/app/models/moveAcrossLog';
import { HealLog } from 'src/app/models/healLog';
import { SellLog } from 'src/app/models/sellLog';
import { CatchLog } from 'src/app/models/catchLog';
import { UseLog } from 'src/app/models/useLog';
import { HealLogService } from 'src/app/services/heal-log.service';
import { UseLogService } from 'src/app/services/use-log.service';
import { CatchLogService } from 'src/app/services/catch-log.service';
import { SellLogService } from 'src/app/services/sell-log.service';

@Component({
  selector: 'app-log-activity-page',
  templateUrl: './log-activity-page.component.html',
  styleUrls: ['./log-activity-page.component.scss']
})
export class LogActivityPageComponent implements OnInit {

  moveAcrossLogs: MoveAcrossLog[] = [];
  healLogs: HealLog[] = [];
  sellLogs: SellLog[] = [];
  catchLogs: CatchLog[] = [];
  useLogs: UseLog[] = [];

  constructor(
    private moveAcrossLogService: MoveAcrossLogService,
    private healLogService: HealLogService,
    private sellLogService: SellLogService,
    private catchLogService: CatchLogService,
    private useLogService: UseLogService
  ) { }

  ngOnInit() {
    this.moveAcrossLogService.findAll().get().then((data: ListResponse<MoveAcrossLog>) => {
      this.moveAcrossLogs = data.data;
    });
    this.healLogService.findAll().get().then((data: ListResponse<HealLog>) => {
      this.healLogs = data.data;
    });
    this.sellLogService.findAll().get().then((data: ListResponse<SellLog>) => {
      this.sellLogs = data.data;
    });
    this.catchLogService.findAll().get().then((data: ListResponse<CatchLog>) => {
      this.catchLogs = data.data;
    });
    this.useLogService.findAll().get().then((data: ListResponse<UseLog>) => {
      this.useLogs = data.data;
    })
  }

}
