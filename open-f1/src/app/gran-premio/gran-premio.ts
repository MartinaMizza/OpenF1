import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Openf1Service } from '../services/openf1-service';
import { Meeting } from '../models/meeting';
import { Session } from '../models/session'; 
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-gran-premio',
  imports: [DatePipe, CommonModule, SelectModule, FormsModule, TableModule],
  templateUrl: './gran-premio.html',
  styleUrl: './gran-premio.css'
})
export class GranPremio {
  private readonly route = inject(ActivatedRoute); // Iniettiamo ActivatedRoute per accedere ai parametri della rotta
  private readonly openf1Service = inject(Openf1Service); // Iniettiamo Openf1Service per accedere ai dati dell'API
  meeting: Meeting | undefined; // Variabile per memorizzare i dettagli del Gran Premio
  sessions: Session[] = []; // Variabile per memorizzare le sessioni del Gran Premio
  async ngOnInit() { // Metodo chiamato al caricamento del componente
    // Logica di inizializzazione del componente
    const meetingId = this.route.snapshot.paramMap.get('id'); // Otteniamo l'ID del Gran Premio dai parametri della rotta
    
    this.meeting = await this.openf1Service.getMeeting(Number(meetingId)); // Otteniamo i dettagli del Gran Premio dall'API
    console.log(this.meeting); // Logghiamo i dettagli del Gran Premio

    this.sessions = await this.openf1Service.getSessions(Number(meetingId)); // Otteniamo le sessioni del Gran Premio dall'API
    console.log(this.sessions); // Logghiamo le sessioni del Gran Premio
    setTimeout(() =>{
      this.sessions.forEach(async s => {
     const results = await this.openf1Service.getSessionsResults(s.session_key);
     s.results = results;
     console.log('Result for session', s.session_name, s.results);
    });
    }, 1000);
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

  // All'interno della classe GranPremio (file gran-premio.ts)

/**
 * Funzione sicura per ottenere l'URL della bandiera.
 * Gestisce 'undefined' e traduce i codici.
 */
getFlagCode(threeLetterCode: string | undefined): string {
  
  // 1. Gestisce 'undefined' o stringhe vuote (RISOLVE L'ERRORE)
  if (!threeLetterCode) {
    return ''; // Se il codice non esiste, non fare nulla
  }
  
  // 2. Traduce il codice da 3 lettere (es. "AUS") a 2 lettere (es. "au")
  //    (Usa la mappa definita nella classe)
  const twoLetterCode = this.countryCodeMap[threeLetterCode.toUpperCase()];
  
  // 3. Gestisce codici non trovati nella mappa
  if (!twoLetterCode) {
    console.warn(`Codice bandiera non trovato per: ${threeLetterCode}`);
    return ''; // O un'immagine di fallback
  }
  
  // 4. Chiama il servizio (che si aspetta il codice a 2 lettere)
  //    (Assumendo che la funzione nel servizio si chiami 'getFlag')
  return this.openf1Service.getFlag(twoLetterCode);
}

}
