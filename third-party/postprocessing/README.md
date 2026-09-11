# gdx-postprocessing

The CRT screen effect. Source for what used to ship here as
`libs/gdx-postprocessing-bitfire.jar`, a 2015 binary extracted from the Steam
build because the library was never published to a repository.

Upstream is `postprocessing/` and `utils/` from
[manuelbua/libgdx-contribs](https://github.com/manuelbua/libgdx-contribs),
Copyright 2012 bmanuel, Apache License 2.0 (see `LICENSE`).

## Why it is source now

The 2015 jar has exactly one linkage break against a current libGDX:
`FrameBuffer.getColorBufferTexture()` used to return `Texture`, and now returns
`T` from the generic `GLFrameBuffer<T>` superclass. The descriptor baked into
the old bytecode no longer resolves, and five classes call it, `Filter` and
`PingPongBuffer` among them, so every effect hits it.

At the source level that call is unchanged: `FrameBuffer extends
GLFrameBuffer<Texture>`, so it still reads as `Texture`. Recompiling fixes it.
Nothing else in the library needed touching.

## Local changes

None. These files are byte-identical to upstream. The only reason they are here
rather than in a dependency block is that the library was never published.

Two things are worth knowing before editing them:

- `Filter` calls the deprecated `ShaderProgram.begin()` and `end()`. Both still
  work, `begin()` forwards to `bind()` and `end()` does nothing. This is the
  build's only deprecation note.
- The shaders these classes load are not here. They live in `assets/shaders/`,
  recovered from the same Steam build, and `ShaderLoader.BasePath` points at
  them. The CRT look is defined there, not in this Java.

## What is included

The 29 classes the shipped jar contained, no more. Upstream also carries
`Fxaa`, `Nfaa`, `LensFlare`, `LensFlare2`, `MotionBlur` and `Antialiasing`;
those were not in the 2015 build and their shaders are not in `assets/`, so
adding them would not work without also recovering the shaders.

The game itself uses a narrow slice: `PostProcessor`, `CrtMonitor`, `Combine`
and `ShaderLoader`. The rest are transitive dependencies of those.
