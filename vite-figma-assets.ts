import { Plugin } from 'vite';
import path from 'path';
import fs from 'fs';

export default function figmaAssets(): Plugin {
  return {
    name: 'vite-plugin-figma-assets',
    
    // Handle resolving @/app/assets/ imports
    async resolveId(source, importer) {
      if (source.startsWith('@/app/assets/')) {
        // Extract the asset ID from the import path
        const assetId = source.replace('@/app/assets/', '');
        // Construct the path to the asset in the public directory
        const assetPath = path.resolve(__dirname, 'public/figma-assets', assetId);
        
        // Check if the file exists
        if (fs.existsSync(assetPath)) {
          // Return the resolved path with a query parameter to prevent caching
          return { id: `${assetPath}?import` };
        }
        
        // If file doesn't exist, try to find it in node_modules
        const nodeModulesPath = path.resolve(__dirname, 'node_modules', assetId);
        if (fs.existsSync(nodeModulesPath)) {
          return { id: `${nodeModulesPath}?import` };
        }
        
        console.warn(`Figma asset not found: ${assetId}`);
        return null;
      }
      return null;
    },
    
    // Handle loading the resolved assets
    async load(id) {
      if (id.includes('?import')) {
        const cleanPath = id.replace(/\?.*$/, '');
        if (fs.existsSync(cleanPath)) {
          // For images, return a URL that points to the asset
          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(cleanPath)) {
            const publicPath = cleanPath.replace(/^.*[\\/]public[\\/]/, '/');
            return `export default '${publicPath}'`;
          }
          
          // For other file types, you can add handling here
          const content = await fs.promises.readFile(cleanPath, 'utf-8');
          return `export default ${JSON.stringify(content)}`;
        }
      }
      return null;
    }
  };
}
