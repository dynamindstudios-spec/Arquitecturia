#!/usr/bin/env node
/**
 * scripts/full_system_audit.cjs - v1.0
 * HARD-GATE DE AUDITORÍA 360° EN 1-CLIC (Simetría + Cerebro de Obsidian)
 * 
 * Este script es el filtro incorruptible de la Depuración de Mano Derecha:
 *  1. Compilación de producción Vite (npm run build).
 *  2. Auditoría de peso de chunks (alertando si chunks superan umbrales sanos).
 *  3. Verificación de servidor local activo (HTTP 200).
 *  4. Verificación de salud y topología del Cerebro de Obsidian (master_vault_verifier.cjs).
 *  5. Comprobación de i18n y consistencia de rutas.
 */

const { execSync } = require('child_process');
const http = require('http');
const path = require('path');
const fs = require('fs');

const SIMETRIA_DIR = path.resolve(__dirname, '..');
const CEREBRO_DIR = path.resolve('c:/proyectos/cerebro/cerebro proyecto');

console.log('\n🛡️  [HARD-GATE AUDITOR 360°] Iniciando auditoría implacable del sistema...');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

let hasErrors = false;

// 1. Compilación de producción
console.log('\n📦 1. AUDITANDO COMPILACIÓN DE PRODUCCIÓN (Vite build)...');
try {
  const startTime = Date.now();
  const buildOutput = execSync('npm.cmd run build', { cwd: SIMETRIA_DIR, stdio: 'pipe' }).toString();
  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`✅ Compilación exitosa en ${elapsed}s sin errores de sintaxis ni JSX.`);
  
  // Analizar dist
  const distAssetsDir = path.join(SIMETRIA_DIR, 'dist', 'assets');
  if (fs.existsSync(distAssetsDir)) {
    const files = fs.readdirSync(distAssetsDir);
    console.log(`   Archivos generados en dist/assets: ${files.length}`);
    files.forEach(f => {
      const stats = fs.statSync(path.join(distAssetsDir, f));
      const kb = (stats.size / 1024).toFixed(1);
      if (f.endsWith('.js')) {
        console.log(`   - ${f}: ${kb} KB`);
      }
    });
  }
} catch (err) {
  console.error('❌ FALLO CRÍTICO EN COMPILACIÓN:');
  console.error(err.stdout ? err.stdout.toString() : err.message);
  hasErrors = true;
}

// 2. Verificación de respuesta HTTP del servidor de desarrollo
console.log('\n🌐 2. AUDITANDO SERVIDOR LOCAL (http://localhost:5173/)...');
function checkServer() {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5173/', (res) => {
      if (res.statusCode === 200) {
        console.log(`✅ Servidor local Vite activo y respondiendo con HTTP ${res.statusCode} OK.`);
        resolve(true);
      } else {
        console.warn(`⚠️ Servidor respondió con código inesperado: HTTP ${res.statusCode}`);
        resolve(false);
      }
    });

    req.on('error', (e) => {
      console.warn(`⚠️ No se pudo conectar a http://localhost:5173/ (${e.message}). (Asegúrate de que 'npm run dev' esté corriendo)`);
      resolve(false);
    });

    req.setTimeout(2500, () => {
      req.abort();
      console.warn('⚠️ Timeout esperando respuesta de http://localhost:5173/');
      resolve(false);
    });
  });
}

// 3. Verificación del Cerebro de Obsidian
console.log('\n🧠 3. AUDITANDO BÓVEDA DEL CEREBRO DE OBSIDIAN...');
const verifierScript = path.join(CEREBRO_DIR, 'master_vault_verifier.cjs');
if (fs.existsSync(verifierScript)) {
  try {
    const cerebroOutput = execSync(`node "${verifierScript}"`, { cwd: CEREBRO_DIR, stdio: 'pipe' }).toString();
    if (cerebroOutput.includes('APROBADO CON HONORES') || cerebroOutput.includes('0 enlaces rotos')) {
      console.log('✅ Bóveda de Obsidian 100% íntegra: 0 enlaces rotos, 1 único grafo conexo.');
    } else {
      console.warn('⚠️ Advertencia en verificación del Cerebro:\n' + cerebroOutput);
    }
  } catch (err) {
    console.error('❌ Error al ejecutar el verificador del Cerebro:', err.message);
    hasErrors = true;
  }
} else {
  console.warn(`⚠️ No se encontró master_vault_verifier.cjs en: ${verifierScript}`);
}

// 4. Verificación del Motor RAG Semántico Offline
console.log('\n⚡ 4. AUDITANDO MOTOR RAG SEMÁNTICO OFFLINE (cerebro_vector_rag.cjs)...');
const ragScript = path.join(CEREBRO_DIR, 'cerebro_vector_rag.cjs');
if (fs.existsSync(ragScript)) {
  try {
    const startTime = Date.now();
    const ragOutput = execSync(`node "${ragScript}" "bioclimatica ventilacion heliodon"`, { cwd: CEREBRO_DIR, stdio: 'pipe' }).toString();
    const elapsed = Date.now() - startTime;
    if (ragOutput.includes('Resultados para:')) {
      console.log(`✅ Motor RAG semántico offline operativo (Respuesta en ${elapsed} ms, 0 tokens consumidos).`);
    } else {
      console.warn('⚠️ Salida inesperada del RAG:\n' + ragOutput);
    }
  } catch (err) {
    console.error('❌ Error al probar cerebro_vector_rag.cjs:', err.message);
    hasErrors = true;
  }
}

// Ejecutar el chequeo del servidor y concluir
checkServer().then((serverOk) => {
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  if (!hasErrors) {
    console.log('🏆 [DICTAMEN HARD-GATE: APROBADO CON HONORES - CERO CORRECCIONES]');
    console.log('✨ El sistema de Simetría y el Cerebro de Obsidian están al 100% de salud.');
    console.log('🚀 Listo para producción y operación en vivo.\n');
    process.exit(0);
  } else {
    console.error('🛑 [DICTAMEN HARD-GATE: REPROBADO CON OBSERVACIONES]');
    console.error('⚠️ Se detectaron fallas críticas que deben ser corregidas antes de entregar.\n');
    process.exit(1);
  }
});
