# Technical implementation

How the game is built, from the launcher down to the pixel shader. For the history of how it
got here, see [RESURRECTION.md](../RESURRECTION.md) and [UPGRADE.md](../UPGRADE.md).

## Stack

| Piece | Version | Why |
| --- | --- | --- |
| Java | target 21, developed on 25 | `options.release = 21` is compiler-checked |
| libGDX | 1.14.2 | 2015 shipped 1.2.0; see UPGRADE.md |
| Backend | LWJGL 3.4.3 | Overrides libGDX's pinned 3.3.3, to get the FFM memory backend |
| Scripting | Mozilla Rhino 1.8.0 plus `rhino-engine` | Java 15 removed Nashorn; Rhino registers as `JavaScript` |
| JSON | Gson 2.11.0 | Reads the 2015 wire format unchanged |
| Post-processing | `com.bitfire`, vendored source | Never reached Maven Central |
| Build | Gradle 9.7.1 wrapper | The original build files were lost |

`sourceSets.main.java.srcDirs` is `['src', 'third-party/postprocessing']` and
`resources.srcDirs` is `['assets']`. Mapping assets to resources reproduces the 2015 jar
layout, so `Gdx.files.internal("stuff/UI.png")` and `Gdx.files.classpath("bundle")` resolve
exactly as they did in the shipped build.

## Startup

[DesktopLauncher.java](../src/ru/catinbank/nyctophilia/desktop/DesktopLauncher.java) calls
`MemoryBackend.select()` first, then builds an LWJGL 3 configuration: borderless fullscreen at
the monitor's current mode, vsync on, resizable, window icon `stuff/icon.png`, title
Nyctophilia.

[MemoryBackend.java](../src/ru/catinbank/nyctophilia/desktop/MemoryBackend.java) sets the LWJGL
memory backend to the Foreign Function and Memory one when running on JDK 25 or newer and the
property is not already set. LWJGL's default backend uses an internal JDK API, and unlike
LWJGL 2 it has no fallback: denying that method kills it in a static initializer before a
window opens.

[Nyctophilia.java](../src/ru/catinbank/nyctophilia/Nyctophilia.java) creates a sprite batch
capped at 127 sprites, loads settings and assets, installs the mouse cursor, then shows the
logo screen, or the game screen straight away when developer mode is on.

## Screens

| Screen | Role |
| --- | --- |
| `LogoScreen` | 3.5 second studio logo at full screen resolution, CRT pass on, any key skips |
| `LanguageScreen` | Two flags, shown only on first launch |
| `MainMenuScreen` | Scrolling background at a 1920x1080 virtual viewport; Continue, New Game, Options, Exit |
| `GameScreen` | The game. Owns the world, the renderer, and in developer mode the editor panel |

The main menu waits for both the screen fade and the music fade to finish before switching, so
the menu track never cuts off mid-note.

## World model

```
Level                     name, currentSceneName, lightEnabled, effectEnabled
 └─ Map<String, Scene>    a scene is one side-scrolling room
     ├─ Map<String, Entity>   position, bounds, function, visible/collision/usable/event
     ├─ Map<String, Light>    Light extends Entity, nothing added
     └─ startX, minX, maxX, intensity, color (Vector3)
```

`Entity` carries four independent booleans:

- **visible** drawn this frame
- **collision** the player is pushed back out of its bounds
- **usable** walking within reach selects it, and X runs its function
- **event** combined with usable, fires its function on proximity with no keypress

Entity maps are `LinkedHashMap`, so JSON order is draw order. Scene maps are `HashMap`, so
scene order in the file means nothing.

[World.java](../src/ru/catinbank/nyctophilia/World.java) holds the level, the player, the
inventory, the script launcher, the message queue, the notification queue, the action list and
the screen fader. Its state enum gates everything: running, changing scene, changing level,
reading, editing entity, editing light, paused menu, paused options.

Collision runs every frame over the current scene's entities. It clamps the player to the
scene's horizontal bounds, reverses movement on any colliding visible entity, and picks at most
one selected entity: the last one in iteration order whose centre is within half the two widths
plus three units. There is no nearest-first logic, so overlapping usable entities resolve by
map order.

## Rendering

[WorldRenderer.java](../src/ru/catinbank/nyctophilia/WorldRenderer.java) renders a 320x180
orthographic viewport, with a second camera at the same size for the interface. The player is
fixed at y 15 and the camera follows on x only, clamped to the scene bounds.

Each frame does three passes.

1. **Light pass.** Every visible light in the scene, plus the player's lamp, is drawn into a
   screen-sized frame buffer with `defaultShader.glsl`. Lights are ordinary textured quads cut
   from the level's light sheet.
