# Game design

Nyctophilia is a side-scrolling narrative adventure with no combat, no death, no timers and no
fail state. The only thing the player can do wrong is stop paying attention.

## Pillars

- **One room at a time.** Every space is a flat 320x180 side view. You walk left and right, and
  doors cut to other rooms. The camera never leaves the horizontal.
- **Light is the resource.** The lamp you carry, the lights you switch on, and the ambient tint
  of a scene are the only thing that changes how a room reads. The title names a love of
  darkness and the game spends most of its time in it.
- **Repetition with drift.** The house is the same house four times. Nearly every object has a
  different line on each pass, and the drift from pleasant to broken is the story.
- **Nothing is explained.** The tall man, the well and the double are never resolved. The
  psychologist scene at the end is the only frame the game offers, and it puts you back at the
  start.

## Verbs

The player has four inputs and that is the whole game.

| Verb | Key | Effect |
| --- | --- | --- |
| Walk | Left and Right, or A and D | Moves at 60 units per second, clamped to the scene's bounds |
| Use | X | Runs the selected entity's script function |
| Inventory | Tab | Opens a three-tab panel; movement stops while it is open |
| Choose | Up and Down, then X | Picks from a small action menu when a script offers one |

Escape opens the pause menu, unless a script has set `pauseBlocked` for a cutscene.

### Selection

There is no cursor and no hotspot highlighting. Standing within reach of a usable entity
selects it, and a framed **Press X** prompt appears at the bottom of the screen. Reach is half
the player's width plus half the entity's width plus three units, so it is generous and the
player never has to line up precisely.

Only one entity can be selected. If two usable entities overlap, the one later in the level
file's entity order wins. That is the authoring constraint behind most of the room layouts.

An entity marked `event` skips the prompt entirely and fires on proximity. That is how
cutscenes trigger when you walk into the right part of a room.

## Inventory

Three tabs, selected with left and right.

| Tab | Holds | Rows visible | Pressing X |
| --- | --- | --- | --- |
| **Items** | Carryable objects with a script function | 4 | Runs the item's function |
| **Notes** | Letters and diary pages | 4 | Opens the note full screen |
| **Tasks** | Goals, newest first | 8 | Nothing |

There are only five item icons in the whole game: the note, the room key, the light bulb, the
crowbar and the map. New entries are prepended, so the most recent is always at the top.

Using an item is "use item on the thing I am standing next to". The item's script reads
`world.getSelectedKey()`, which is still the world entity the player was next to when the
inventory opened, and branches on it:

```javascript
function useKey() {
    if(world.getSelectedKey() == "door") { /* unlock */ }
    else world.getMessages().put(["notkey"]);
}
```

Every item in the game has a wrong-target line, so a player who tries the key on everything
gets a refusal rather than silence.

Notes are read on a black overlay: the title from the global text bundle, the body from the
same key with a `_text` suffix. Escape or X returns.

## Goals

Tasks are the game's only explicit direction. A script calls `addGoal("goal_sleep")`, which
prepends the goal and raises a **New goal** notification; `goalDone(...)` plays a chime and
draws a white line through the entry. Completed goals stay on the list until a script clears
them, which happens on going to sleep.

Goals are never mandatory in the mechanical sense. Sleeping is gated on having the sleep goal,
but the goal appears from ordinary progress, so the list is a reminder rather than a lock.

## The day loop

Days two, three and four run the same structure, and the structure is the pacing device.

1. **Wake.** Five lines of monologue that set the day's mood.
2. **Breakfast and wash.** Two goals. Washing offers a choice of hygiene or the prescribed
   medicine; the fridge offers eat or drink, and drink offers tea, beer, coffee or juice.
3. **Explore.** Completing both morning goals adds five more: second bedroom, balcony, living
   room, closet, yard. Entering each room completes its goal.
4. **Write.** Completing all five adds the diary goal. Writing produces the day's diary note
   and adds the sleep goal.
5. **Sleep.** Advances to the next level.

Day one is a short version: arrive, one goal, sleep. Day three inserts the hidden-room
discovery chain into step three, and day four replaces step three with the attic key.

Every object in the house has a line on every pass, and they are separate keys in separate
bundles. The kitchen tap is admired on day two, found cold and dark on day three, and just
cold on day four. That is where most of the game's 857 text keys go: the four house passes and
the night account for 477 of them on their own.

## Puzzles

There are six, and none of them is difficult. They exist to slow the player down at the right
moments.

| Puzzle | Level | Shape |
| --- | --- | --- |
| The closing corridor | `intro` | Walk forward, turn around, the wall has moved. Four times |
| The hotel key | `intro` | Take the key from the table, use it on the door |
| The light bulb | `hdream1` | Take the bulb, which locks the exit and swaps you between two versions of the rooms; the key you need is only in the other one |
| The rotten wall | `hday3` | Hear the wind, find the crowbar in a box downstairs, break the wall |
| The catacombs | `hcave` | 61 rooms, forks and dead ends, a map item that teleports you home, a grate that needs the crowbar |
| Six levers | `hdream2` | Six levers, each offering Turn right or Turn left. The door opens on right, left, left, left, right, right |

