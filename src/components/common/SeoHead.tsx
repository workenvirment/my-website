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
  breadcrumbs?: BreadcrumbItem[];
}

const BASE_URL = 'https://dgwsolutionllc.com';
const DEFAULT_IMAGE = `${BASE_URL}/images/blue_semi_truck_sunset.jpg`;

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage = DEFAULT_IMAGE,
  breadcrumbs
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

    // 2. Primary Meta Description
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    updateMetaTag('meta[name="title"]', 'name', 'title', title);

    // 3. Canonical Link
    const normalizedPath = canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`;
    const fullCanonicalUrl = normalizedPath === '/' ? `${BASE_URL}/` : `${BASE_URL}${normalizedPath}`;
    
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = fullCanonicalUrl;

    // 4. Open Graph Meta Tags
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonicalUrl);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', ogImage);

    // 5. Twitter Meta Tags
    updateMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    updateMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    updateMetaTag('meta[name="twitter:url"]', 'name', 'twitter:url', fullCanonicalUrl);
    updateMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', ogImage);

    // 6. Optional Breadcrumbs JSON-LD Schema
    const breadcrumbSchemaId = 'seo-breadcrumb-schema';
    let breadcrumbScript = document.getElementById(breadcrumbSchemaId) as HTMLScriptElement | null;

    if (breadcrumbs && breadcrumbs.length > 0) {
      const itemListElement = breadcrumbs.map((crumb, index) => {
        const crumbPath = crumb.path.startsWith('/') ? crumb.path : `/${crumb.path}`;
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
  }, [title, description, canonicalPath, ogType, ogImage, breadcrumbs]);

  return null;
};