2. **Scene pass.** The frame buffer is bound to texture unit 1 and entities are drawn with
   `pixelShader.glsl`, which multiplies the diffuse colour by the ambient term plus the light
   map. Per-scene colour and intensity become that ambient term, which is how one sprite sheet
   reads as daylight in one room and blue night in another.
3. **CRT pass.** The post processor runs a CRT monitor effect with chromatic aberration plus
   tweaked contrast, phosphor vibrance, scanlines and tint. The combine pass is set to pure
   source 2, so the effect fully replaces the raw image.

Interface is drawn last, with no shader, on the interface camera.

`setLightOptions()` re-uploads the ambient uniform, and is called on construction and on every
scene or level change. A level's `lightEnabled` flag disables both the light pass and the post
processor, which is how the intro title cards and the flat day-number screens render clean.

### Known rendering limitation

Screen width and height are read once in the constructor and `resize()` is empty, so resizing
the window does not resize the frame buffer or the post processor. The launcher starts
fullscreen, which is the only configuration the game was shipped in.

## Scripting

[ScriptLauncher.java](../src/ru/catinbank/framework/ScriptLauncher.java) is 56 lines and is the
most important file in the project.

```java
engine = new ScriptEngineManager().getEngineByName("JavaScript");
engine.put("world", world);
engine.put("thread", TimeUnit.MILLISECONDS);
```

Scripts therefore see exactly two globals. `world` is the live `World` instance, so every
public method on it is script API. `thread.sleep(n)` is a millisecond sleep, and is how
cutscenes are paced.

`setFile(name)` evaluates `scripts/<name>.js` into the engine when a level loads. Definitions
accumulate, because the engine is never reset, so later levels can still see earlier functions.
In practice each level defines every name it needs.

`launch(fn)` starts a **new Java thread** per call. Script code runs concurrently with rendering
and mutates world state directly. There is no synchronization anywhere. This is the original
design and the game depends on it: a script that sleeps for fifteen seconds mid-cutscene must
not block the render loop.

Scripts reach three global collections.

- `world.getMessages().put([...])` is the subtitle queue. Keys resolve against the current level
  bundle and the player advances it with X.
- `world.getNotifications().put([...])` is the top-of-screen hint line, which expires after
  three seconds.
- `world.getActions().setActions([...])` is a small vertical choice menu, navigated with up and
  down, confirmed with X.

A JavaScript array literal coerces to a Java string array for these calls under Rhino, the same
as it did under the 2015 engine.

### Script bridge quirk

`ScriptLauncher.launch` has no braces on its null guard.

```java
if(function != null)
    this.function = function;
    Thread thread = new Thread(this);
    thread.start();
```

A thread is started unconditionally. Calling an entity whose function is null therefore re-runs
whatever function ran last. Every shipped entity that is usable has a function, so this never
surfaces in normal play, but it is live if new content is authored.

## Localization

Three bundle instances, all keyed off the language flag, where true means English.

| Field | Base | Holds |
| --- | --- | --- |
| `Assets.bundle` | `strings/bundle` | Menu chrome: Press X, Items, Notes, Tasks, Continue, New Game, Options, Sound, New goal |
| `Assets.text_bundle` | classpath `bundle`, locale `xx_TEXT` | Inventory item names, note titles, and note bodies under a `_text` suffix |
| `Assets.level_bundle` | classpath `bundle`, locale `xx_<LEVEL>` | Dialogue, goal labels and action-menu labels for the loaded level |

The level trick is building a locale whose country component is the level name. Java normalizes
country to uppercase, so the bundle lookup lands on `bundle_en_HDAY1.properties`. That is why
every bundle filename is uppercase after the language tag.

All fifteen bundle pairs carry identical key sets. Russian is stored as real UTF-8 Cyrillic and
rendered with Ark Pixel; the 2015 fake-Latin encoding and its trick font are described in
[LOCALIZATION.md](../LOCALIZATION.md). `Assets.loadLanguage` appends the Cyrillic block to the
FreeType character set, because libGDX's default set stops at Latin-1 and Russian would
otherwise draw blank.

## Save format

[Settings.java](../src/ru/catinbank/nyctophilia/Settings.java) writes everything into libGDX
preferences under the name nyctophilia, which on desktop is `~/.prefs/nyctophilia`.

