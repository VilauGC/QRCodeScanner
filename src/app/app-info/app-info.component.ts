import { ChangeDetectionStrategy, Component, Input, OnInit, VERSION } from '@angular/core';

@Component({
  selector: 'app-app-info',
  templateUrl: './app-info.component.html',
  styleUrls: ['./app-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppInfoComponent implements OnInit {

  ngVersion = VERSION.full;

  ngOnInit(): void {
      
  }

  @Input()
  hasDevices: boolean = false;

  @Input()
  hasPermission: boolean = false;

  stateToEmoji(state: boolean): string {

    const states = {
      // not checked
      undefined: '❔',
      // failed to check
      null: '⭕',
      // success
      true: '✔',
      // can't touch that
      false: '❌'
    };

    return states[('' + state) as keyof typeof states];
  }

}
