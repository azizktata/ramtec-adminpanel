export const optimizeCloudinaryUrl = (url: string) => {
  if (!url.includes("/upload/")) return url;
  return url.replace("/upload/", "/upload/f_auto,q_auto,c_limit,w_800/");
};
