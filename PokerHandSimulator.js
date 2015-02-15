var strength=require('./ltest');
var Math=require('mathjs');
var Chance=require('chance');
var rng1=new Chance();
var rng2=new Chance(rng1.integer({min:-5,max:120}));
var cardVals=[
	[1,2,3,4,5,6,7,8,9,10,11,12,13],
	[1,2,3,4]
];
var cardNames=[
	["A","2","3","4","5","6","7","8","9","10","J","Q","K"],
	["c","d","h","s"]
];
const wholeDeck=[];
for(a=0; a<cardVals[1].length; a++)
{
	for(b=0; b<cardVals[0].length; b++)
		{
			wholeDeck.push([cardVals[0][b],cardVals[1][a]]);
		};
};

var deck;

var randHand=function(noc){
	deck=wholeDeck.slice();
	var hand=[];
	for(cco=1;cco<=noc;cco++)
	{
		var x=rng2.integer({min:0,max:(deck.length-1)});
		hand.push(deck[x]);
		deck.splice(x,1);
	}
	return hand;
};

var combine = function(a, min) {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = min; i < a.length; i++) {
        fn(i, a, [], all);
    }
    all.push(a);
    return all;
}

var toNames=function(numHand){
	var nameHand=[];
	for(var a=0;a<numHand.length;a++){
		
		nameHand.push(cardNames[0][cardVals[0].indexOf(
		numHand[a][0])]+cardNames[1][cardVals[1].indexOf(numHand[a][1])]);
	};
	return nameHand;
};

var getPairHeight=function(numHand){
var pairedRanks=[];
		for(var a=0; a<numHand.length-1; a++)
		{
			var x=numHand[a][0]
			for(var b=a+1;b<numHand.length;b++)
			{
				if(x===numHand[b][0])
				{
					if(pairedRanks.indexOf(x)<0)
					{pairedRanks.push(x);}
				};
			}
		};
		return pairedRanks;
};

var getFullInfo=function(numHand){
	var ranks=getPairHeight(numHand);
	var hits=0;
	for(var a=0; a<numHand.length; a++)
	{
		if(ranks[0]===numHand[a][0])
		{hits++;}
	}
	if(hits===3){return ranks[0];}
	else{return ranks[1];}
};

var findPairName=function(num){
	switch(num){
		case 1:
			return "Aces"; break;			
		case 2:
			return "Deuces"; break;
		case 3:
			return "Threes"; break;
		case 4:
			return "Fours"; break;
		case 5:
			return "Fives"; break;
		case 6:
			return "Sixes"; break;
		case 7:
			return "Sevens"; break;
		case 8:
			return "Eights"; break;
		case 9:
			return "Nines"; break;
		case 10:
			return "Tens"; break;
		case 11:
			return "Jacks"; break;
		case 12:
			return "Queens"; break;
		case 13:
			return "Kings"; break;
		default:
			return "errors";
	};
};

var findKicker=function(numHand){
	var onlyRanks=[];
	for(var a=0; a<numHand.length; a++)
	{
		onlyRanks.push(numHand[a][0]);
	};
	var highest;
	if(onlyRanks.indexOf(1)>=0 && !(strength.isStraight(numHand)))
	{highest=1;}
	else if(onlyRanks.indexOf(1)>=0 && strength.isStraight(numHand) && onlyRanks.indexOf(13)>=0)
	{highest=1;}
	else{highest=Math.max(onlyRanks);};
	return highest;
};

var findHighCard=function(numHand){
	var onlyRanks=[];
	for(var a=0; a<numHand.length; a++)
	{
		onlyRanks.push(numHand[a][0]);
	};
	var highest;
	if(onlyRanks.indexOf(1)>=0 && !(strength.isStraight(numHand)))
	{highest=1;}
	else if(onlyRanks.indexOf(1)>=0 && strength.isStraight(numHand) && onlyRanks.indexOf(13)>=0)
	{highest=1;}
	else{highest=Math.max(onlyRanks);};
	switch(highest)
	{
		case 1:
			return "Ace "; break;
		case 5:
			return "Five "; break;
		case 6:
			return "Six "; break;
		case 7:
			return "Seven "; break;
		case 8:
			return "Eight "; break;
		case 9:
			return "Nine "; break;
		case 10:
			return "Ten "; break;
		case 11:
			return "Jack "; break;
		case 12:
			return "Queen "; break;
		case 13:
			return "King "; break;
		default:
			return "error ";
	};
};

