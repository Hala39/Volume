import { UserService } from './../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.scss']
})
export class VerifiedComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private router: Router,
    private userService: UserService) { }

  pending = true;
  failed = false;
  visible = true;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.userService.verifyEmail(params.token, params.email).subscribe(response => {
        this.pending = false;
        this.router.navigateByUrl('/register/2');
      }, error => {
        this.pending = false;
        this.failed = true;
      }
      )
    })
  }

}
