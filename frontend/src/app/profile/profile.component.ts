import { Component, OnInit } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  userId: string;

  constructor(
    private storageService: StorageService,
    private activatedRoute: ActivatedRoute
  ) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }
}
