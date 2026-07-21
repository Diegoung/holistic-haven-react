import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yzdahaabjghseosuhvzu.supabase.co'; 
const supabaseAnonKey = 'sb_publishable_zToT-5b9ECcjQYSV9gS_dA_JkODhIwf'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);