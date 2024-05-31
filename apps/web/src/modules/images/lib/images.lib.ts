export const getImagePublicUrl = (bucket: string, path: string): string => {
  return `${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL!}/storage/v1/object/public/${bucket}/${path}`;
};
