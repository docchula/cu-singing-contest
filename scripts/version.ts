import { execSync } from 'child_process';
import { resolve, relative } from 'path';
import { writeFileSync } from 'fs';

const builtAt = new Date().toISOString();
const sha = (process.env['CI']
  ? process.env['CI_COMMIT_SHA']
  : execSync('git rev-parse HEAD')
)
  .toString()
  .trim()
  .slice(0, 7);

const info = { sha, builtAt };

const file = resolve(__dirname, '..', 'src', 'environments', 'version.prod.ts');
writeFileSync(
  file,
  `// IMPORTANT: THIS FILE IS AUTO GENERATED! DO NOT MANUALLY EDIT OR CHECKIN!
/* tslint:disable */
export default ${JSON.stringify(info, null, 2)};
/* tslint:enable */
`,
  { encoding: 'utf-8' }
);

console.log(
  `Wrote version info ${info.sha} to ${relative(
    resolve(__dirname, '..'),
    file
  )}`
);
