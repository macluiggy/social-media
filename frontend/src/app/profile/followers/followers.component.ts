import { Component, Input, OnChanges } from '@angular/core';
import { UserWithFollows } from '../../common/types/user.type';
import { FollowsService } from '../../services/follows/follows.service';
import { CardModule } from 'primeng/card';
import { DEFAULT_PROFILE_IMAGE } from '../../common/constants';
import { TableModule } from 'primeng/table';
import { FollowButtonComponent } from '../follow-button/follow-button.component';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [CardModule, TableModule, FollowButtonComponent],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss',
})
export class FollowersComponent implements OnChanges {
  @Input() userId!: number;
  userFollowers: UserWithFollows[] = [];
  defaultProfileImage = DEFAULT_PROFILE_IMAGE;
  constructor(private followService: FollowsService) {
    this.getUserFollowers();
  }

  ngOnChanges() {
    this.getUserFollowers();
  }

  getUserFollowers() {
    if (!this.userId) return;
    this.followService.getUserFollowers(this.userId).subscribe((res: any) => {
      this.userFollowers = res.data;
    });
  }
}
