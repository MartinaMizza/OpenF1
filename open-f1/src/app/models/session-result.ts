export interface SessionResult {
  position: number;
  driver_number: number;
  number_of_laps: number;
  points: number;
  dnf: boolean;        // Did Not Finish
  dns: boolean;        // Did Not Start
  dsq: boolean;        // Disqualified
  duration?: number;   // Durata in secondi (opzionale se non sempre presente)
  gap_to_leader?: number; // Gap dal leader in secondi (opzionale)
  meeting_key: number;
  session_key: number;
}