| Key | Contents |
| --- | --- |
| `file1` | The whole level, serialized by Gson. Includes every entity's current visibility, usability and function, so puzzle progress is implicit in the level dump |
| `file2` | The clip map for that level |
| `file3` | The inventory: items, notes, goals, selectors |
| `x`, `character`, `light` | Player position, which of the two bodies is active, whether the lamp is on |
| `music`, `stopped` | Current track name and whether it was faded out |
| `step` | Current footstep surface |
| `language`, `sound`, `first`, `save`, `actions` | Settings and the progress counter |

There is one save slot. `World.Save()` is called by scripts, usually at the top of a level's
`start`, and by the pause menu's Save and exit. Loading reconstructs the level from `file1`
rather than from `assets/levels/`, and does **not** re-run `start`.

Because progress is a dump of live object state, any change to the model classes' field names
or types silently breaks old saves.

## Audio

`Assets.playSound(name)` reads `sounds/<name>.mp3`, caching one sound by name so a repeated
effect is not reloaded. The writing sound is special-cased to pick one of five variants at
random every time. Sounds are loaded on demand and never disposed.

Footsteps are separate. They fire every 0.6 seconds while walking, picking a random sample from
the current surface and refusing to repeat the previous index. Five surfaces, five samples
each: cave, dream, grass, tile, wood. Scripts set the surface with `world.setStepSound("wood")`.

[MusicFader.java](../src/ru/catinbank/framework/MusicFader.java) owns the single looping music
instance and cross-fades between tracks: request a new track while one is playing and it fades
the old one to zero, disposes it, loads the new one, and fades up. Maximum volume is 0.6, or
zero when sound is disabled.

### Fader naming is inverted

Both [Fader](../src/ru/catinbank/framework/Fader.java) and the music fader use `fadeIn()` to
mean *fade towards nothing* and `fadeOut()` to mean *fade back to normal*.

- `Fader.fadeIn()` drives the sprite batch alpha to zero, which blacks out the screen. The
  `FADED_IN` state means the screen is black.
- `Fader.fadeOut()` drives it to one. `FADED_OUT` means the picture is visible, and is the
  starting state.
- `World.playMusic()` calls the music fader's `fadeOut()`, and `World.stopMusic()` calls its
  `fadeIn()`.

Every script in `assets/scripts/` follows this convention. Do not correct it.

## Developer mode

`Nyctophilia.developerMode` is a compile-time false. Setting it true boots straight into the
game screen with no level loaded, swaps the cursor, and attaches
[UI.java](../src/ru/catinbank/nyctophilia/UI.java), a scene2d level editor. See
[levels.md](levels.md) for what it does.

The editor skin is `stuff/uiskin.json`, a 2015 file whose widget styles libGDX has since
reworked. The smoke test builds one of each widget the factory makes, so an upgrade cannot
break it unnoticed.

## Input

| Key | Action |
| --- | --- |
| Left and Right, A and D | Walk; in menus and inventory, change section or option |
| Up and Down, W and S | Move through inventory entries and action menus |
| X | Use the selected entity, advance a message, confirm a menu choice |
| Tab | Open and close the inventory |
| Escape | Pause menu, or back out of a note or the options page |
| F1 | Screenshot, written as `screenshotN.png` in the working directory |
| Space, Z, F2 | Editor only: toggle the panel, delete the selection, save settings and quit |

The pause and main menus read raw arrow keys only; WASD works in the world but not there. A
script calls `world.setPauseBlocked(true)` to make a cutscene unskippable.

## Known quirks worth knowing before you touch them

- **`World.getFuck()` is the good-ending counter.** It returns `Settings.actions`, which
  `World.settingsAction()` raises and `hend.js` tests against 25. The shipped build never
  incremented it, which made the good ending unreachable; that is the one behavioural fix this
  repository applies. See [game-design.md](game-design.md).
- **Scene-name comparisons use reference equality on strings.** `World.updateChanging` compares
  the current scene name to the next one with `!=`. It works because both sides come from the
  same interned literals in the script files.
- **Level-change fading uses `compareTo`.** The automatic fade only triggers when the new level
  name sorts after the old one. Every script calls `world.fadeIn()` itself before changing
  level, so the automatic path is decoration.
- **Textures are never disposed.** `Assets.dispose()` clears two maps and leaves every texture,
  sound and font to process exit.
- **Inventory tab rectangles are chosen once**, at construction, from the language flag.
  Switching language mid-game leaves the tab boxes sized for the old one.
- **`assets/sfd.ser`** is a Java-serialized array of 512 floats that nothing in the source or
  the scripts references. Leftover, recovered with everything else.
- **`assets/levels/null.txt`** is an empty editor template whose current scene name refers to a
  scene it does not contain. Loading it through the normal path throws.
