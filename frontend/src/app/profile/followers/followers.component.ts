import { Component, Input, OnChanges } from '@angular/core';
import { UserWithFollows } from '../../common/types/user.type';
import { FollowsService } from '../../services/follows/follows.service';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-followers',
  standalone: true,
  imports: [CardModule],
  templateUrl: './followers.component.html',
  styleUrl: './followers.component.scss',
})
export class FollowersComponent implements OnChanges {
  @Input() userId!: number;
  userFollowers: UserWithFollows[] = [];
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
      console.log(this.userFollowers);
      
    });
  }
}
