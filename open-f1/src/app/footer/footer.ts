import { Component } from '@angular/core';
import { ThemeToggle } from "../components/theme-toggle/theme-toggle";

@Component({
  selector: 'app-footer',
  imports: [ThemeToggle],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

}
