// src/types/guide.ts
export interface GuideDescription {
    type: string;
    children: Array<{
      type: string;
      text?: string;
      children?: GuideDescription[];
    }>;
  }
  
  export interface Guide {
    id: number;
    title: string;
    animalType: string;
    description: GuideDescription[];
  }
  
  export interface GuidesPageProps {
    dict: {
      common: {
        loading: string;
        error: string;
      };
      guides: {
        title: string;
        subtitle: string;
        viewGuide: string;
      };
    };
    lang: string;
  }