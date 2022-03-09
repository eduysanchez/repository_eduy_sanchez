import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  searchMovie(txtSearch: string){
    txtSearch = txtSearch.trim();

    if (txtSearch.length === 0) {
      return;
    }

    this.router.navigate(['/search', txtSearch]);
    
  }

}
