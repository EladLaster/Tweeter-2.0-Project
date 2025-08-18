import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fdnztqedflidivqejexn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbnp0cWVkZmxpZGl2cWVqZXhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MTgyNjEsImV4cCI6MjA3MDk5NDI2MX0.nqNbjdog3ys_Ud10G_stXghGxS09HRjwjK2shVJt8-Y'

export const supabase = createClient(supabaseUrl, supabaseKey)
