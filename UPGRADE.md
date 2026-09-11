# Upgrade notes

Moving Nyctophilia from libGDX 1.2.0, where the resurrection left it, to 1.14.2.

[RESURRECTION.md](RESURRECTION.md) ends with a list of what such a move would
cost, written from reading the API diffs. Most of that list was right. One item
was wrong, and it was the item that made the whole thing look expensive.

## The post-processing library was never the problem

The CRT screen effect runs on `com.bitfire` post-processing, a library that was
published to a dead Google Code project and never reached Maven Central. It
shipped here as `libs/gdx-postprocessing-bitfire.jar`, 2015 bytecode lifted out
of the Steam build. The prediction was that it "does not compile against modern
libGDX and has no drop-in successor", so the effect would need rebuilding on
something like gdx-vfx, and the game would look different afterwards.

Checking rather than assuming: every member the jar references was resolved
against 1.14.2 by parsing its constant pool. Out of 125 libGDX references,
**one** failed:

```
FrameBuffer.getColorBufferTexture()Lcom/badlogic/gdx/graphics/Texture;
```

`FrameBuffer` gained a generic superclass, `GLFrameBuffer<T>`, and that method
moved up into it. The descriptor baked into 2015 bytecode no longer resolves, and
five classes call it, `Filter` and `PingPongBuffer` among them, so every effect
hits it. As a binary the library is dead.

As source it is fine. `FrameBuffer extends GLFrameBuffer<Texture>`, so the call
still reads as `Texture` and recompiling emits the descriptor that resolves.
Upstream is Apache 2.0, so the 29 classes the jar contained now live in
[`third-party/postprocessing/`](third-party/postprocessing/), byte-identical to
upstream, compiled with everything else. No local edits, no gdx-vfx, no shader
work, and the effect is the one the game shipped with, because the shaders were
always in `assets/shaders/` rather than in the library.

## The rest of the game

Nine files, about 130 lines. Every call site was found the same way, by
resolving the old build's bytecode against the new libGDX, so the list is
complete rather than whatever the compiler happened to stop on first.

| What | Where |
| --- | --- |
| `Animation` is generic | `Assets` builds the player's four animations |
| `BitmapFont` rewrite: `setScale`, `drawWrapped`, `drawMultiLine`, `HAlignment` | `WorldRenderer`, `GameScreen`, `MainMenuScreen` |
| `InputProcessor.scrolled` takes two floats, `touchCancelled` is new | `GameScreen`, `MainMenuScreen`, `LanguageScreen` |
| `Gdx.input.setCursorImage` became `Graphics.newCursor` | `Nyctophilia.create` |
| LWJGL 2 backend replaced by LWJGL 3 | `DesktopLauncher`, `Smoke` |
| `ScreenUtils.getFrameBufferPixmap` deprecated | `ScreenshotFactory`, `Smoke` |

Two predictions did not survive contact. `SelectBox` was already `SelectBox<T>`
in `UIFactory`, so it needed nothing. `Assets` and `UI` were expected to need
font work; neither draws text, so the `BitmapFont` changes only touched the
renderer and the two screens that draw menus.

`Preferences` setters and `BitmapFont.draw` both changed return type, which
breaks old bytecode and nothing else. Recompiling is the entire fix.

## LWJGL, and a regression worth naming

libGDX 1.14.2 pins LWJGL 3.3.3, which does not recognise the JNI version a
current JDK reports and warns on every launch that it "may result in a crash".
That alone justified moving off the pinned version.

Then there is `sun.misc.Unsafe`. The resurrection notes called the LWJGL 2
deprecation warning "not a countdown to breakage", and demonstrated it: run with
`--sun-misc-unsafe-memory-access=deny`, which simulates the removal, and LWJGL 2
noticed the failure, fell back to reflection, and rendered the same 561 frames.

**LWJGL 3 does not do that.** Denying the method kills it in
`MemoryUtil`'s static initializer, before a window opens:

```
Caused by: java.lang.UnsupportedOperationException: objectFieldOffset
	at org.lwjgl.system.MemoryUtil.getFieldOffset(MemoryUtil.java:3008)
```

So the upgrade made that warning worse, not better. LWJGL 3.4 fixes it properly:
it added a memory backend built on the Foreign Function and Memory API that
touches no internal API at all. `MemoryBackend.select()` asks for it, guarded on
JDK 25 because that is what it needs, which leaves JDK 21 through 24 on the
default.

Overriding a pinned minor version is a real risk, so it was checked rather than
assumed. All 643 LWJGL members that libGDX's backend references resolve against
3.4.3, so no code path can reach a `NoSuchMethodError`, not just the ones the
smoke test walks.

One more thing was needed to make that work in the shipped artifact. LWJGL keeps
those classes under `META-INF/versions/`, and the JVM only looks there when the
jar's manifest says `Multi-Release: true`. Without it the fat jar carried the FFM
backend but could not see it, and LWJGL fell back to the Unsafe one, silently.
The smoke test could not have caught that, because it runs off a classpath of
real jars rather than the packaged one. Running the actual jar caught it.

## What this bought

The reason to do this at all was macOS: LWJGL 2's macOS natives were x86_64
only, so Apple Silicon needed Rosetta. The jar now carries `libgdxarm64.dylib`,
`libgdx-freetypearm64.dylib` and the whole `macos/arm64` LWJGL set.

Launching also became quiet. The 2015 stack printed a JNI warning and an Unsafe
warning on every start; both are gone, and the game runs to completion under
`--sun-misc-unsafe-memory-access=deny`.

## What changed

| | Resurrection | Now |
| --- | --- | --- |
| libGDX | 1.2.0 | 1.14.2 |
| Backend | LWJGL 2.9.1 | LWJGL 3.4.3 |
| macOS | x86_64, Rosetta on Apple Silicon | x86_64 and arm64 |
| Post-processing | 2015 jar in `libs/` | upstream source in `third-party/` |
| Off-heap memory | `sun.misc.Unsafe`, no fallback | FFM on JDK 25, `Unsafe` below |
| Launch warnings | JNI version, `Unsafe` | none |

Bytecode target is still Java 21, Rhino still runs the scripts, Gson still reads
2015 saves, and no level, script, shader or asset was touched.

## Verified, and not

`./gradlew smokeTest` boots the real game class, and the run reports level
deserialization, clip loading, Rhino, the localization bundles, the editor skin
and 561 frames ending in a clean shutdown. The screenshots show the CRT
chromatic aberration and scanlines intact, the Cyrillic font trick working and
the menu highlight the right colour. The packaged jar was launched too, twice,
once normally and once with Unsafe denied.

The editor behind `developerMode` is the one part no normal run reaches, and its
skin is a 2015 file whose widget styles libGDX has since reworked, so the smoke
test now builds one of each widget `UIFactory` makes. They all load.

Not verified: this was all done on Windows against JDK 25. Nothing here is
platform-specific and the natives ship for every desktop target, but no run
happened on macOS or Linux, and none on a JDK older than 25. The JDK 21 floor is
compiler-checked through `options.release`, not exercised.
