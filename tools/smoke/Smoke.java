import com.badlogic.gdx.ApplicationListener;
import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.backends.lwjgl3.Lwjgl3Application;
import com.badlogic.gdx.backends.lwjgl3.Lwjgl3ApplicationConfiguration;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.PixmapIO;

import java.nio.ByteBuffer;

/** Boots the real game class windowed, grabs frames, then quits. */
public class Smoke implements ApplicationListener {
    private final ru.catinbank.nyctophilia.Nyctophilia game = new ru.catinbank.nyctophilia.Nyctophilia();
    private int frame = 0;
    private static String shotDir;

    public void create() {
        say("--- boot ---");
        try {
            game.create();
            say("Nyctophilia.create() OK, screen = " + game.getScreen().getClass().getSimpleName());
        } catch (Throwable t) { fail("Nyctophilia.create()", t); Gdx.app.exit(); return; }

        // Exercise the pieces the shipped build depends on, outside the UI flow.
        try {
            ru.catinbank.nyctophilia.Level lv = ru.catinbank.framework.LevelLoader.loadLevel("intro");
            say("Gson level load  OK  name=" + lv.getName() + " scene=" + lv.getSceneName()
                + " entities=" + lv.getScene().getEntities().size()
                + " lights=" + lv.getScene().getLights().size());
        } catch (Throwable t) { fail("LevelLoader.loadLevel", t); }
        try {
            ru.catinbank.framework.ClipManager cm = ru.catinbank.framework.LevelLoader.loadClips("intro");
            say("Gson clips load  OK  itemRects=" + cm.getItemRects().size()
                + " lightRects=" + cm.getLightRects().size());
        } catch (Throwable t) { fail("LevelLoader.loadClips", t); }
        try {
            javax.script.ScriptEngine e = new javax.script.ScriptEngineManager().getEngineByName("JavaScript");
            say("ScriptEngine     " + (e == null ? "NULL" : e.getClass().getName()));
        } catch (Throwable t) { fail("ScriptEngine", t); }
        try {
            ru.catinbank.nyctophilia.Assets.loadLevelLanguage("intro");
            say("I18N bundle      OK  sample=\"" + ru.catinbank.nyctophilia.Assets.level_bundle.get("walking") + "\"");
        } catch (Throwable t) { say("I18N bundle probe: " + t); }
        // The level editor behind developerMode is the one part of the game no normal run
        // reaches, and its skin is a 2015 file whose widget styles libGDX has since reworked.
        // Build one of each widget UIFactory makes, so an upgrade cannot break it unnoticed.
        try {
            ru.catinbank.framework.UIFactory.newLabel("x");
            ru.catinbank.framework.UIFactory.newTextfield("x");
            ru.catinbank.framework.UIFactory.newCheckBox("x");
            ru.catinbank.framework.UIFactory.newButton("x", new com.badlogic.gdx.scenes.scene2d.utils.ClickListener());
            ru.catinbank.framework.UIFactory.newSelectBox(new String[] {"a", "b"},
                new com.badlogic.gdx.scenes.scene2d.utils.ChangeListener() {
                    public void changed(ChangeEvent e, com.badlogic.gdx.scenes.scene2d.Actor a) {}
                });
            say("Editor UI skin   OK  label, textfield, checkbox, button, selectbox");
        } catch (Throwable t) { fail("Editor UI skin", t); }
    }

    public void render() {
        try { game.render(); } catch (Throwable t) { fail("render frame " + frame, t); Gdx.app.exit(); return; }
        frame++;
        if (frame == 30 || frame == 150 || frame == 330 || frame == 520) shot("frame" + frame);
        if (frame > 560) Gdx.app.exit();
    }

    private void shot(String name) {
        try {
            int w = Gdx.graphics.getWidth(), h = Gdx.graphics.getHeight();
            Pixmap p = Pixmap.createFromFrameBuffer(0, 0, w, h);
            ByteBuffer px = p.getPixels();
            byte[] lines = new byte[w * h * 4];
            int per = w * 4;
            for (int i = 0; i < h; i++) { px.position((h - i - 1) * per); px.get(lines, i * per, per); }
            px.clear(); px.put(lines);
            PixmapIO.writePNG(new FileHandle(shotDir + "/" + name + ".png"), p);
            p.dispose();
            say("screenshot " + name + ".png  (" + w + "x" + h + ")");
        } catch (Throwable t) { fail("screenshot", t); }
    }

    public void resize(int w, int h) { game.resize(w, h); }
    public void pause() {}
    public void resume() {}
    public void dispose() { say("--- frames rendered: " + frame + " ---"); }

    static void say(String s) { System.out.println("[SMOKE] " + s); System.out.flush(); }
    static void fail(String w, Throwable t) { System.out.println("[SMOKE] " + w + " FAILED: " + t); t.printStackTrace(System.out); System.out.flush(); }

    public static void main(String[] a) {
        shotDir = a[0];
        // Same call the real launcher makes, so the smoke run exercises the shipped configuration.
        ru.catinbank.nyctophilia.desktop.MemoryBackend.select();
        Lwjgl3ApplicationConfiguration c = new Lwjgl3ApplicationConfiguration();
        c.setWindowedMode(1280, 720);
        c.setTitle("Nyctophilia (smoke test)");
        c.useVsync(true);
        c.setResizable(false);
        // LWJGL 2 needed forceExit=false here, or it ended the process with System.exit(-1)
        // and the build read that as a failure. The LWJGL 3 backend just returns from main.
        new Lwjgl3Application(new Smoke(), c);
    }
}
