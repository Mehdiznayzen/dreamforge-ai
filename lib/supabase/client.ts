import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const uploadImageToStorage = async (file: File) => {
  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabaseClient.storage
    .from("dreamForge_bucket")
    .upload(fileName, file);

  if (error) throw error;

  const { data: publicUrl } = supabaseClient.storage
    .from("dreamForge_bucket")
    .getPublicUrl(fileName);

  return publicUrl.publicUrl;
};