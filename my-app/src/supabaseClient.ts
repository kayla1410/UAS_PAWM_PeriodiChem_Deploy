import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://djdgkpwyolzhkflgkuhz.supabase.co'; 
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqZGdrcHd5b2x6aGtmbGdrdWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwNjA1MzMsImV4cCI6MjA1MjYzNjUzM30.5DBBmc9JrGeraEfc4X2opf66QNCvymOZR1syeDDe4oM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
