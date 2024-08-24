import { writeFileSync } from 'fs';

const paths = [
  '/',
  '/about',
  '/privacy-policy',
  '/release-notes',
  '/speed-tool',
  '/exp-calculator',
];

const baseUrl = 'https://striker-base.com';
const sitemapContent = `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${paths.map(path => `
  <url>
    <loc>${baseUrl}${path}</loc>
  </url>
  `).join('')}
</urlset>
`;

writeFileSync('./dist/sitemap.xml', sitemapContent.trim());
console.log('✅ Sitemap has been generated!');
