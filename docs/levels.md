# Level design and level structure

Fifteen levels, 200 scenes, 1,694 entities, 111 lights. None of it is in the Java. A level is a
JSON file, a clip map, two PNGs and a JavaScript file, and the game has an in-engine editor for
building them.

## The five files that make a level

| File | Contents |
| --- | --- |
| `assets/levels/<name>.txt` | The level: scenes, entities, lights, camera bounds, ambient colour |
| `assets/levels/<name>_items.txt` | The clip map: name to source rectangle, for props and for lights |
| `assets/level_items/<name>_level.png` | The prop sheet those rectangles cut from |
| `assets/level_items/<name>_light.png` | The light sheet |
| `assets/scripts/<name>.js` | Every behaviour the level's entities name |

Plus two localization bundles, `bundle_en_<NAME>.properties` and `bundle_ru_<NAME>.properties`,
whose keys the script passes to the message and action queues.

All five are looked up by the level's name, so the name in `<name>.txt` must match the filename.
`null.txt` is the blank editor template and is the one file where it does not.

## Level file format

```json
{
  "scenes": {
    "bed1": {
      "entities": {
        "door_from": {
          "position": { "x": 312.0, "y": 15.0 },
          "bounds":   { "x": 312.0, "y": 15.0, "width": 8.0, "height": 125.0 },
          "function": "goFromBed1",
          "visible": true, "collision": true, "usable": true, "event": false
        }
      },
      "lights": { "lightmapk": { "position": {...}, "bounds": {...}, "visible": false } },
      "startX": 30.0, "maxX": 320.0, "minX": 0.0,
      "intensity": 1.0,
      "color": { "x": 1.0, "y": 1.0, "z": 1.0 }
    }
  },
  "currentSceneName": "bed1",
  "name": "hday3",
  "lightEnabled": false
}
```

Notes on the shape:

- `position` and `bounds` duplicate x and y. Both are written; the renderer reads position, the
  collision test reads bounds.
- A `Light` is an `Entity` with nothing added, so it serializes identically and simply ignores
  `function`, `collision`, `usable` and `event`.
- Entity order is draw order, because the map deserializes into a `LinkedHashMap`. Scene order
  is meaningless.
- `effectEnabled` defaults to true and is only written where a script changed it.
- `startX` positions the player when the **level** loads. Changing **scene** does not move the
  player; every script sets the position itself after the transition.

## Scene conventions

A scene is one screen-wide or wider strip. `minX` and `maxX` clamp both the player and the
camera, so the scene's width is `maxX - minX` in a 320-unit viewport.

| Width | Meaning | Examples |
| --- | --- | --- |
| 320 | Exactly one screen, no scrolling | Almost every room |
| 640 | Two screens | The street, the club |
| 800 | Two and a half screens | Both house corridors |
| 960 | Three screens | The hotel corridor, the hotel lobby in the past |
| 1600 | Five screens | The intro corridor, which then shrinks |

Doors are thin tall entities, typically 8 wide and 125 high, placed against the ends of a strip.
Walls and floors are wide stretched fills placed first so they draw behind everything.

Rooms are paired by naming when the light-bulb swap is in play: a scene called `kitchen` must
have a `kitchen2` for the mechanic to work, because `changeCharacterScene()` just appends or
strips a trailing `2`.

## The levels

| Level | Scenes | Entities | Lights | Shape |
| --- | --- | --- | --- | --- |
| `intro` | 8 | 80 | 5 | Title cards, a shrinking corridor, a hotel |
| `hday1` | 13 | 154 | 14 | The house, first pass |
| `hday2` | 12 | 152 | 14 | The house, second pass |
| `hdream1` | 11 | 59 | 1 | A chain of dream rooms, the light bulb |
| `hday3` | 14 | 171 | 14 | The house, plus hidden room and barn |
| `hcave` | 61 | 379 | 1 | The catacombs |
| `hdream2` | 13 | 103 | 6 | Nightmare house, lever puzzle, Purgatory |
| `hnight1` | 13 | 155 | 14 | The house at night |
| `hday4` | 16 | 179 | 14 | The house, ruined, plus loft and eye |
| `hclub` | 3 | 18 | 3 | Street, bar, and her |
| `hpast` | 5 | 54 | 5 | Bedroom, corridor, street, bar, hotel |
| `hdream3` | 13 | 153 | 11 | The house one last time, route to the cellar |
| `hend` | 8 | 27 | 9 | Eight fixed scenes, mostly cutscene |
| `hcredits` | 9 | 10 | 0 | Nine still frames |
| `null` | 1 | 0 | 0 | Blank editor template |

