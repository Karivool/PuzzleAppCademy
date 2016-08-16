# PuzzleAppAcademy
A simple clone of the puzzle board for Puzzle and Dragons

### MVP
* [ ] The board must render with different color orbs. 
* [ ] Picking up an orb and moving it should switch places with the nearest orb to it.
* [ ] Orbs with matching colors should be destroyed, then skyfalls of new orbs should be made.
* [ ] Time limit to move orbs should be implemented.
* [ ] Nice visual design

### Technologies, Libraries, APIs

* JavaScript: Should handle all the game logic.
* Canvas: Should be used to render the board.
* React: Used to watch for changes made to board?
* HTML/CSS: Make everything look pretty.

* Challenges:
* [ ] Getting the board to know what matches are made.
* [ ] A match is when there are at least 3 of the same color orbs horizontally or vertically. 3 orbs horizontal and 1 orb vertical to those 3 should only result in a 3 orb match.
* [ ] Creating a timer that stops the player from moving the orbs further
* [ ] Rendering the skyfall and new orbs in the right places.
* [ ] Making the CSS look nice.

### Wireframes

This will be a lot less involved than for your Full Stack Project, but make sure you have drawings
for each view, including modals.

### Backend

Currently, this game should not require any backend. Once it grows in complexity, it will become needed, however.

### Implementation Timeline

### Day 1: 
- [ ] The board must render with different color orbs. 
  - [ ] Create an empty board.
  - [ ] Create individual color orbs.
  - [ ] Start the game off with a populated board.
  - [ ] Create nice CSS.

### Day 2:
- [ ] Picking up an orb and moving it should switch places with the nearest orb to it.
  - [ ] Pick up an orb with the mouse.
  - [ ] Let go of an orb with the mouse.
  - [ ] Move an orb to switch places with another orb.
  - [ ] Create nice CSS.

### Day 3:
- [ ] Orbs with matching colors should be destroyed, then skyfalls of new orbs should be made.
  - [ ] Orbs should destroy once the user lets go of the mouse.
  - [ ] An orb must have switched places for destruction to happen.
  - [ ] Orb destruction order needs to be decided.
  - [ ] Only possible matches should destroy.
  - [ ] Once all possible matches are destroyed, new orbs should fall.
  - [ ] If any new combos are made from this, they should be matched too.
  - [ ] Create nice CSS.

### BONUS FEATURES:
- [ ] Time limit to move orbs should be implemented.
  - [ ] Time limit begins once an orb has been switched.
  - [ ] Once the time limit is up, the player's turn is over
- [ ] ...and beyond.

## Checklist

### Live Project

* [ ] Includes links to your Portfolio, Github and LinkedIn.
* [ ] Landing page/modal with obvious, clear instructions.
* [ ] Interactivity of some kind.
* [ ] Well styled, clean frontend.
* [ ] If it has music, the option to mute or stop it.
* [ ] Hosted from your portfolio site on [GitHub pages](https://pages.github.com/).

### Repo and [README]

* [ ] Link to live version.
* [ ] Instructions on how to play/use the project.
* [ ] List of techs/languages/plugins/APIs used.
* [ ] Technical implementation details with code snippets (make sure it looks good).
* [ ] To-dos/future features.
* [ ] No .DS_Stores / debuggers / console.logs.
* [ ] Organize into /assets and /lib.
