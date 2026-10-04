import fs from 'fs';
import path from 'path';

async function downloadAllAssets() {
  const baseUrl = 'https://simetriagrupoconstructor.com';
  const projects = JSON.parse(fs.readFileSync('temp_extracted/projects_resolved.json', 'utf8'));
  const allUrls = JSON.parse(fs.readFileSync('temp_extracted/extracted_image_urls.json', 'utf8'));

  const baseDir = path.resolve('public/extracted/simetria/assets');
  fs.mkdirSync(baseDir, { recursive: true });

  console.log(`Starting download of ${allUrls.length} assets...`);

  // Download all raw assets first
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < allUrls.length; i++) {
    const rawPath = allUrls[i];
    let fullUrl = rawPath.startsWith('http') ? rawPath : `${baseUrl}${rawPath}`;
    const filename = path.basename(rawPath.split('?')[0]);
    const targetFile = path.join(baseDir, filename);

    if (fs.existsSync(targetFile)) {
      successCount++;
      continue;
    }

    try {
      const res = await fetch(fullUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
      });
      if (!res.ok) {
        console.warn(`[${res.status}] Failed: ${fullUrl}`);
        failCount++;
        continue;
      }
      const buffer = await res.arrayBuffer();
      fs.writeFileSync(targetFile, Buffer.from(buffer));
      successCount++;
      if (successCount % 20 === 0 || i === allUrls.length - 1) {
        console.log(`Progress: ${successCount}/${allUrls.length} downloaded.`);
      }
    } catch (err) {
      console.error(`Error downloading ${fullUrl}:`, err.message);
      failCount++;
    }
  }

  console.log(`Finished assets download: ${successCount} successful, ${failCount} failed.`);

  // Now create the structured project folders with local relative paths
  const structuredProjects = [];
  const projectsDir = path.resolve('public/extracted/simetria/projects');
  fs.mkdirSync(projectsDir, { recursive: true });

  for (const proj of projects) {
    const projSlug = proj.id;
    const projDir = path.join(projectsDir, projSlug);
    fs.mkdirSync(projDir, { recursive: true });

    // Local path of cover
    const coverFilename = path.basename(proj.coverAsset.split('?')[0]);
    const localCoverPath = `/extracted/simetria/assets/${coverFilename}`;

    // Local paths of gallery
    const localGalleryPaths = proj.galleryAssets.map(g => {
      const gFilename = path.basename(g.split('?')[0]);
      return `/extracted/simetria/assets/${gFilename}`;
    });

    const structuredProj = {
      ...proj,
      coverLocal: localCoverPath,
      galleryLocal: localGalleryPaths,
      totalImages: localGalleryPaths.length
    };

    fs.writeFileSync(path.join(projDir, 'project_info.json'), JSON.stringify(structuredProj, null, 2), 'utf8');
    structuredProjects.push(structuredProj);
  }

  // Also save the master projects dossier
  fs.writeFileSync('public/extracted/simetria/all_projects_manifest.json', JSON.stringify(structuredProjects, null, 2), 'utf8');
  console.log(`Successfully generated structured manifest for all ${structuredProjects.length} projects!`);
}

downloadAllAssets().catch(console.error);
