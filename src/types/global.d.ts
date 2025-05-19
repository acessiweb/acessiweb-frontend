declare global {
  interface GuidelineType {
    id: string;
    name: string;
  }

  interface UrlParams {
    params?: Promise<{
      id: string;
    }>;
  }
}

export default global;
