import { Component, inject } from '@angular/core';
import { Openf1Service } from '../services/openf1-service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { Meeting } from '../models/meeting';
import { DatePipe } from '@angular/common';
import { Year } from '../models/year';

@Component({
  selector: 'app-gran-premi',
  imports: [SelectModule, FormsModule, DatePipe],
  templateUrl: './gran-premi.html',
  styleUrl: './gran-premi.css'
})
export class GranPremi {
  private readonly openf1Service = inject(Openf1Service);
  years: Year [] = [];
  selectedYear = { name: new Date().getFullYear().toString(), code: new Date().getFullYear() };
  meetings: Meeting[] = [];
  async ngOnInit() {
    // verrà eseguito al caricamento del componente nella pagina
    // se utilizzo await, la funzione deve essere async
    this.loadYears();
    this.loadMeetings();
  }

  async loadMeetings() {
    this.meetings = await this.openf1Service.getMeetings(this.selectedYear.code); 
  }

  loadYears() {
    let currentYear = new Date().getFullYear();
    const minYear = 2023; // Anno minimo per le gare di F1
    while (currentYear >= minYear) {
      this.years.push({ name: currentYear.toString(), code: currentYear });
      currentYear--;
    }
  }

  countryCodeMap: { [key: string]: string } = {
    'BRN': 'bh', // Bahrain
    'AUS': 'au', // Australia
    'KSA': 'sa', // Saudi Arabia
    'JPN': 'jp', // Japan
    'CHN': 'cn', // China
    'MIA': 'us', // Miami
    'EMI': 'it', // Emilia Romagna
    'MON': 'mc', // Monaco
    'CAN': 'ca', // Canada
    'ESP': 'es', // Spain
    'AUT': 'at', // Austria
    'GBR': 'gb', // Great Britain
    'HUN': 'hu', // Hungary
    'BEL': 'be', // Belgium
    'NED': 'nl', // Netherlands
    'ITA': 'it', // Italy
    'AZE': 'az', // Azerbaijan
    'SGP': 'sg', // Singapore
    'USA': 'us', // USA (Austin)
    'MEX': 'mx', // Mexico
    'BRA': 'br', // Brazil
    'LAS': 'us', // Las Vegas
    'QAT': 'qa', // Qatar
    'UAE': 'ae', // Abu Dhabi (United Arab Emirates)
  };

  getFlagCode(code: string): string {
    // Gestisce sia "AUS" (dall'API) che "Aus" (come nel tuo screenshot)
    return this.countryCodeMap[code.toUpperCase()] || 'xx'; // 'xx' è un fallback
  }
}