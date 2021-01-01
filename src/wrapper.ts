import 'source-map-support/register';

import { Log, init as initLog } from './log';
initLog();

import { App } from './app';

const app: App = new App();
app.start();
