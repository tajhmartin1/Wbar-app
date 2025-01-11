import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://xhftgtthhrkntibtulbl.supabase.co";
const supabaseAnonKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoZnRndHRoaHJrbnRpYnR1bGJsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYyODYyMTYsImV4cCI6MjA1MTg2MjIxNn0.J8tv0W3KHwdxJjx0YAtMjXWkDuVtHkVslfMpVPH4s0A";

const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;
