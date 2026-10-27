
const SUPABASE_URL = "https://qjsvwczsbyzcvkxawbdf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_HsGIWc9KoLI2Gh9tn8161w_4AH8F1ma";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

async function testSupabaseConnection() {
  const { data, error } = await supabaseClient
    .from("products")
    .select("*");

  if (error) {
    console.error("Supabase connection failed:", error.message);
    return;
  }

  console.log("Supabase connected! Products:", data);
}

testSupabaseConnection();