import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Retrieve credentials from environment variables or custom runtime configuration
export function getSupabaseCredentials() {
  const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

  const localUrl = localStorage.getItem('pixulinhos_supabase_url') || '';
  const localKey = localStorage.getItem('pixulinhos_supabase_key') || '';

  return {
    url: localUrl || envUrl,
    key: localKey || envKey,
  };
}

export function isSupabaseConfigured(): boolean {
  const { url, key } = getSupabaseCredentials();
  return Boolean(url && key);
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const { url, key } = getSupabaseCredentials();
  
  if (!url || !key) {
    return null;
  }

  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, key);
    } catch (err) {
      console.error('Failed to initialize Supabase client:', err);
      return null;
    }
  }

  return supabaseInstance;
}

export function saveSupabaseCredentials(url: string, key: string) {
  if (url) localStorage.setItem('pixulinhos_supabase_url', url.trim());
  else localStorage.removeItem('pixulinhos_supabase_url');

  if (key) localStorage.setItem('pixulinhos_supabase_key', key.trim());
  else localStorage.removeItem('pixulinhos_supabase_key');

  supabaseInstance = null; // reset instance
}

/**
 * Uploads a file to Supabase Storage bucket.
 * Returns public URL on success, or fallback data URL/placeholder on failure or if offline.
 */
export async function uploadToStorage(
  file: File,
  bucketName: string = 'pixulinhos-media'
): Promise<string> {
  const supabase = getSupabase();

  if (!supabase) {
    // Local fallback: convert file to Base64 or Object URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.warn('Supabase storage upload error, falling back to FileReader:', error.message);
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(file);
      });
    }

    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (e) {
    console.error('Upload exception:', e);
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
}
