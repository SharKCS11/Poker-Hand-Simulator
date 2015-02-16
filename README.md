# Poker-Hand-Simulator

This simulator is meant for performing statistical experiments based on poker hands from a deck of cards.
The program is written in JavaScript and requires node.js and Node Package Manager to be installed. Go here: http://nodejs.org/ to install node.


This simple program will simulate a dealer dealing out any number of cards, and then selecting the best five-card poker hand from it. 
With the current way the simulator is set up, it will keep dealing out hands until it hits a straight flush, and then report the number of all other hands it hit in the process, as well as the number of trials required to hit a straight flush.
 The number of cards to be dealt out in the initial hand can be changed in the 'PokerHandSimulator.js' file on line 289:
```
  var gh=randHand(n);
```

In the above line, changing "n" will change the initial hand size.

Here's are some examples when n=7 (In case you are not familiar with Poker Hand Rankings, they are explained at the end of this README file)

Initial Random Hand: [Qs, 3c, 9d, Qd, 5c, 10d, 2s]
The program will select the pair of Queens along with the three best kickers: 10, 9, and 5 to output:
```
  [Qs, 3c, 9d, Qd, 5c, 10d, 2s]
   Qs, 9d, Qd, 5c, 10d
  Pair of Queens
```
Since that hand was not a straight flush, it will move on to the next random hand [7s, Jc, 8c, 9h, Qd, 4h, 10c]
and will select the highest five-card hand, which in this case is the Queen-high straight and output:
```
  [7s, Jc, 8c, 9h, Qd, 4h, 10c]
   Jc,8c,9h,Qd,10c
  Straight: Queen-High
```
Since that hand was not a straight flush, it will continue until it finally does hit a straight flush. Then it will output the number of tries it took, and the number of other hands it hit in the process.

By changing the code, you can also use this to analyze just the hands themselves without requiring it to find a straight flush.

WORKING:
  All initial hand sizes up to 17
NOT WORKING:
  Integration with Google Spreadsheets is slightly buggy
FUTURE PLANS:
  Add GUI to make the simulator more functional.

----------------------------------------------------------------------------------------------------------------------------
<h3> Poker Hand Rankings in Ascending Order </h3>

| Rank | Example |
|------|---------|
|High Card| [As, 3d, 5s, 10h, 8d] = Ace High|
|Pair| [As, Ac, 5s, 10h, 8c] = Pair of Aces|
|Two-Pair| [As, Ac, 5s, 5h, 8c] = Two Pair: Aces Up|
|Three of a Kind| [As, Ac, Ad, 5h, 8c] = Three of a Kind: Trip Aces|
|Straight| [7c, 8d, 9c, 10s, Jh] = Straight: Jack High|
|Flush| [2h, 5h, 6h, 10h, Jh] = Flush: Jack High|
|Full House| [As, Ac, Ad, 5h, 5c] = "Aces Full of Fives" or Full House: Aces over Fives|
|Four of a Kind| [Ks, Kh, Kd, Kc, 5h] = Four of A Kind: Quad Kings|
|Straight Flush| [7c, 8c, 9c, 10c, Jc] = Straight Flush: Jack High|






