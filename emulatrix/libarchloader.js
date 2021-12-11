import {Archive} from './libarchive.js';
Archive.init({
	workerUrl: 'worker-bundle.js',
});
window.Archive = Archive;