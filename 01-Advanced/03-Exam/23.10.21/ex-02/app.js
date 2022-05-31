class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = { "child": 150, "student": 300, "collegian": 500 };
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        if (!["child", "student", "collegian"].includes(condition)) {
            throw new Error("Unsuccessful registration at the camp.");
        }

        for (let participant of this.listOfParticipants) {
            if (participant.name === name) {
                return `The ${name} is already registered at the camp.`;
            }
        }

        if (money < this.priceForTheCamp[condition]) {
            return `The money is not enough to pay the stay at the camp.`
        }

        let participant = {
            name,
            condition,
            power: 100,
            wins: 0
        }
        this.listOfParticipants.push(participant);

        return `The ${name} was successfully registered.`
    }

    unregisterParticipant(name) {
        let filteredList = this.listOfParticipants.filter(x => x.name === name);
        if (filteredList.length === 0) {
            throw new Error(`The ${name} is not registered in the camp.`);
        }

        this.listOfParticipants = this.listOfParticipants.filter(x => x.name !== name);
        return `The ${name} removed successfully.`
    }

    timeToPlay(typeOfGame, participant1, participant2) {
        let participant1Obj = this.listOfParticipants.filter(x => x.name === participant1)[0];

        if (typeOfGame === 'WaterBalloonFights') {
            let participant2Obj = this.listOfParticipants.filter(x => x.name === participant2)[0];

            if(participant1Obj === undefined || participant2Obj === undefined) {
                throw new Error(`Invalid entered name/s.`)
            }

            if(participant1Obj.condition !== participant2Obj.condition) {
                throw new Error(`Choose players with equal condition.`);
            }

            if(participant1Obj.power === participant2Obj.power) {
                return `There is no winner.`
            }

            let winner = '';
            if(participant1Obj.power > participant2Obj.power){
                winner = participant1Obj.name;
                participant1Obj.wins ++;
            } else {
                winner = participant2Obj.name;
                participant2Obj.wins ++;
            }
            return `The ${winner} is winner in the game ${typeOfGame}.`

//////////////////////////////////////////////////////////////////////////////////////////
        } else if (typeOfGame === 'Battleship') {
            if(participant1Obj === undefined) {
                throw new Error(`Invalid entered name/s.`)
            }

            participant1Obj.power += 20;
            return `The ${participant1Obj.name} successfully completed the game ${typeOfGame}.`
        }
    }

    toString() {
        let res = `${this.organizer} will take ${this.listOfParticipants.length} participants on camping to ${this.location}`

        let sortedParticipants = this.listOfParticipants.sort((a, b) => b.wins - a.wins);
        for (let participant of sortedParticipants) {
            res += `\n${participant.name} - ${participant.condition} - ${participant.power} - ${participant.wins}`
        }
        return res;
    }
}

const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria");
console.log(summerCamp.unregisterParticipant("Petar Petarson"));