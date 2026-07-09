import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://nlyfngpitxuqtczeqjaw.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_q0e5J5_yWRYl_KHS7U6HhA_zbTpGZdC';

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Querying expenses matching description chemical or amount 5000...');
  const { data, error } = await supabase
    .from('expenses')
    .select('*');
  
  if (error) {
    console.error('Error fetching expenses:', error);
  } else {
    const matched = data?.filter((e: any) => 
      (e.description && e.description.toLowerCase().includes('chemical')) || 
      (e.category && e.category.toLowerCase().includes('chemical')) ||
      e.amount === 5000
    );
    console.log('Matched', matched?.length, 'expenses.');
    console.log(JSON.stringify(matched, null, 2));
  }
}

run();
