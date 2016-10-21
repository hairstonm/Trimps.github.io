function save(exportThis, fromManual) {
	isSaving = true;
    var saveString = JSON.stringify(game);
    var saveGame = JSON.parse(saveString);
	isSaving = false;
    delete saveGame.worldUnlocks;
    delete saveGame.badGuys;
    delete saveGame.mapConfig;
	delete saveGame.global.prestige;
	delete saveGame.worldText;
	delete saveGame.trimpDeathTexts;
	delete saveGame.badGuyDeathTexts;
	delete saveGame.tierValues;
	delete saveGame.colorsList;
    for (var item in saveGame.equipment) {
		delete saveGame.equipment[item].tooltip;
		delete saveGame.equipment[item].blocktip;
        delete saveGame.equipment[item].cost;
    }
    for (var itemA in saveGame.buildings) {
        delete saveGame.buildings[itemA].tooltip;
        delete saveGame.buildings[itemA].cost;
		delete saveGame.buildings.Barn.increase;
		delete saveGame.buildings.Forge.increase;
		delete saveGame.buildings.Shed.increase;
		delete saveGame.buildings.origTime;
    }
    for (var itemB in saveGame.upgrades) {
        delete saveGame.upgrades[itemB].tooltip;
        delete saveGame.upgrades[itemB].cost;
		delete saveGame.upgrades[itemB].prestiges;
		delete saveGame.upgrades[itemB].modifier;
    }
    for (var itemC in saveGame.jobs) {
        delete saveGame.jobs[itemC].tooltip;
        delete saveGame.jobs[itemC].cost;
    }
    for (var itemD in saveGame.triggers) {
        delete saveGame.triggers[itemD].message;
        delete saveGame.triggers[itemD].cost;
    }
	for (var itemE in saveGame.mapUnlocks){
		var unlock = saveGame.mapUnlocks[itemE];
		delete unlock.level;
		delete unlock.message;
		delete unlock.icon;
		delete unlock.world;
		delete unlock.repeat;
		delete unlock.startAt;
	}
	for (var itemP in saveGame.portal){
		var portal = saveGame.portal[itemP];
		delete portal.modifier;
		delete portal.priceBase;
		delete portal.tooltip;
		delete portal.otherModifier;
		delete portal.additiveInc;
	}
	for (var itemS in saveGame.options.menu){
		var settingItem = saveGame.options.menu[itemS];
		delete settingItem.description;
		delete settingItem.titles;
		delete settingItem.locked;
		delete settingItem.secondLocation;
		delete settingItem.extraTags;
	}
	for (var itemF in saveGame.challenges){
		var challenge = saveGame.challenges[itemF];
		delete challenge.unlockString;
		delete challenge.description;
	}
	for (var itemG in saveGame.achievements){
		var achievement = saveGame.achievements[itemG];
		delete achievement.tiers;
		delete achievement.breakpoints;
		delete achievement.names;
		delete achievement.descriptions;
		delete achievement.title;
		delete achievement.icon;
		delete achievement.newStuff;
		delete achievement.filters;
	}
	delete saveGame.heirlooms.values;
	delete saveGame.heirlooms.defaultSteps;
	delete saveGame.heirlooms.rarityNames;
	delete saveGame.heirlooms.rarities;
	delete saveGame.heirlooms.rarityBreakpoints;
	for (var itemHT in saveGame.heirlooms){
		for (var itemHI in saveGame.heirlooms[itemHT]){
			var heirloom = saveGame.heirlooms[itemHT][itemHI];
			delete heirloom.name;
			delete heirloom.steps;
		}
	}
	for (var itemTL in saveGame.talents){
		var talent = saveGame.talents[itemTL];
		delete talent.icon;
		delete talent.description;
		delete talent.tier;
		delete talent.requires;
		delete talent.name;
	}
    saveString = LZString.compressToBase64(JSON.stringify(saveGame));
    if (exportThis) return saveString;
	try{
		localStorage.setItem("trimpSave1",saveString);
		if (localStorage.getItem("trimpSave1") == saveString){
			message("Game Saved!", "Notices");
		}
		else {
			message("For some reason, your game is not saving. Make sure you export and back up your save!", "Notices");
		}
	}
	catch(e){ 
		if(e.name == "NS_ERROR_FILE_CORRUPTED") {
        message("Sorry, it looks like your browser storage has been corrupted. Please clear your storage by going to Tools -> Clear Recent History -> Cookies and set time range to 'Everything'. This will remove the corrupted browser storage across all sites.", "Notices");
		}
		else
		message("For some reason, your game is not saving. Make sure you export and back up your save!", "Notices"); 
		}
		
	if (game.options.menu.usePlayFab.enabled == 1 && playFabId){
		var timeSinceSave = performance.now() - lastOnlineSave;
		if (timeSinceSave < 1800000 && !fromManual){
			return;
		}
		saveToPlayFab(saveString);
	}

}
