**mars crew entertainment system**
# Tic-Tac-Toe Project Features:-
- ***Levels*** 
Select from three difficulty levels, of which Level-3 has been made UNBEATABLE using Minimax Algorithm. Your selection is highlighted.

- ***Tokens***
Select your token, ie X or O using the radio buttons. *Make sure you click on PLAY AGAIN button each time you change your token*, else the change will not be saved.
**Play Again** button can also be used to restart a match midway without affecting your score.

- ***Help***
Use the help button to know your best move against the unbeatable AI. *This feature is only for Level-3*.

- ***Scores***
The Score Table will be auto-updated after each match. It can be reset to 0-0 any time using the RESET SCORE button below it.

<br>

**Algorithms**
- Level-1 simply traverses the board until a vacant square is found, ie. plays the first empty square.
- Level-2 generates a random outcome, so it may beat you at times and lose at other times.
- Level-3 as mentioned, uses **Minimax** Algorithm. Each vacant square is evaluated using recursion and finally the highest score, ie. best for the computer to win is chosen.
The Help Button uses the same algorithm but selects the minimum scored square, ie. worst for computer and hence best for you to win.
