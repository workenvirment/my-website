import React, { useEffect } from 'react';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

export interface SeoHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
  breadcrumbs?: BreadcrumbItem[];
  schemaData?: Record<string, any> | Record<string, any>[];
}

const BASE_URL = 'https://dgwsolutionllc.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/blue_semi_truck_sunset.jpg`;

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  noIndex = false,
  breadcrumbs,
  schemaData
}) => {
  useEffect(() => {
    // 1. Update Document Title
    document.title = title;

    // Helper to update or create meta tag
    const updateMetaTag = (selector: string, attrName: string, attrValue: string, contentValue: string) => {
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.content = contentValue;
    };

    // 2. Primary Meta Description & Title
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="title"]', 'name', 'title', title);

    // 3. Robots Indexing Directive
    if (noIndex) {
      updateMetaTag('meta[name="robots"]', 'name', 'robots', 'noindex, nofollow');
    } else {
      updateMetaTag(
        'meta[name="robots"]', 
        'name', 
        'robots', 
        'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
      );
    }

    // 4. Canonical Link (Cleaned of query parameters & hashes)
    const cleanPath = canonicalPath.split('?')[0].split('#')[0];
    const normalizedPath = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
    const fullCanonicalUrl = normalizedPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonicalUrl;

    // 5. Open Graph Meta Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonicalUrl);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);
    updateMetaTag('meta[property="og:site_name"]', 'property', 'og:site_name', 'DGW Solutions LLC');
    updateMetaTag('meta[property="og:locale"]', 'property', 'og:locale', 'en_US');

    // 6. Twitter / X Meta Tags
    updateMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image');
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', fullCanonicalUrl);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 7. Breadcrumbs JSON-LD Schema
    const breadcrumbSchemaId = 'seo-breadcrumb-schema';
    let breadcrumbScript = document.getElementById(breadcrumbSchemaId) as HTMLScriptElement | null;

    if (breadcrumbs && breadcrumbs.length > 0) {
      const itemListElement = breadcrumbs.map((crumb, index) => {
        const crumbClean = crumb.path.split('?')[0].split('#')[0];
        const crumbPath = crumbClean.startsWith('/') ? crumbClean : `/${crumbClean}`;
        const itemUrl = crumbPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${crumbPath}`;
        return {
          '@type': 'ListItem',
          position: index + 1,
          name: crumb.name,
          item: itemUrl
        };
      });

      const breadcrumbData = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement
      };

      if (!breadcrumbScript) {
        breadcrumbScript = document.createElement('script');
        breadcrumbScript.id = breadcrumbSchemaId;
        breadcrumbScript.type = 'application/ld+json';
        document.head.appendChild(breadcrumbScript);
      }
      breadcrumbScript.text = JSON.stringify(breadcrumbData);
    } else if (breadcrumbScript) {
      breadcrumbScript.remove();
    }

    // 8. Custom Page-Level JSON-LD Schema (e.g. FAQPage, Service)
    const pageSchemaId = 'seo-page-schema';
    let pageScript = document.getElementById(pageSchemaId) as HTMLScriptElement | null;

    if (schemaData) {
      const formattedSchema = Array.isArray(schemaData)
        ? {
            '@context': 'https://schema.org',
            '@graph': schemaData
          }
        : {
            '@context': 'https://schema.org',
            ...schemaData
          };

      if (!pageScript) {
        pageScript = document.createElement('script');
        pageScript.id = pageSchemaId;
        pageScript.type = 'application/ld+json';
        document.head.appendChild(pageScript);
      }
      pageScript.text = JSON.stringify(formattedSchema);
    } else if (pageScript) {
      pageScript.remove();
    }
  }, [title, description, canonicalPath, ogType, ogImage, noIndex, breadcrumbs, schemaData]);

  return null;
};
