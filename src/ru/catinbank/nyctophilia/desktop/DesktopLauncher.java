package ru.catinbank.nyctophilia.desktop;

import ru.catinbank.nyctophilia.Nyctophilia;

import com.badlogic.gdx.Files.FileType;
import com.badlogic.gdx.backends.lwjgl.LwjglApplication;
import com.badlogic.gdx.backends.lwjgl.LwjglApplicationConfiguration;

public class DesktopLauncher 
{
	public static void main(String[] arg) 
	{
		LwjglApplicationConfiguration config = new LwjglApplicationConfiguration();
		config.setFromDisplayMode(LwjglApplicationConfiguration.getDesktopDisplayMode());
		config.title = "Nyctophilia";
		config.vSyncEnabled = true;
		config.resizable = true;
		config.addIcon("stuff/icon.png", FileType.Internal);
		config.fullscreen = true;
		new LwjglApplication(new Nyctophilia(), config);
	}
}
