import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://nlyfngpitxuqtczeqjaw.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_q0e5J5_yWRYl_KHS7U6HhA_zbTpGZdC';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Querying profiles matching c8236da6-a7a7-4bd3-b895-8485efc2df10...');
  const { data, error } = await supabase
    .from('profiles')
    .select('*');
  
  if (error) {
    console.error('Error fetching profiles:', error);
  } else {
    console.log('Total profiles:', data?.length);
    const specific = data?.find((p: any) => p.id === 'c8236da6-a7a7-4bd3-b895-8485efc2df10');
    console.log('Specific profile:', JSON.stringify(specific, null, 2));
    console.log('Roles list in profiles:');
    const roles = Array.from(new Set(data?.map((p: any) => p.role)));
    console.log(roles);
  }
}

run();
