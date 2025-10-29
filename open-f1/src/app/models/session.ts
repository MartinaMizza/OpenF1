import { SessionResult } from "./session-result";

export interface Session {
  meeting_key: number;
  session_key: number;
  location: string;
  date_start: string; // Puoi anche usare 'Date' se intendi convertirla
  date_end: string;   // Puoi anche usare 'Date'
  session_type: string;
  session_name: string;
  country_key: number;
  country_code: string;
  country_name: string;
  circuit_key: number;
  circuit_short_name: string;
  gmt_offset: string;
  year: number;
  results: SessionResult[];
}