## The house

Six levels share one floor plan, redrawn and relit each time: `hday1`, `hday2`, `hday3`,
`hnight1`, `hday4` and `hdream3`. Learning it once is learning most of the game's geography.

```
                       street (640)
                          │
  kitchen ── bathroom ── floor_1 (800) ── living ── store
     │                      │
   cellar*               garden ── barn* ── [hcave]
                            │
                       floor_2 (800)
                            │
   bed1 ── bathroom2 ── gallery ── bed2 ── loft* ── bad_wall → hidden*
```

Starred rooms open up over the course of the game:

- **cellar** is never enterable. The kitchen door produces a line about the smell and the boiler
  on every pass, and in `hdream3` it is the route to the ending.
- **barn** appears in `hday3`, unlocked with the key from the hidden room. It holds the ladder
  into the catacombs.
- **hidden** appears in `hday3` once the rotten wall on the second floor is broken with the
  crowbar. It is the father's office.
- **loft** appears in `hday4`, opened with the key that arrives overnight, and contains the shape
  that ends the house chapter.

Scene widths and light counts are identical across all six, so re-lighting a pass is a matter of
changing `intensity` and `color` and toggling which lights start visible. Day levels run ambient
`1, 1, 1` at full intensity with bathrooms dropped to 0.3. `hnight1` runs `0.3, 0.3, 0.7` at
0.7. `hdream3` runs `0.5, 0.5, 0.9` at 0.8.

Each house level also carries a `day` scene, which is not a room. It is a black scene holding the
day-number title card, shown while the level changes.

### Level-specific differences

| Level | Scenes it adds | Scenes it drops |
| --- | --- | --- |
| `hday1` | `day` | `hidden`, `barn` |
| `hday2` | — | `day`, `hidden`, `barn` |
| `hday3` | `hidden`, `barn` | `day` |
| `hnight1` | `day` | `hidden`, `barn` |
| `hday4` | `hidden`, `barn`, `loft`, `eye` | `day` |
| `hdream3` | `day` | `hidden`, `barn`, and the street exit from `floor_1` |

`hnight1` still carries a `bad_wall` and a garden door pointing at hidden-room functions, but
both are marked unusable, so the night level cannot reach them.

## The catacombs

`hcave` is 60 connected rooms plus the bedroom you return to, and it is the only level in the
game that is a real maze. The trunk runs from the entrance to a dead end; everything else hangs
off two junction rooms.

```
cave1 (entrance, ladder up, locked grate)
  └ cave2 … cave10          main corridor, side doors at cave4 and cave7
      └ cave11 … cave16     dead end
  cave13 ─ cave22 ─ cave21 ─ cave23   dead end
                       └ cave20 ─ cave19 ─ cave18 ─ cave7
                                     └ cave37   ← first junction
cave37 ─ cave36 ─ cave24 ─ cave17 ─ cave4
              └ cave25 … cave29
                    ├ cave30 ─ cave31 ─ cave32   the cat
                    └ cave33 ─ cave34 ─ cave35   dead end
cave37 ─ cave38 … cave42
              ├ cave43 ─ cave44 ─ cave45         dead end
              └ cave46 ─ cave47 ─ cave53         ← second junction
cave53 ─ cave49 ─ cave50 ─ cave51 ─ cave52       dead end
    └ cave54 ─ cave55 ─ cave61
                    ├ cave57 ─ cave58 ─ cave59   dead end
                    └ cave62 ─ cave63            the well
```

Landmarks:

| Room | Contents |
| --- | --- |
| `cave1` | The ladder back up, and a grate the crowbar opens |
| `cave2` | Old diary 2 |
| `cave16` | Old diary 3 |
| `cave32` | The cat in a jar |
| `cave52` | Old diary 4 |
| `cave59` | Old diary 5 |
| `cave63` | The well, and the Tall Man |
| `bed1` | Not part of the maze. The bedroom the level ends in |

Room numbers 48, 56 and 60 do not exist. The numbering is an authoring artefact, not a route.

Every room is a plain 320-wide strip with the same green ambient, `0.5, 0.7, 0.5` at 0.6, and
between five and seven entities: floor, walls, and two or three doors. The maze is made entirely
out of which door leads where, which is set by which `goToCaveN` or `goFromCaveN` function each
door names. There are 145 functions in `hcave.js` and 122 of them are those door movers.

Several rooms have more than one entrance but only one scripted exit, because `goFromCaveN`
names a fixed destination rather than remembering where you came from. `cave32` is the clearest
case: it is reachable from `cave31` and from `cave33`, and always leaves to `cave31`.

