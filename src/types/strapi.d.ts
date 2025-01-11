// src/types/strapi.d.ts
export interface StrapiResponse {
    data: any[];
    meta: {
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  }