var printStrength=function(nh){
switch(strength.paired(nh)){
	case 1:
		console.log("Pair of " + findPairName(Math.max(getPairHeight(nh))));
		break;
	case 2:
		console.log("Two Pairs: " + findPairName(Math.max(getPairHeight(nh))) + " Up");
		break;
	case 3:
		console.log("Three of a Kind: Trip " + findPairName(Math.max(getPairHeight(nh))));
		break;
	case 4:
		console.log("Full House: " + findPairName(getFullInfo(nh)) + " Full");
		break;
	case 6:
		console.log("Four of a Kind: Quad " + findPairName(Math.max(getPairHeight(nh))));
		break;
	default:
		break;
};
if(strength.paired(nh)===0){
	if(strength.isStraight(nh) && strength.isFlush(nh)){
		console.log("Straight Flush: " + findHighCard(nh) + "high");
	}
	else if (strength.isStraight(nh))
	{console.log("Straight: " + findHighCard(nh) + "high");	}
	else if (strength.isFlush(nh)){
		console.log("Flush: " + findHighCard(nh) + "high");
	}
	else{
		console.log(findHighCard(nh) + "high");
	};
};
};

var getStrength=function(nh){
var handStrength;
switch(strength.paired(nh)){
	case 1:
		//console.log("Pair of " + findPairName(Math.max(getPairHeight(nh))));
		handStrength=1;
		break;
	case 2:
		//console.log("Two Pairs: " + findPairName(Math.max(getPairHeight(nh))) + " Up");
		handStrength=2;
		break;
	case 3:
		//console.log("Three of a Kind: Trip " + findPairName(Math.max(getPairHeight(nh))));
		handStrength=3;
		break;
	case 4:
		//console.log("Full House: " + findPairName(Math.max(getPairHeight(nh))) + " Full");
		handStrength=6;
		break;
	case 6:
		//console.log("Four of a Kind: Quad " + findPairName(Math.max(getPairHeight(nh))));
		handStrength=7;
		break;
	default:
		break;
};
if(strength.paired(nh)===0){
	if(strength.isStraight(nh) && strength.isFlush(nh)){
		//console.log("Straight Flush: " + findHighCard(nh) + "high");
		handStrength=8;
	}
	else if (strength.isStraight(nh))
	{//console.log("Straight: " + findHighCard(nh) + "high");
	 handStrength=4;
	}
	else if (strength.isFlush(nh)){
		//console.log("Flush: " + findHighCard(nh) + "high");
		handStrength=5;
	}
	else{
		//console.log(findHighCard(nh) + "high");
		handStrength=0;	
	};
};
	return handStrength;
};

var fiveCardHands=function(nh){
	 atLeastFive=combine(nh,5);
	 var count=0;
	 while(count<atLeastFive.length){
		if(atLeastFive[count].length !=5)
		{
			atLeastFive.splice(count,1);
		}
		else{count++;};
	 };
	 return atLeastFive;
};

/**for(var howmany=0; howmany <8; howmany++)
{
	getStrength(randHand());
}; */

