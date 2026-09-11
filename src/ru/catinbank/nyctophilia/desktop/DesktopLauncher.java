package ru.catinbank.nyctophilia.desktop;

import ru.catinbank.nyctophilia.Nyctophilia;

import com.badlogic.gdx.Files.FileType;
import com.badlogic.gdx.backends.lwjgl3.Lwjgl3Application;
import com.badlogic.gdx.backends.lwjgl3.Lwjgl3ApplicationConfiguration;

public class DesktopLauncher
{
	public static void main(String[] arg)
	{
		MemoryBackend.select();

		Lwjgl3ApplicationConfiguration config = new Lwjgl3ApplicationConfiguration();
		// The 2015 launcher read the desktop display mode and then set fullscreen, which is
		// what setFullscreenMode does in one call: borderless at the monitor's current mode.
		config.setFullscreenMode(Lwjgl3ApplicationConfiguration.getDisplayMode());
		config.setTitle("Nyctophilia");
		config.useVsync(true);
		config.setResizable(true);
		config.setWindowIcon(FileType.Internal, "stuff/icon.png");
		new Lwjgl3Application(new Nyctophilia(), config);
	}
}
