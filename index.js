const callbacks = new Set();
let isCalled = false;
let isRegistered = false;

function exit(manualExit, signal) {
	if (isCalled) return;
	isCalled = true;
	for (const callback of callbacks) {
		callback();
	}

	if (manualExit === true) {
		process.exit(128 + signal);
	}
}

function onExit() {
	exit(false, 0);
}

function onSIGINT() {
	exit(true, 2);
}

function onSIGTERM() {
	exit(true, 15);
}

function onMessage(message) {
	if (message === 'shutdown') {
		exit(true, -128);
	}
}

function register() {
	isRegistered = true;
	process.once('exit', onExit);
	process.once('SIGINT', onSIGINT);
	process.once('SIGTERM', onSIGTERM);
	process.on('message', onMessage);
}

function unregister() {
	isRegistered = false;
	process.off('exit', onExit);
	process.off('SIGINT', onSIGINT);
	process.off('SIGTERM', onSIGTERM);
	process.off('message', onMessage);
}

function addExitHook(cb) {
	callbacks.add(cb);
	if (!isRegistered) register();
	return () => { callbacks.delete(cb); };
}

function removeExitHook(cb) {
	callbacks.delete(cb);
}

function clearExitHooks() {
	if (isRegistered) unregister();
	callbacks.clear();
}

module.exports = {
    addExitHook,
    removeExitHook,
    clearExitHooks
};
