var Math=require('mathjs');
module.exports={
	paired: function(numHand)
	{
		var matches=0;
		for(var a=0; a<numHand.length-1; a++)
		{
			var x=numHand[a][0]
			for(var b=a+1;b<numHand.length;b++)
			{
				if(x===numHand[b][0])
				{
					matches++;
				};
			}
		};
		return matches;
	},
	
	isStraight: function(numHand)
	{	
		var straight=false;
		var onlyRanks=[];
		for(var a=0; a<numHand.length; a++)
		{
			onlyRanks.push(numHand[a][0]);
		};
		var lowest=Math.min(onlyRanks);
			if(onlyRanks.indexOf(lowest+1)>=0 && onlyRanks.indexOf(lowest+2)>=0 &&
			   onlyRanks.indexOf(lowest+3)>=0 && onlyRanks.indexOf(lowest+4)>=0)
			{
				straight=true;
			}
			else if(lowest===1 && onlyRanks.indexOf(10)>=0 && onlyRanks.indexOf(11)>=0 &&
			        onlyRanks.indexOf(12)>=0 && onlyRanks.indexOf(13)>=0)
			{
				straight=true;
			};
			return straight;
	},
	
	isFlush: function(numHand)
	{
		var flush=false;
		var onlySuits=[];
		for(var a=0; a<numHand.length; a++)
		{
			onlySuits.push(numHand[a][1]);
		};
		//console.log(onlySuits);
		var firstsuit=onlySuits[0];
		var numofsuits=0;
		for(var a=0; a<onlySuits.length;a++)
		{
			if(onlySuits[a]===firstsuit){numofsuits++;};
		};
		if(numofsuits===5)
		{flush=true;};
		return flush;
	}
};


