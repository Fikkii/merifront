// scripts/generate-sitemap.js
import fs from 'fs';
import axios from 'axios';

const BASE_URL = 'https://merilearn.com.ng';
const API_URL = 'https://apigateway.merilearn.com.ng/courses/details';

async function generateSitemap() {
  try {
    const { data } = await axios.get(API_URL);

    const staticRoutes = ['/', '/login', '/reset-password'];
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

    // Static Pages
    staticRoutes.forEach(route => {
      xml += `
  <url>
    <loc>${BASE_URL}${route}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Dynamic Course Pages (based on ID)
    data.forEach(course => {
      xml += `
  <url>
    <loc>${BASE_URL}/courses/${course.id}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    });

    xml += `\n</urlset>`;

    fs.writeFileSync('./public/sitemap.xml', xml.trim());
    console.log('✅ Sitemap generated using course IDs.');
  } catch (err) {
    console.error('❌ Failed to generate sitemap:', err.message);
  }
}

generateSitemap();

