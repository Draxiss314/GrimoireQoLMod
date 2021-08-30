//if(Game.Objects['Wizard tower'].minigame) throw new Error("Modded Grimoire prevented from loading by already present Chancemaker minigame.");

/* These are the functions that we must modify. 
		
		M.getSpellCost=function(spell)
		{
			var out=spell.costMin;
			if (spell.costPercent) out+=M.magicM*spell.costPercent; //On this line, change M.magicM to M.magic
			return Math.floor(out);
		}
		M.getSpellCostBreakdown=function(spell)
		{
			var str='';
			if (spell.costPercent) str+=Beautify(spell.costMin)+' magic +'+Beautify(Math.ceil(spell.costPercent*100))+'% of max magic'; // On this line, change 'max' to 'currrent'
			else str+=Beautify(spell.costMin)+' magic';
			return str;
		}
		*/

if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/' + (0 ? 'Beta/' : '') + 'CCSE.js');

if(GrimoireMod === undefined) var GrimoireMod = {};

if(typeof CCSE == 'undefined') Game.LoadMod('https://klattmose.github.io/CookieClicker/CCSE.js');

GrimoireMod.launch = function(){
	//CCSE.MinigameReplacer(MyMod.AlterGrimoire, 'Wizard tower');
	GrimoireMod.isLoaded = 1;
	var objKey = "Wizard tower";
	var M = Game.Objects[objKey].minigame;
	var preEvalScript = "var M = Game.Objects['" + objKey + "'].minigame;"; //I think there was supposed to be an easier way utilizing the functions provided by CCSE, but I didn't understand so I just copy-pased the functions I was pretty sure would work. 

	CCSE.ReplaceCodeIntoFunction('M.getSpellCost', 'if (spell.costPercent) out+=M.magicM*spell.costPercent;', 'if (spell.costPercent) out+=M.magic*spell.costPercent;', -1, preEvalScript);
	CCSE.ReplaceCodeIntoFunction('M.getSpellCostBreakdown', `+'% of max magic';`, `+'% of current magic';`, -1, preEvalScript);

}

if(!GrimoireMod.isLoaded){
	
	if(CCSE && CCSE.isLoaded) {
		GrimoireMod.launch();
	}

	else {
		if(!CCSE) var CCSE = {};
		if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
		CCSE.postLoadHooks.push(MyMod.launch);
	}
}



