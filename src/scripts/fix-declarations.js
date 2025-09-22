#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'fs/promises';
import { join } from 'path';

async function fixDeclarations(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(dir, entry.name);

      if (entry.isDirectory()) {
        await fixDeclarations(fullPath);
      } else if (entry.name.endsWith('.js')) {
        const content = await readFile(fullPath, 'utf8');
        const fixedContent = content.replace(/process\.env\./g, 'import.meta.env.');

        if (content !== fixedContent) {
          await writeFile(fullPath, fixedContent);
          console.log(`Fixed: ${fullPath}`);
        }
      }
    }
  } catch (error) {
    console.error(`Error processing ${dir}:`, error.message);
  }
}

fixDeclarations('../../src/declarations');