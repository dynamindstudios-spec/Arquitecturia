import fs from 'fs';
import path from 'path';

async function turboDownload() {
  const baseUrl = 'https://simetriagrupoconstructor.com';
  const projects = JSON.parse(fs.readFileSync('temp_extracted/projects_resolved.json', 'utf8'));
  const allUrls = JSON.parse(fs.readFileSync('temp_extracted/extracted_image_urls.json', 'utf8'));

  const baseDir = path.resolve('public/extracted/simetria/assets');
  fs.mkdirSync(baseDir, { recursive: true });

  console.log(`Starting turbo parallel download of ${allUrls.length} assets...`);

  const concurrency = 8;
  let completed = 0;
  let failed = 0;

  async function downloadItem(rawPath) {
    let fullUrl = rawPath.startsWith('http') ? rawPath : `${baseUrl}${rawPath}`;
    const filename = path.basename(rawPath.split('?')[0]);
    const targetFile = path.join(baseDir, filename);

    if (fs.existsSync(targetFile) && fs.statSync(targetFile).size > 500) {
      completed++;
      return;
    }

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 12000);
        const res = await fetch(fullUrl, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        clearTimeout(timeout);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buffer = await res.arrayBuffer();
        fs.writeFileSync(targetFile, Buffer.from(buffer));
        completed++;
        return;
      } catch (err) {
        if (attempt === 3) {
          console.warn(`Failed ${filename}: ${err.message}`);
          failed++;
        } else {
          await new Promise(r => setTimeout(r, 800));
        }
      }
    }
  }

  // Run in worker pool
  const queue = [...allUrls];
  const workers = Array(concurrency).fill(null).map(async () => {
    while (queue.length > 0) {
      const item = queue.shift();
      if (item) {
        await downloadItem(item);
        if (completed % 25 === 0) {
          console.log(`Turbo Download: ${completed}/${allUrls.length} completed.`);
        }
      }
    }
  });

  await Promise.all(workers);
  console.log(`\nALL DOWNLOADS COMPLETE! Completed: ${completed}, Failed: ${failed}`);

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

turboDownload().catch(console.error);
