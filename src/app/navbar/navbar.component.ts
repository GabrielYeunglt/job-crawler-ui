import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WindowService } from '../services/window.service';

@Component({
    selector: 'app-navbar',
    imports: [CommonModule, RouterLink],
    templateUrl: './navbar.component.html',
    styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
    menuOpen = false;

    constructor(private windowService: WindowService) { }

    toggleMenu() {
        this.menuOpen = !this.menuOpen;
    }

    async openDevTools() {
        await this.windowService.openDevTools();
    }
}