The map item is the concession to the player: using it anywhere but the entrance offers to
return you to `cave1`, which is a straight teleport.

## Set-piece levels

**`intro`** is three levels of scene in one. `intro` holds the title cards, entities that a
script makes visible in sequence. `corridor` is 1600 wide with four `event` entities along it;
each one fires on proximity, makes a wall visible behind you and calls `setMinX` or `setMaxX` to
shrink the strip, which is the closing-corridor effect. `hotel`, `bath` and `hotel_corridor` are
ordinary rooms; `tallman`, `day` and `later` are cutscene stages.

**`hdream1`** is a chain rather than a graph: `begin → eyes1 → eyes2 → eyes3 → puzzle`, with the
alternate versions `puzzle2`, `other`, `other2` and `girl2` reachable only with the light bulb.
Taking the bulb rewrites the exit door's function to one that refuses, which is what keeps the
player inside the paired region.

**`hdream2`** pairs almost everything: `begin`/`begin2`, `kitchen`/`kitchen2`,
`gallery`/`gallery2`, `puzzle`/`puzzle2`, `lever`/`lever2`, `tallman`/`tallman2`. The `lever`
scene is 600 wide and holds eighteen entities, three per lever, of which exactly one is visible
at a time. The swap script special-cases this pair: it hides the player sprite on entering
`lever` and shows it again on entering `lever2`.

**`hend`** is eight scenes and only three usable entities in the whole level: the figure that
starts the final sequence, and the two endings. Everything else is scripted. Its ambient values
are the most extreme in the game, from `0.2, 0.2, 0.8` at 0.2 for the last conversation down to
pure black at zero intensity for the psychologist scene, which is white text on nothing.

**`hcredits`** has no lights, no bundle entries, and nine scenes named `1` through `8` plus `32`.
The script walks them on a timer and ends by revealing one entity named `infinite`.

## The editor

[UI.java](../src/ru/catinbank/nyctophilia/UI.java) is a scene2d panel that appears when
`Nyctophilia.developerMode` is true. It is how every level in the game was built, and it still
works.

Set the flag, run, then:

| Key | Action |
| --- | --- |
| Space | Show or hide the panel, and enter entity-editing mode |
| Left mouse | Select an entity or light under the cursor, and drag it |
| Z | Delete the selection |
| F2 | Save settings and quit |

The panel has five groups:

- **Level** — a filename field, and Save, Load and Play. Save writes both `<name>.txt` and
  `<name>_items.txt` through `LevelLoader.saveLevel`, pretty-printed.
- **Scene** — add, switch to, or delete a named scene.
- **Light** — red, green, blue and intensity for the current scene's ambient, applied live.
- **Object** — position and size, the source rectangle in the sheet, a key, a script function
  name, the four booleans, and a type selector for Object, Light or Scripted. Add creates the
  entity and registers its clip in one step. A second block sets the scene's `startX`, `maxX` and
  `minX`.
- **Info** — read-only readout of the selection and the current ambient.

Saving writes to `Gdx.files.local("levels/...")`, which resolves against the working directory.
Levels also *load* through `Gdx.files.local`, and libGDX's desktop file handle falls back to the
classpath when the local file is absent. That is what lets the packaged jar run from its own
assets while a `levels/` folder next to the jar overrides any single level. It is how the editor
round-trip worked in 2015 and it still works.

## Authoring checklist

If you add or change a level, all of these have to line up or it fails at runtime:

1. The level's `name` matches its filename.
2. `currentSceneName` names a scene that exists.
3. Every entity key that is drawn has a rectangle of the same name in the clip map, and the clip
   map's rectangles are inside the sheet.
4. Every `function` on a usable or event entity is defined in `<name>.js`. A missing one throws
   a `NoSuchMethodException` onto stderr and silently does nothing in game.
5. Every `changeScene` target in the script exists in the level.
6. Every key passed to `getMessages().put`, `getNotifications().put`, `getActions().setActions`
   and `addGoal` exists in `bundle_en_<NAME>` **and** `bundle_ru_<NAME>`.
7. Item and note keys exist in `bundle_en_TEXT`, and notes also need a `_text` body.
8. Any scene reachable while carrying the light bulb has a partner scene with a `2` suffix.

Known dangling references in the shipped game, both harmless:

- `hdream3` has a garden door named `goToBarn`, a function that level does not define. Using it
  logs an exception and does nothing.
- `hend` has a door in the good-ending scene named `goOut`, also undefined. The ending is fully
  scripted and never waits for it.
