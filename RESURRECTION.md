# Resurrection notes

How Nyctophilia went from "source only, does not build" back to a project that
compiles and runs on a current JVM.

## What survived, and what did not

Two things were in the repository: `src/`, holding 32 Java files across
`ru.catinbank.framework` and `ru.catinbank.nyctophilia`, and `Build/`, a copy of
the Steam release. No build files, no assets, no dependency list, no launcher.

The launcher mattered because `src/` has no `main` method. Everything else
mattered because a libGDX game without its assets is a black window.

## The shipped build turned out to be the archive

`Build/Nyctophilia.sh` is not a wrapper around a jar. It is a jar, with a
three-line shell header glued to the front:

```sh
#!/bin/sh
java -jar $0 $*
exit
```

After those 31 bytes the file is an ordinary ZIP, and Java's `ZipFile` corrects
for the prefix, which is why `java -jar Nyctophilia.sh` worked on Linux. It holds
2,774 entries: the game's compiled classes, every dependency unpacked, native
libraries for three platforms, and all 215 asset files. `Nyctophilia.exe` is the
same payload behind a Windows launcher stub.

So the build was never really lost. It was sitting inside the game.

### Recovered from it

- **All 215 assets**, 105 MB, now in `assets/`. Levels, per-level sprite and
  light sheets, 14 scripts, 18 shaders, 22 music tracks, 26 sound effects, 25
  footstep samples, three fonts, the UI atlas and 30 localization bundles.
- **`DesktopLauncher.java`**, the only missing source file. Reconstructed by
  parsing the class file's constant pool and disassembling `main`, so the window
  title, icon path, vsync, resizable and fullscreen flags are the shipped values
  rather than guesses.
- **`com.bitfire` post-processing**, the library behind the CRT screen effect.
  It was published to a Google Code project that no longer exists and never
  reached Maven Central, so the 2015 classes are vendored verbatim as
  `libs/gdx-postprocessing-bitfire.jar`.
- **The dependency list**, read out of `META-INF/maven/*/pom.properties`:
  libGDX 1.2.0, LWJGL 2.9.1, jlayer 1.0.1-gdx, jorbis 0.0.17, jutils 1.0.0, and
  an unversioned Gson from the 2.2/2.3 era.

## The one thing that was actually broken

Every other part of the 2014 stack still works on Java 25. A probe built against
the shipped jar created a GL 4.6 context through LWJGL 2.9.1, loaded the libGDX
and FreeType natives, generated a font, and compiled the CRT shaders, all without
modification. Ten-year-old JNI libraries against a stable Win32 API age well.

The breakage was `javax.script`:

```java
engine = new ScriptEngineManager().getEngineByName("JavaScript");
```

That line in `ScriptLauncher` returned Rhino on Java 7 and Nashorn on Java 8.
Java 15 removed Nashorn, so on anything modern it returns `null` and the next
call throws. It is not a cosmetic failure. `assets/scripts/` holds 666 functions
across 14 files, and they drive the entire plot: every scene transition, every
line of dialogue, every puzzle state change.

The fix is to stop relying on whatever the JVM happens to bundle and name the
engine outright. Mozilla Rhino is still maintained, and `rhino-engine` supplies
the JSR-223 factory that registers under the name `JavaScript`, so
`ScriptLauncher` compiles and runs unchanged. All 14 scripts parse, and all 666
functions are callable. The two bindings the scripts depend on both behave as
they did: `thread.sleep(n)` reaches `TimeUnit.MILLISECONDS`, and JS array
literals still coerce to `String[]` for calls like
`world.getMessages().put(["sound1", "sound11"])`.

## Things that looked like problems and were not

**Text encoding.** Old Java games usually break here, because Java 18 switched
the default charset to UTF-8. This one cannot: the Russian bundles are pure
ASCII. The text was typed on a ЙЦУКЕН keyboard and stored as whatever Latin
letters sit on those keys, so "Я на месте" is saved as `Z yf vtcnt`, and
`stuff/Munro_ru.ttf` is a font with Cyrillic glyphs in the Latin slots. Picking
a language swaps the font file. It sidesteps Unicode entirely and is immune to
charset changes.

**`Gdx.files.local` for level data.** `LevelLoader` reads levels through
`Gdx.files.local`, which resolves against the working directory, while the level
files ship inside the jar. libGDX's desktop `FileHandle` falls back to the
classpath when a local file is absent, so this works from the jar and still lets
you drop a `levels/` folder next to it to override one. That is presumably how
the in-game editor worked.

**Gson compatibility.** Levels, clip maps and inventories are Gson JSON, and
saved games are that JSON stored inside `~/.prefs/nyctophilia`. The model classes
are plain fields over `HashMap`, `Vector2`, `Vector3` and `Rectangle`, so the
wire format is unchanged and Gson 2.11 reads 2015 saves.

## What changed

| | 2015 | Now |
| --- | --- | --- |
| Bytecode target | Java 6 | Java 21 |
| Tested on | Java 7 | JDK 25 |
| JavaScript | whatever `javax.script` provided | Rhino 1.8.0, named explicitly |
| Gson | ~2.2 | 2.11.0 |
| Build | unknown, lost | Gradle 9.7.1 |
| libGDX | 1.2.0 | 1.2.0, unchanged |

Only `DesktopLauncher.java` is new. No existing source file was edited.

## Verification

`./gradlew smokeTest` boots the real `Nyctophilia` class, and the run confirms
level deserialization, clip loading, the script engine, the localization bundles
and 561 rendered frames ending in a clean shutdown.

Entry-by-entry, the rebuilt jar is a superset of the shipped one. Every asset,
native library, bundle, level, script, shader, texture and sound is present. The
only entries that disappeared are `com.badlogic.gdx.jnigen` and its bundled
JavaParser, both build-time tooling; the 3D particle system, which this game
never touches; a `package-info.class`; and eleven Gson date adapters that the
newer release reorganized.

That diff also shows the shipped build used a libGDX nightly between 1.2.0 and
1.3.0 rather than the 1.2.0 release, since it carries `g3d.particles` classes the
released jar does not. Nothing in the game references them.

## If you ever want to move off libGDX 1.2.0

Staying on 1.2.0 is what makes this a small change, and it costs nothing today.
Moving to a current libGDX is a genuine migration, not a version bump:

- `Animation` became generic and `SelectBox` became `SelectBox<T>`.
- `BitmapFont` was rewritten in 1.6.0. `HAlignment` is gone, and `Assets`, `UI`
  and `WorldRenderer` all draw text.
- `InputProcessor.scrolled` changed signature and `touchCancelled` was added.
- `Gdx.input.setCursorImage` and
  `LwjglApplicationConfiguration.getDesktopDisplayMode`, both used by the
  launcher and `Nyctophilia.create`, no longer exist.
- The LWJGL 2 backend is gone, so this becomes an LWJGL 3 port as well.
- `com.bitfire` post-processing does not compile against modern libGDX and has no
  drop-in successor, so the CRT effect would need rebuilding on something like
  gdx-vfx.

The one real argument for doing it is macOS. LWJGL 2's macOS natives are x86_64
only, so Apple Silicon needs Rosetta. Windows and Linux are unaffected.
