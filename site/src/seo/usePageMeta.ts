import { useEffect } from 'react';

export type PageMeta = {
  title?: string;
  description?: string;
};

export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    if (meta.title) {
      document.title = meta.title;
    }
    if (meta.description) {
      let tag = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.name = 'description';
        document.head.appendChild(tag);
      }
      tag.content = meta.description;
    }
  }, [meta.title, meta.description]);
}

export default usePageMeta;
