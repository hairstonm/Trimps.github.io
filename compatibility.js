function checkCompatibility(game, oldVersion){
    
    if (oldVersion < 3.51){
		if (savegame.portal.Siphonology && !savegame.portal.Siphonology.locked) addNewSetting("siphonologyMapLevel");
		addNewSetting("timestamps");
		var oldMsg = savegame.global.messages;
		savegame.global.messages = game.global.messages;
		for (var item in oldMsg){
			savegame.global.messages.enabled = oldMsg[item];
		}
	}
    
    if (oldVersion === 1.0){
		var hasPortal = false;
		for (var portItem in game.portal){
			var portUpgrade = game.portal[portItem];
			if (portUpgrade.level > 0) hasPortal = true;
			if (typeof portUpgrade.level === 'undefined') continue;
			for (var d = 0; d < portUpgrade.level; d++){
				portUpgrade.heliumSpent += Math.ceil((d / 2) + portUpgrade.priceBase * Math.pow(1.3, d));
			}
		}
		if (hasPortal) game.global.totalPortals = 1;
	}
	if (oldVersion === 1.01){
		game.jobs.Dragimp.modifier = (0.5 * Math.pow(1.05, game.buildings.Tribute.owned));
	}
	if (oldVersion <= 1.02){
		for (var checkResourceMax in game.resources){
			var toCheckMax = game.resources[checkResourceMax];
			if (toCheckMax.max == -1) continue;
			toCheckMax.max = parseFloat(toCheckMax.max);
		}
	}
	if (oldVersion <= 1.06){
		game.resources.trimps.max += (game.buildings.Mansion.owned * 2);
		game.buildings.Mansion.increase.by = 10;
	}
	if (oldVersion <= 1.07){
		game.global.highestLevelCleared = game.global.world;
		game.resources.trimps.max += (game.buildings.Wormhole.owned * 500);
		game.buildings.Wormhole.increase.by = "1000";
		if (game.global.world >= 33) game.worldUnlocks.Doom.fire();
	}
	if (oldVersion < 1.1){
		if (game.global.world >= 25){
			for (var mys = 0; mys < Math.floor((game.global.world - 20) / 5); mys++){
				unlockUpgrade("Gymystic");
			}
		}
	}
	if (oldVersion < 2.213) {
		for (var item in game.options.menu){
			game.options.menu[item].enabled = (game.options.menu[item].enabled) ? 1 : 0;
		}
	}
	if (oldVersion < 2.3){
		if (game.global.highestLevelCleared >= 80) game.global.prisonClear++;
		if (game.global.world >= 70) {
			message("Welcome to 2.3! Since you are currently past zone 70, you have automatically unlocked the new Challenge - 'Trapper' and the new Job - 'Geneticist'", "Notices");
			unlockJob("Geneticist");
		}
		else if (game.global.highestLevelCleared >= 69){
			message("Welcome to 2.3! Since you have previously cleared up to at least zone 70, you have unlocked the new Challenge - 'Trapper'!", "Notices");
		}
	}
	if (oldVersion < 2.7){
		for (var statName in game.stats){
			var statItem = game.stats[statName];
			if (typeof statItem.valueTotal !== 'undefined' && typeof statItem.value !== 'undefined') {
				statItem.valueTotal = statItem.value;
				statItem.value = 0;
			}
			else if (typeof statItem.valueTotal !== 'undefined' && typeof statItem.valueTotal !== 'function' && typeof savegame.stats !== 'undefined'){
				if (typeof savegame.stats[statName] !== 'undefined') {
					statItem.valueTotal = savegame.stats[statName].value;
					}
			}
		}
		if (game.global.totalHeliumEarned > 0){
			var totalHelium = 0;
			for (var item in game.portal){
				if (game.portal[item].locked) continue;
				var portUpgrade = game.portal[item];
				if (typeof portUpgrade.level === 'undefined' || portUpgrade.level <= 0) continue;
				totalHelium += portUpgrade.heliumSpent;
			}
			var newTHV = totalHelium + game.global.heliumLeftover + game.resources.helium.owned;
			if (game.global.totalHeliumEarned - newTHV > 0) game.stats.spentOnWorms.valueTotal = game.global.totalHeliumEarned - newTHV;
			game.global.totalHeliumEarned = newTHV;
		}
	}
	
	if (oldVersion < 2.72){
		achievementCompatibilityUnlock();
		noOfflineTooltip = true;
	}
	if (oldVersion < 2.73){
		if (game.jobs.Geneticist.owned > 0) game.global.lastLowGen = (game.global.lowestGen > 0) ? game.global.lowestGen : game.jobs.Geneticist.owned;
	}
	if (oldVersion < 2.75){
		game.buildings.Wormhole.increase.by = 1500;
	}
	if (oldVersion < 2.81 && typeof game.global.lootAvgs !== 'undefined'){
		game.global.lootAvgs.fragments = [0];
		game.global.lootAvgs.fragmentsTotal = 0;
	}
	if (oldVersion < 2.9){
		if (game.options.menu.showFullBreed.enabled == 2) game.options.menu.showFullBreed.enabled = 1;
		if (game.global.totalPortals >= 5) message("Heavy use of the portal has created a chance for the Void to seep in to your world. Be alert.", "Story", null, "voidMessage");
	}
	if (oldVersion < 3){
		game.global.heirloomSeed = getRandomIntSeeded(game.global.voidSeed, 0, 1000000);
	}
	if (oldVersion < 3.1){
		game.global.heirloomBoneSeed = getRandomIntSeeded(game.global.heirloomSeed, 0, 1000000);
	}
	/* if (oldVersion < 3.11){
		game.global.eggSeed = getRandomIntSeeded(game.global.heirloomBoneSeed, 0, 1000000);
		cancelTooltip();
		noOfflineTooltip = true;
		tooltip("Eggs", null, 'update');	
	} */
	if (oldVersion < 3.2){
		game.global.researched = true;
	}
	if (oldVersion < 3.21){
		game.achievements.oneOffs.finished.push(false);
		game.achievements.oneOffs.filters.push(-1);
	}
	if (oldVersion < 3.22){
		if (game.global.totalPortals > 0) game.options.menu.extraMapBtns.enabled = 1;
	}
	if (oldVersion < 3.23){
		game.global.autoPrestiges = (game.global.autoPrestiges === true) ? 1 : 0;
		game.global.voidMaxLevel = game.global.highestLevelCleared;
	}
	if (oldVersion < 3.3){
		if (game.global.highestLevelCleared >= 59) game.global.autoUpgradesAvailable = true;
		if (game.global.sLevel >= 4) game.buildings.Warpstation.craftTime = 0;
	}
	if (oldVersion < 3.6){
		if (game.achievements.oneOffs.finished.length > 12)
			game.achievements.oneOffs.finished.splice(12, game.achievements.oneOffs.finished.length - 12);
		var newFinished = game.achievements.oneOffs.finished;
		var removed = newFinished.splice(10, 2);
		for (var x = 0; x < 12; x++) newFinished.push(false);
		newFinished.splice(18, 0, removed[0]);
		newFinished.splice(19, 0, removed[1]);
		game.achievements.oneOffs.finished = newFinished;
		addNewSetting("tinyButtons");
	}
	if (oldVersion < 3.7){
		game.global.messages.Loot.essence = true;
		if (game.global.highestLevelCleared >= 180) addNewSetting('masteryTab');
	}
	if (oldVersion < 3.71){
		checkAchieve("totalHelium");
	}
	if (oldVersion < 3.81){
		for (var x = 0; x < game.global.gridArray.length; x++){
			if (game.global.gridArray[x].corrupted) game.global.gridArray[x].mutation = "Corruption";
		}
	}
  
    if (oldVersion < 2){
		if (game.global.world == 59){
			game.global.gridArray[99].name = "Improbability";
			message("Your Scientists have detected an anomaly at the end of this zone. Exercise caution.", "Notices");
		}
		else if (game.global.world == 60 && game.global.lastClearedCell <= 10){
			planetBreaker();
			game.global.world = 59;
			nextWorld();
		}
		else if (game.global.world >= 60){
			message("There is a new anomaly at 59, but you are too far past to reach it. You will have to use your portal to see the changes it brings. It looks like you have access to a new challenge, however!", "Notices");		
		}
		else {
			message("Your scientists have detected an anomaly at the end of Zone 59. They warn you to be careful if you intend to approach it.", "Notices");
		}
	}
}