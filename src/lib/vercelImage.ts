const LOCAL_HOSTS = new Set(['localhost', '127.0.0.1', '[::1]']);

const isLocalPreview = () =>
  typeof window !== 'undefined' && LOCAL_HOSTS.has(window.location.hostname);

export const getOptimizedImageUrl = (
  src: string,
  width: number,
  quality = 75
) => {
  if (isLocalPreview()) {
    return src;
  }

  return `/_vercel/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality}`;
};

export const getOptimizedSrcSet = (
  src: string,
  widths: number[],
  quality = 75
) => {
  if (isLocalPreview()) {
    return undefined;
  }

  return [...new Set(widths)]
    .sort((a, b) => a - b)
    .map(width => `${getOptimizedImageUrl(src, width, quality)} ${width}w`)
    .join(', ');
};
