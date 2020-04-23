import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { environment } from '@env/environment';
@Component({
  selector: 'app-m-user',
  templateUrl: './m-user.component.html',
  styleUrls: ['./m-user.component.scss']
})
export class MUserComponent implements OnChanges {
  @Input() user: any;

  avatar: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.avatar = this.getAvatar(this.user.avatar);
    }
  }

  getAvatar(pathImage) {
    return environment.apiUrl + pathImage;
  }
}
