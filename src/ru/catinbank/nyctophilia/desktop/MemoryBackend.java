package ru.catinbank.nyctophilia.desktop;

/**
 * Chooses how LWJGL reaches off-heap memory.
 *
 * LWJGL still defaults to a backend built on sun.misc.Unsafe, which every JVM since 24
 * warns about and a later one will remove. LWJGL 2 survived that: deny it the method and
 * it fell back to reflection and ran anyway. LWJGL 3 has no fallback, and denying it stops
 * the game during static initialization, before a window ever opens.
 *
 * LWJGL 3.4 added a backend on the Foreign Function and Memory API that touches no
 * internal API at all. It needs a JDK 25, so it is selected only there, which leaves the
 * default untouched on the JDK 21 this project still builds for. An explicit
 * -Dorg.lwjgl.system.memoryBackend on the command line always wins.
 */
public final class MemoryBackend
{
	private static final String PROPERTY = "org.lwjgl.system.memoryBackend";

	private MemoryBackend() {}

	/** Call before touching any LWJGL class; the backend is picked once, on first use. */
	public static void select()
	{
		if(System.getProperty(PROPERTY) == null && Runtime.version().feature() >= 25)
			System.setProperty(PROPERTY, "ffm");
	}
}
