const MODULES = {
    "forge-vtt": { ignore: true },
    "turnmarker": { working: "0.7.8" },
    "actually-private-rolls": { working: "0.6.6" },
    "chatdamagebuttons-beyond20": { working: "0.7.9" },
    "cursor-hider": { working: "0.7.9" }
};

function logMapElements(value, key, map) {
    const foundryMajor = game.data.version.split(".").slice(0, 2).join(".");
    
    let moduleMajor;
    let override = false;
    

    if ( key in MODULES ) {
        if ( MODULES[key].ignore )
            return;
        if ( MODULES[key].working && isNewerVersion(MODULES[key].working, value.data.compatibleCoreVersion) ){
            moduleMajor = MODULES[key].working.split(".").slice(0, 2).join(".");
            override = true;
        }
    }
    else {
        moduleMajor = value.data.compatibleCoreVersion.split(".").slice(0, 2).join(".");
    }

    if ( isNewerVersion(foundryMajor, moduleMajor) ) {
        console.log(`Module Developer: '${value.data.author}' guarantees '${key}' tested and compatible only up to: ${value.data.compatibleCoreVersion}. Recommendation: REMOVE '${key}'.`);
    }
    else if( override && isNewerVersion(game.data.version, MODULES[key].working) ) {
        console.log(`Module Developer: '${value.data.author}' guarantees '${key}' tested and compatible only up to: ${value.data.compatibleCoreVersion}, FoundryVTT Users have verified '${key}' working up to: ${MODULES[key].working}, Recommendation: Use '${key}' with caution.`);
    }
}

Hooks.on("ready", function() {
    console.log(`Current FoundryVTT Version: ${game.data.version}.`)
    game.modules.forEach(logMapElements);
});