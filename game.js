//globals variables
statuses = {
	idle      : "Idle",
	progress  : "In progress",
	finished  : "Finished"
}
maxMonsters = 2

heroClasses = {
	warrior: {
		charClass: "Warrior",
		life: 30,
		damage: 4
	},
	rogue: {
		charClass: "Rogue",
		life: 25,
		damage: 3
	},
	sorcerer: {
		charClass: "Sorcerer",
		life: 20,
		damage: 5
	}
}

monsterClasses = {
	zombie: {
		charClass: "Zombie",
		life: 8,
		damage: 4
	},
	skeleton: {
		charClass: "Skeleton",
		life: 10,
		damage: 6
	},
	holem: {
		charClass: "Holem",
		life: 15,
		damage: 6
	}
}

// Classes declaration
class Character {
	constructor (charClass, life, damage) {
		this.charClass = charClass;
		this.life      = life;
		this.damage    = damage;
	}
	getName () { return this.name; }		// Was redifined for Monsters!!!
	getCharClass (){ return this.charClass; }
	attack (target) {
		if ( target['life'] <= this['damage'] ) { 
			target['life'] = 0;
			return target['charClass'] + " killed";
		} 
		else {
			target['life'] -= this['damage'];
			return 'done ' + this['damage'] + ' damage to ' + target['charClass'];
		}
	}
}

class Hero extends Character { 
	constructor (name, heroClass) { 
		if ( ! heroClasses.hasOwnProperty (heroClass) ) { 
			throw new Error ('Incorrect character class provided' );
		}
		super ( heroClasses[heroClass]['charClass'], heroClasses[heroClass]['life'], heroClasses[heroClass]['damage']);
		this.name = name;
	}
	
	attack (target) {
		if (  ! target instanceof Monster ){
			return 'I will attack only monsters';
		} 
		else {
			return 'Hero attacked, ' + super.attack(target);
		}
	}
}

class Monster extends Character {
	constructor (monsterClass) { 
		if ( !monsterClasses.hasOwnProperty (monsterClass) ) {
			throw new Error ('Incorrect character class provided' );
		}

		super ( monsterClasses[monsterClass]['charClass'], monsterClasses[monsterClass]['life'], monsterClasses[monsterClass]['damage']);
	}
	
	getName () {
		return 'I am ' + this.charClass + ' I don`t have name'; 
	}
	
	attack (target) {
		if (  ! target instanceof Hero ) {
			return 'I will attack only Hero';
		} 
		else {
			return 'Monster attacked, ' + super.attack(target);
		}
	}
}

class Game {
	constructor () { 
		this.status = statuses.idle;
		this.hero = undefined 	// Hero{} 
		this.monsters = []; 	// [Monster{},Monster{}] 
		this.monsters.max = maxMonsters;
	}
	
	beginJourney () { 
		if ( this.hero instanceof Hero && this.monsters.length === this.monsters.max ) {
			this.status = statuses.progress;
			return 'Your journey has started, fight monsters';
		}
		else 
			throw new Error ("Cannot start journey, populate the world with hero and monsters first");
	}
	
	finishJourney() {
		if (this.monsters[0].life === 0 && this.monsters[1].life === 0) {
			this.status = statuses.finished;
			return 'The Game is finished. Monstrs are dead. Congratulations'
		}
		else if ( this.hero.life === 0 ) {
			this.status = statuses.finished;
			return 'The Game is finished. Hero is dead :(';
		}
		else {
			return 'Don`t stop. Some monsters are still alive. Kill`em all';
		}
	}
	
	addHero ( character ) { 
		if ( this.hero instanceof Hero ) {		// Or beter (this.hero !== undefined)
			throw new Error ("Only one hero can exist");
		}
		else if ( character instanceof Hero ) {
			this.hero = character;
			return 'Hero created, welcome ' + this.hero.name; // better use Method >> this.hero.getName() OR Property >> character.name ?
		}
		else {
			throw new Error ("Only hero instance can be hero");
		}
	}
	
	addMonster (character) {
		if ( this.monsters.length == this.monsters.max ) {
			throw new Error ("Only 2 monsters can exist");	// this.monsters.max === 2
		}
		else if ( character instanceof Monster ) {
			this.monsters.push (character);
			return 'Monster Created, ' + this.monsters.charClass + ' appeared in the world'; //character.charClass OR this.monsters.getCharClass();
		}
		else {
			throw new Error ("Only monster Instances can become monsters");
		}
	}
}

var myHero = new Hero ("Johny Dep", "rogue");
var myMonster = new Monster ("zombie");

myHero.attack ( myMonster );
