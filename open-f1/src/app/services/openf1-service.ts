import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Meeting } from '../models/meeting';
import { firstValueFrom } from 'rxjs';
import { Session } from '../models/session';

@Injectable({
  providedIn: 'root'
})
export class Openf1Service {
  private readonly http = inject(HttpClient); // Iniettiamo HttpClient per fare richieste HTTP
  private readonly baseUrl = 'https://api.openf1.org/v1'; // URL base dell'API OpenF1
  private readonly flagUrl = 'https://flagcdn.com/w40/';

  async getMeetings(year: number): Promise<Meeting[]> {
    const response = this.http.get<Meeting[]>(`${this.baseUrl}/meetings?year=${year}`); 
      return firstValueFrom(response);
  }

  async getMeeting(meetingKey: number): Promise<Meeting> {
    const response = this.http.get<Meeting[]>(`${this.baseUrl}/meetings?meeting_key=${meetingKey}`); 
    const meetings = await firstValueFrom(response); 
    return meetings[0];
  }
  
  async getSessions(meetingKey: number): Promise<Session[]> {
    const response = this.http.get<Session[]>(`${this.baseUrl}/meetings?meeting_key=${meetingKey}`); 
      return firstValueFrom(response);
  }

  getFlag(countryCode: string): string {
    return `${this.flagUrl}${countryCode}.png`;
  }
}
