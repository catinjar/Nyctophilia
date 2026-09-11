function useLampItem()
{
	world.getMessages().put(["cantuse1"]);
}

function useScrap()
{
	world.getMessages().put(["cantuse2"]);
}

function start()
{
	world.setMusic("In The End");
	world.getLevel().setLightEnabled(true);
	world.getLevel().setEffectEnabled(true);
	world.getPlayer().getLight().setVisible(false);
	world.getPlayer().setX(270);
	world.getPlayer().lookLeft();
	
	world.setStepSound("cave");
	
	world.Save();
}

function lookAtMe()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["me1", "me2", "me3"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	thread.sleep(3000);
	world.getPlayer().setX(100);
	world.getPlayer().lookRight();
	world.changeScene("oldman");
	thread.sleep(4000);
	world.getMessages().put(["old1", "old2", "old3", "old4"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	thread.sleep(3000);
	world.changeScene("tallman");
	thread.sleep(4000);
	world.getMessages().put(["tall1", "tall2", "tall3"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	thread.sleep(3000);
	world.getPlayer().setVisible(false);
	world.changeScene("purgatory");
	thread.sleep(4000);
	world.getMessages().put(["talk1", "talk2", "talk3", "talk4", "talk5", "talk6", "talk7"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	thread.sleep(3000);
	world.getPlayer().getLight().setVisible(true);
	world.getPlayer().setVisible(true);
	world.setMusic("I Know Who You Are");
	world.changeScene("girl");
	thread.sleep(4000);
	world.getMessages().put(["girl1", "girl2", "girl3", "girl4", "girl5", "girl6", "girl7", "girl8", "girl9", "girl10"]);
	world.getMessages().put(["girl11", "girl12", "girl13", "girl14", "girl15", "girl16", "girl17", "girl18"]);
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	thread.sleep(4400);
	world.getMessages().deleteCurrent();
	world.getLevel().getScene().getEntity("door").setVisible(true);
	thread.sleep(4000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
}

function BadEnding()
{
	world.setMusic("Nyctophilia - Shattered Dreams");
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["bad1", "bad2"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	world.changeScene("bad");
	thread.sleep(500);
	world.getPlayer().setX(140);
	world.getPlayer().lookRight();
	world.getMessages().put(["bad3", "bad4", "bad5", "bad6", "bad7", "bad8", "bad9", "bad10", "bad11", "bad12", "bad13"]);
	world.getMessages().put(["bad14", "bad15", "bad16", "bad17"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	world.stopMusic();
	thread.sleep(3000);
	ExtendedEnding();
}

function GoodEnding()
{
	if(world.getFuck() >= 25)
	{
		world.setMusic("Trailer");
		world.setPauseBlocked(true);
		world.getPlayer().setLocked(true);
		world.getMessages().put(["good01", "good02"]);
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.playSound("door");
		world.fadeIn();
		thread.sleep(4000);
		world.changeScene("good");
		thread.sleep(500);
		world.getLevel().setLightEnabled(false);
		world.getLevel().setEffectEnabled(false);
		world.getPlayer().getLight().setVisible(false);
		world.getPlayer().setX(140);
		world.getPlayer().lookRight();
		world.getMessages().put(["good3", "good4", "good5", "good6", "good7", "good8", "good9", "good10", "good11", "good12", "good13"]);
		world.getMessages().put(["good14", "good15"]);
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.getMessages().deleteCurrent();
		thread.sleep(4000);
		world.fadeIn();
		world.stopMusic();
		thread.sleep(3000);
		ExtendedEnding();
	}
	else
		world.getMessages().put(["fuckingcant"]);
}

function ExtendedEnding()
{
	world.changeScene("extended");
	world.getPlayer().setVisible(false);
	thread.sleep(4000);
	world.getMessages().put(["e1", "e2", "e3", "e4"]);
	world.getMessages().put(["e41", "e42", "e43", "e44", "e45", "e46", "e47"]);
	world.getMessages().put(["e5", "e6", "e7", "e8", "e9", "e10"]);
	world.getMessages().put(["e11", "e12", "e13", "e14", "e15", "e16", "e17", "e18", "e19", "e20"]);
	world.getMessages().put(["e21", "e22", "e23", "e24", "e25", "e26", "e27", "e28", "e29"]);
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.fadeIn();
	thread.sleep(3000);
	world.changeLevel("hcredits");
}