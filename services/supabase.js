
import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://nrabefoerhthkecxprvm.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5yYWJlZm9lcmh0aGtlY3hwcnZtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDAzMDM1NjMsImV4cCI6MjA1NTg3OTU2M30.80TqL0gL8DMAmkAYRJX3aO52uxkyUm1vinOvZ6VCg0E";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;