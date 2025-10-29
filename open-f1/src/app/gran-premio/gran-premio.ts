import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Openf1Service } from '../services/openf1-service';
import { Meeting } from '../models/meeting';
import { Session } from '../models/session'; 
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-gran-premio',
  imports: [],
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
  }

  

}
