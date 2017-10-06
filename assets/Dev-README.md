# PuzzleAcademy
A simple clone of the puzzle board for Puzzle and Dragons

### MVP
* [x] The board must render with different color orbs.
* [x] Picking up an orb and moving it should switch places with the nearest orb to it.
* [x] Orbs with matching colors should be destroyed, then skyfalls of new orbs should be made.
* [x] Time limit to move orbs should be implemented.
* [ ] Nice visual design

### Technologies, Libraries, APIs

* JavaScript: Should handle all the game logic.
* Canvas: Should be used to render the board.
* React: Used to watch for changes made to board?
* HTML/CSS: Make everything look pretty.

* Challenges:
* [x] Getting the board to know what matches are made.
* [x] A match is when there are at least 3 of the same color orbs horizontally or vertically. 3 orbs horizontal and 1 orb vertical to those 3 should only result in a 3 orb match.
* [x] Creating a timer that stops the player from moving the orbs further
* [ ] Rendering the skyfall and new orbs in the right places.
* [ ] Making the CSS look nice.

### Wireframes

![wireframe-img]
(https://github.com/Karivool/puzzleappacademy/blob/master/2016-08-15%2020.17.26.jpg?raw=true)

### Backend

Currently, this game should not require any backend. Once it grows in complexity, it will become needed, however.

### Implementation Timeline

### Day 1:
- [x] The board must render with different color orbs.
  - [x] Create an empty board.
  - [x] Create individual color orbs.
  - [x] Start the game off with a populated board.
  - [x] Create nice CSS.

### Day 2:
- [ ] Picking up an orb and moving it should switch places with the nearest orb to it.
  - [x] Pick up an orb with the mouse.
  - [x] Let go of an orb with the mouse.
  - [x] Move an orb to switch places with another orb.
  - [x] Create nice CSS.

### Day 3:
- [ ] Orbs with matching colors should be destroyed, then skyfalls of new orbs should be made.
  - [x] Orbs should destroy once the user lets go of the mouse.
  - [ ] An orb must have switched places for destruction to happen.
  - [ ] Orb destruction order needs to be decided.
  - [x] Only possible matches should destroy.
  - [x] Once all possible matches are destroyed, new orbs should fall.
  - [ ] If any new combos are made from this, they should be matched too.
  - [ ] Create nice CSS.

### BONUS FEATURES:
- [x] Time limit to move orbs should be implemented.
  - [ ] Time limit begins once an orb has been switched.
  - [ ] Once the time limit is up, the player's turn is over
- [ ] ...and beyond.
