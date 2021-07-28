const fs = require('fs');

const cliArgs = process.argv.slice(2);
const ENV = getEnvFromArgs(cliArgs) || '';

const SW_PATH = './dist/service-worker.js';
const LOGS_ENABLED = true;

// Internal Logger
const logger = {
  log,
  warn,
  error,
};

// Let's do the magic!
logger.log(`Updating ServiceWorker at ${SW_PATH}`);
if (ENV) {
  logger.log(`Loading .env in mode ${ENV}`);
}

return Promise.all([
  readSW(),
  loadEnv(ENV),
]).then((ops) => {
  if (ops.length !== 2) {
    return false;
  }
  const data = ops[0];
  const env = ops[1];
  const parsed = parseEnvVars(data, env);

  return parsed;
})
  .then(storeSW)
  .then(() => {
    logger.log('Finished! ServiceWorker updated with env variables');
  })
  .catch((err) => {
    logger.error('[error] Ooops! Something went wrong!');
    logger.error(err);
    logger.error('\n---\nProcess exited with an error. ServiceWorker might not have been modified.\n---');
  });

function getEnvFromArgs(args) {
  let mode = '';
  const index = args.indexOf('--mode');
  if (index > -1 && args.length > (index + 1)) {
    mode = args[index + 1];
  }

  return mode;
}

/** loadEnvFile
 *  Loads the .env file
 *  @param mode {String} If set, will load .env.mode
 *  @return {Promise} A promise with the file contents
 */
function loadEnvFile(mode) {
  return new Promise((resolve, reject) => {
    let env = './.env';
    if (mode) {
      env = `./.env.${mode}`;
    }

    fs.readFile(env, 'utf8', (err, data) => {
      if (err) {
        // logger.error(err);
        return reject(err);
      }

      return resolve(data);
    });
  });
}

/** parseLineToEnvObject
 *  WARNING! This is NOT a pure function:
 *  Param env WILL be modified
 *  @param line {String} The .env line to parse
 *  @param env  {Object} Environment object to create. WILL BE MODIFIED.
 *  @return {Object} The env param
 */
function parseLineToEnvObject(line, env) {
  if (!line || typeof line !== 'string') {
    return false;
  }

  const splitter = line.indexOf('=');

  // If no = character found, split the line and warn the user
  if (splitter === -1) {
    logger.warn(`[warn] Invalid variable found in .env.${ENV}:`, line);
    return false;
  }

  const key = line.substr(0, splitter);
  const val = line.substr(splitter).replace('=', '');

  env[key] = val;
  return env;
}

/** loadEnv
 *  Form an .env file, gets an object with variables
 *  @param mode {String} If set, will load .env.mode
 *  @return {Promise} A promise with the env object
 */
async function loadEnv(env) {
  const envFile = await loadEnvFile(env);

  const envArr = envFile.split('\n');
  const envObj = {};

  envArr.forEach((item) => {
    parseLineToEnvObject(item, envObj);
  });

  return envObj;
}

/** readSW
 *  Read the ServiceWorker file
 *  @return {Promise} A promise with the file content
 */
function readSW() {
  return new Promise((resolve, reject) => {
    fs.readFile(SW_PATH, 'utf8', (err, data) => {
      if (err) {
        // logger.error(err);
        return reject(err);
      }

      return resolve(data);
    });
  });
}

/** storeSW
 *  Store the ServiceWorker file
 *  @param content  {String} The text to write in SW file
 *  @return {Promise}
 */
function storeSW(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(SW_PATH, content, (err) => {
      if (err) {
        // logger.error(err)
        return reject(err);
      }

      return resolve();
    });
  });
}

/**
 *  From a text, and a env object, replace all the vars in text
 *  @param text {String} Text to search variables in
 *  @param env  {Object} Environment variables object { variable: value }
 *  @return {String} Parsed text
 */
function parseEnvVars(text, env) {
  let newText = text;
  const vars = Object.keys(env);

  vars.forEach((key) => {
    const value = `'${env[key]}'`;
    newText = replaceAll(newText, `process.env.${key}`, value);
  });

  return newText;
}

/** replaceAll
 *  Replace all the ocurrences in a string
 *
 *  @param str    {String} Text to search into
 *  @param find   {String} String to find (and replace)
 *  @param replace  {String} What you want to replace with
 */
function replaceAll(str, find, replace) {
  return str.replace(new RegExp(find, 'g'), replace);
}

/* ----------------------- */
/* --- INTERNAL LOGGER --- */
/* ----------------------- */

/** [logger] log
 *  Basic conditional logger. Just a if before a console.log
 */
function log() {
  if (LOGS_ENABLED) {
    console.log.apply(this, arguments);
  }
}

/** [logger] warn
 *  Basic conditional warn logger. Just a if before a console.warn
 */
function warn() {
  if (LOGS_ENABLED) {
    console.warn.apply(this, arguments);
  }
}

/** [logger] error
 *  Basic conditional warn logger. Just a if before a console.warn
 */
function error() {
  if (LOGS_ENABLED) {
    console.error.apply(this, arguments);
  }
}

