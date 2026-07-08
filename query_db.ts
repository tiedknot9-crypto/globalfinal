import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://nlyfngpitxuqtczeqjaw.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_q0e5J5_yWRYl_KHS7U6HhA_zbTpGZdC';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Inserting sample patient...');
  const mrn = 'MRN_TEST_' + Date.now();
  const dummy = {
    mrn,
    name: 'Test Patient',
    phone: '1234567890',
    gender: 'male'
  };
  
  const { data, error } = await supabase
    .from('patients')
    .insert([dummy])
    .select();
  
  if (error) {
    console.error('Error inserting patient:', error);
  } else {
    console.log('Patient successfully inserted. Columns:', Object.keys(data[0]));
    
    // Clean up
    const { error: delErr } = await supabase
      .from('patients')
      .delete()
      .eq('id', data[0].id);
    console.log('Clean up result:', delErr || 'Success');
  }
}

run();
