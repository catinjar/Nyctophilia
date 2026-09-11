package ru.catinbank.framework;

import java.nio.ByteBuffer;

import com.badlogic.gdx.Gdx;
import com.badlogic.gdx.files.FileHandle;
import com.badlogic.gdx.graphics.Pixmap;
import com.badlogic.gdx.graphics.PixmapIO;

public class ScreenshotFactory 
{
    private static int counter = 1;
    
    public static void saveScreenshot()
    {
        try{
            FileHandle fh;
            do{
                fh = new FileHandle("screenshot" + counter++ + ".png");
            }while (fh.exists());
            Pixmap pixmap = getScreenshot(0, 0, Gdx.graphics.getWidth(), Gdx.graphics.getHeight(), true);
            PixmapIO.writePNG(fh, pixmap);
            pixmap.dispose();
        }catch (Exception e){           
        }
    }

    private static Pixmap getScreenshot(int x, int y, int w, int h, boolean yDown)
    {
        // ScreenUtils.getFrameBufferPixmap is deprecated and forwards here. Still bottom-up,
        // so the row flip below is still needed.
        final Pixmap pixmap = Pixmap.createFromFrameBuffer(x, y, w, h);

        if (yDown) 
        {
            ByteBuffer pixels = pixmap.getPixels();
            int numBytes = w * h * 4;
            byte[] lines = new byte[numBytes];
            int numBytesPerLine = w * 4;
            for (int i = 0; i < h; i++) {
                pixels.position((h - i - 1) * numBytesPerLine);
                pixels.get(lines, i * numBytesPerLine, numBytesPerLine);
            }
            pixels.clear();
            pixels.put(lines);
        }
        return pixmap;
    }
}
