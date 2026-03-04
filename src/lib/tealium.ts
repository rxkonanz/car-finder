declare global {
  interface Window {
    utag?: {
      link: (data: Record<string, string>) => void;
      view: (data: Record<string, string>) => void;
    };
  }
}

export function utagLink(data: Record<string, string>): void {
  if (typeof window !== "undefined" && window.utag?.link) {
    window.utag.link(data);
  }
}