Each lever has three sprite variants: the untouched starting one, the left one, and the right
one. Turning a lever swaps which variant is visible and there is no way back to the starting
variant, so every lever must be touched at least once. `checkPuzzle()` in `hdream2.js` runs
after every throw and the only feedback is a line saying you heard a sound.

## The character swap

The light bulb is the game's one real mechanic. Carrying it and using it calls
`world.changeCharacterScene()`, which appends or strips a trailing `2` on the current scene name
and changes the player sprite at the same time. Scene pairs are authored as `begin`/`begin2`,
`kitchen`/`kitchen2`, `lever`/`lever2` and so on.

Two consequences shape the levels that use it:

- The inventory also swaps. Items live in two lists, one per body, which is why `hdream1` adds
  the bulb twice, once into each.
- A scene with no `2` partner cannot be swapped in. Both dream levels solve this by locking the
  exit the moment you take the bulb, so the player can only ever be in a room that has a pair.

## Messages, notifications and choices

Three text channels, deliberately different in weight.

- **Messages** are the subtitle box at the top. They queue, the player advances them with X, and
  the game ignores input until the queue drains. Scripts use them for everything that matters.
- **Notifications** are one line at the very top with no box. They expire after three seconds
  and cannot be advanced. Used only for tutorial hints and the New goal chime.
- **Actions** are a short vertical list with a blue highlight bar, driven by up, down and X.
  Used wherever the game wants a decision: hygiene or medicine, which drink, free the cat or
  not, go back to the entrance or not.

None of the action choices except one has a mechanical consequence. They are characterisation.

## The two endings, and the counter behind them

After the final monologue, `hend` offers two exits: walk to her, or walk through the door that
has just appeared.

- **Bad ending** always works. He stays.
- **Good ending** is gated:

```javascript
function GoodEnding() {
    if(world.getFuck() >= 25) { /* he leaves */ }
    else world.getMessages().put(["fuckingcant"]);
}
```

`getFuck()` returns `Settings.actions`, a counter the scripts raise by calling
`world.settingsAction()`. It is reset to zero when a new game starts and again when the credits
run, and it rides along in the save file, so it accumulates across the whole playthrough.

`settingsAction()` is called from **32** places against a threshold of **25**:

| Level | Count | What counts |
| --- | --- | --- |
| `hday2`, `hday3`, `hday4` | 5 each | Wash, take the medicine, eat, drink the coffee specifically, write the diary |
| `hday3` | 3 more | Read the old book, the letter and the father's diary in the hidden room |
| `hdream1` | 4 | Read all four letters |
| `hdream2` | 3 | Read all three diary pages |
| `hcave` | 6 | Read all four diary pages, write the diary, free the cat |
| `hpast` | 1 | Read the note she left |

One of the 32 cannot be reached. Day three's diary requires the sleep goal, and no script adds
that goal on day three, because the only way out of day three is the catacombs. The diary you
write that evening is the one in `hcave`, which is counted separately. So a playthrough can
collect **31**, and must collect 25 of them.

The design that follows is: look after yourself, take what you were prescribed, and read
everything the house has to tell you. Miss more than six of those and the door refuses, with a
line about maybe having done something differently.

**This was broken in the shipped build.** `World.settingsAction()` played its sound and never
touched the counter, so `Settings.actions` never left zero and the good ending was unreachable.
The missing increment is now in place. This is the one deliberate change to the game's
behaviour in this repository; everything else preserves what shipped.

Both endings then run the same extended ending, so nobody misses the psychologist scene.

## Saving

One slot, in `~/.prefs/nyctophilia`. Scripts call `world.Save()` at the start of each level, so
checkpoints are level boundaries; the pause menu's Save and exit writes wherever you are.

Because a save is a dump of the live level object, it captures every entity's current
visibility and current script function, which means puzzle state survives without any of it
being modelled explicitly. It also means the level you reload is the one in your save file, not
the one in `assets/levels/`.

Continue is greyed out on the main menu until a save exists.

## Options and accessibility

Two options, in both the main menu and the pause menu: language, and sound on or off. Language
switches the font, all three bundles and the text art at once, and can be changed mid-game.

There is no volume slider, no key rebinding, no subtitle sizing and no difficulty setting. Sound
off mutes both music and effects.

## Failure states

None. The player cannot die, cannot lose an item, cannot soft-lock, and cannot run out of
anything. Every wrong action produces a line of dialogue. The one irreversible decision is which
ending to walk towards.
