import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../../../services/security/login.service';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./navbar/navbar.component";
import { MenuComponent } from "./menu/menu.component";

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, NavbarComponent, MenuComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit, OnDestroy {
  menuOpen = true;
  @ViewChild('menuRef') menuRef!: ElementRef;

  constructor(private router: Router) { }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {

  }

}
