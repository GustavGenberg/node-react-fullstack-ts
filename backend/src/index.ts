import * as fs from 'fs';
import * as path from 'path';

import { Backend } from './Backend';

const file = path.join(__dirname, '../config.json');
const config = JSON.parse(fs.readFileSync(file).toString());

new Backend(config);