var highCard=0, opair=0, tpair=0, trips=0, strgt=0, flsh=0, fllh=0, quads=0, strfl=0;
var howmany=0;
while(strfl===0)
{

var gh=randHand(11);
console.log(toNames(gh));
var possibleHands=fiveCardHands(gh);
var listOfStrengths=[];
for(var counter=0; counter<possibleHands.length; counter++)
{
	listOfStrengths.push(getStrength(possibleHands[counter]));
};
var maxStr=Math.max(listOfStrengths);
var count=0;
while(count<possibleHands.length)
{
	if(getStrength(possibleHands[count])<maxStr)
	{
		possibleHands.splice(count,1);
	} else{count++;};
};
var bestHand;

if(maxStr===0){ //highest for nothing
	var onlyNums=[];
	var totals=[];
	for(var a=0; a<possibleHands.length; a++)
	{
		for(var b=0; b<5; b++)
		{
			onlyNums.push(possibleHands[a][b][0]);
		}
	};
	for(var d=0; d<onlyNums.length; d++){ //makes Aces highest.
		if(onlyNums[d]===1){
			onlyNums[d]=14;
		}
	};
	for(var e=0; e<onlyNums.length; e+=5)
	{
		totals.push(onlyNums[e]+onlyNums[e+1]+onlyNums[e+2]+onlyNums[e+3]+onlyNums[e+4]);
	};
	bestHand=possibleHands[totals.indexOf(Math.max(totals))];
	console.log("   " + toNames(bestHand));
	printStrength(bestHand);
	console.log(" ");
	highCard++;
};

if(maxStr===1){ //highest three kickers to pair
	var onlyNums=[];
	var totals=[];
	var rank1=getPairHeight(possibleHands[0])[0];
	for(var a=0; a<possibleHands.length; a++)
	{
		for(var b=0; b<5; b++)
		{
			onlyNums.push(possibleHands[a][b][0]);
		}
	};
	for(var d=0; d<onlyNums.length; d++){ //makes ranked pairs zero.
		if(onlyNums[d]===rank1){
			onlyNums[d]=0;
		};
	};
	for(var e=0; e<onlyNums.length; e++){ //makes Aces highest.
		if(onlyNums[e]===1 && onlyNums[e]!==rank1){
			onlyNums[e]=14;
		}
	};
	for(var f=0; f<onlyNums.length; f+=5)
	{
		totals.push(onlyNums[f]+onlyNums[f+1]+onlyNums[f+2]+onlyNums[f+3]+onlyNums[f+4]);
	};
	bestHand=possibleHands[totals.indexOf(Math.max(totals))];
	console.log("   " + toNames(bestHand));
	printStrength(bestHand);
	console.log("");
	opair++;
};

if(maxStr===2){ //highest kicker to two-pair
	var onlyNums=[];
	var totals=[];
	var allranks=getPairHeight(gh);
	var rank1;
	if(allranks.indexOf(1)>=0){rank1=1;}
	else{var rank1=Math.max(allranks);};
	allranks.splice(getPairHeight(gh).indexOf(Math.max(getPairHeight(gh))),1);
	rank2=Math.max(allranks);
	for(var a=0; a<possibleHands.length; a++)
	{
		for(var b=0; b<5; b++)
		{
			onlyNums.push(possibleHands[a][b][0]);
		}
	};
	for(var e=0; e<onlyNums.length; e++){ //makes Aces highest.
		if(onlyNums[e]===1 && onlyNums[e]!==rank1){
			onlyNums[e]=14;
		}
	};
	for(var d=0; d<onlyNums.length; d++){   //squares the ranked pairs
		if(onlyNums[d]===rank1 || onlyNums[d]===rank2){
			onlyNums[d]=Math.pow(onlyNums[d],2);
		};
	};
	for(var f=0; f<onlyNums.length; f+=5)
	{
		totals.push(onlyNums[f]+onlyNums[f+1]+onlyNums[f+2]+onlyNums[f+3]+onlyNums[f+4]);
	};
	bestHand=possibleHands[totals.indexOf(Math.max(totals))];
	console.log("   " + toNames(bestHand));
	printStrength(bestHand);
	console.log("");
	tpair++;
};

if(maxStr===3){ //highest two kickers for trips
var onlyNums=[];
	var totals=[];
	var rank1=getPairHeight(gh)[0];
	for(var a=0; a<possibleHands.length; a++)
	{
		for(var b=0; b<5; b++)
		{
			onlyNums.push(possibleHands[a][b][0]);
		}
	};
	for(var d=0; d<onlyNums.length; d++){ //makes ranked pairs zero.
		if(onlyNums[d]===rank1){
			onlyNums[d]=0;
		};
	};
	for(var e=0; e<onlyNums.length; e++){ //makes Aces highest.
		if(onlyNums[e]===1 && onlyNums[e]!==rank1){
			onlyNums[e]=14;
		}
	};
	for(var f=0; f<onlyNums.length; f+=5)
	{
		totals.push(onlyNums[f]+onlyNums[f+1]+onlyNums[f+2]+onlyNums[f+3]+onlyNums[f+4]);
	};
	bestHand=possibleHands[totals.indexOf(Math.max(totals))];
	console.log("   " + toNames(bestHand));
	printStrength(bestHand);
	console.log("");
	trips++;
};

if(maxStr===4){ //highest straight
	var onlyNums=[];
	var totals=[];
	var rank1=getPairHeight(gh)[0];
	for(var a=0; a<possibleHands.length; a++)
	{
		for(var b=0; b<5; b++)
		{
			onlyNums.push(possibleHands[a][b][0]);
		}
	};
	for(var f=0; f<onlyNums.length; f+=5)
	{
		totals.push(onlyNums[f]+onlyNums[f+1]+onlyNums[f+2]+onlyNums[f+3]+onlyNums[f+4]);
	};
	bestHand=possibleHands[totals.indexOf(Math.max(totals))];
	console.log("   " + toNames(bestHand));
	printStrength(bestHand);
	console.log("");
	strgt++;
};

if(maxStr===5){ //highest (non-straight) flush
	var onlyNums=[];
	var totals=[];
	for(var a=0; a<possibleHands.length; a++)
	{
		for(var b=0; b<5; b++)
		{
			onlyNums.push(Math.pow(possibleHands[a][b][0],2));
		}
	};
	for(var e=0; e<onlyNums.length; e++){ //makes Aces highest.
		if(onlyNums[e]===1 && onlyNums[e]!==rank1){
			onlyNums[e]=14;
		}
	};
	for(var f=0; f<onlyNums.length; f+=5)
	{
		totals.push(onlyNums[f]+onlyNums[f+1]+onlyNums[f+2]+onlyNums[f+3]+onlyNums[f+4]);
	};
	bestHand=possibleHands[totals.indexOf(Math.max(totals))];
	console.log("   " + toNames(bestHand));
	printStrength(bestHand);
	console.log(""); flsh++;
};

if(maxStr===6){ //highest full house
	var onlyNums=[];
	var totals=[];
	var ranks1=getFullInfo(gh);
	for(var a=0; a<possibleHands.length; a++)
	{
		for(var b=0; b<5; b++)
		{
			onlyNums.push(possibleHands[a][b][0]);
		}
	};
	for(var e=0; e<onlyNums.length; e++){ //makes Aces highest.
		if(onlyNums[e]===1 && onlyNums[e]!==rank1){
			onlyNums[e]=14;
		}
	};
	for(var d=0; d<onlyNums.length; d++){ //makes the set from the FH squared.
		if(onlyNums[d]===rank1){
			onlyNums[d]=Math.pow(onlyNums[d],2);
		};
	};
	for(var f=0; f<onlyNums.length; f+=5)
	{
		totals.push(onlyNums[f]+onlyNums[f+1]+onlyNums[f+2]+onlyNums[f+3]+onlyNums[f+4]);
	};
	bestHand=possibleHands[totals.indexOf(Math.max(totals))];
	console.log("   " + toNames(bestHand));
	printStrength(bestHand);
	console.log(""); fllh++;
};

if(maxStr===7){ //highest kicker to quads
	var onlyNums=[];
	var totals=[];
	var rank1=getPairHeight(possibleHands[0])[0];
	console.log(rank1);
	for(var a=0; a<possibleHands.length; a++)
	{
		for(var b=0; b<5; b++)
		{
			onlyNums.push(possibleHands[a][b][0]);
		}
	};
	for(var d=0; d<onlyNums.length; d++){ //makes ranked pairs zero.
		if(onlyNums[d]===rank1){
			onlyNums[d]=0;
		};
	};
	for(var e=0; e<onlyNums.length; e++){ //makes Aces highest.
		if(onlyNums[e]===1 && onlyNums[e]!==rank1){
			onlyNums[e]=14;
		}
	};
	for(var f=0; f<onlyNums.length; f+=5)
	{
		totals.push(onlyNums[f]+onlyNums[f+1]+onlyNums[f+2]+onlyNums[f+3]+onlyNums[f+4]);
	};
	bestHand=possibleHands[totals.indexOf(Math.max(totals))];
	console.log("   " + toNames(bestHand));
	printStrength(bestHand);
	console.log(""); quads++;
};

if(maxStr===8){ //highest straight flush
	var onlyNums=[];
	var totals=[];
	var rank1=getPairHeight(gh)[0];
	for(var a=0; a<possibleHands.length; a++)
	{
		for(var b=0; b<5; b++)
		{
			onlyNums.push(possibleHands[a][b][0]);
		}
	};
	for(var f=0; f<onlyNums.length; f+=5)
	{
		totals.push(onlyNums[f]+onlyNums[f+1]+onlyNums[f+2]+onlyNums[f+3]+onlyNums[f+4]);
	};
	bestHand=possibleHands[totals.indexOf(Math.max(totals))];
	console.log("   " + toNames(bestHand));
	printStrength(bestHand);
	console.log(""); strfl++;
}

howmany++;
};

console.log(" ");
console.log("High Cards: " + highCard);
console.log("One-Pairs: " + opair);
console.log("Two-Pairs: " + tpair); console.log("Trips: "+trips);
console.log("Straights: " + strgt);
console.log("Flushes: " + flsh);
console.log("Full Houses: " + fllh);
console.log("Quads: " + quads);
console.log("Straight Flushes: " + strfl);
console.log(howmany + " tries required.");
