import { Component, Input, OnChanges } from '@angular/core';
import { UserWithFollows } from '../../common/types/user.type';
import { FollowsService } from '../../services/follows/follows.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-following',
  standalone: true,
  imports: [CardModule],
  templateUrl: './following.component.html',
  styleUrl: './following.component.scss',
})
export class FollowingComponent implements OnChanges {
  @Input() userId!: number;
  userFollowing: UserWithFollows[] = [];
  constructor(private followService: FollowsService) {
    this.getUserFollowing();
  }

  ngOnChanges() {
    this.getUserFollowing();
  }

  getUserFollowing() {
    if (!this.userId) return;

    this.followService.getUserFollowing(this.userId).subscribe((res: any) => {
      this.userFollowing = res.data;
    });
  }
}
