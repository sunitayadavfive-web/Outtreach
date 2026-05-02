import esbuild from 'esbuild';
import path from 'path';

esbuild.build({
  entryPoints: ['server.ts'],
  bundle: true,
  platform: 'node',
  format: 'cjs',
  outfile: 'dist/server.cjs',
  external: ['vite', 'express', 'fsevents', 'nodemailer'],
  minify: false,
}).catch(() => process.exit(1));
