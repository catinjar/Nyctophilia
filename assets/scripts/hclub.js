function useLampItem()
{
	world.getMessages().put(["cantuse1"]);
}

function useScrap()
{
	world.getMessages().put(["not"]);
}

function start()
{
	world.setMusic("Woody Smoke Session");
	world.getLevel().setLightEnabled(true);
	world.getPlayer().getLight().setVisible(false);
	world.getPlayer().setX(100);
	world.getPlayer().lookRight();
	
	world.setStepSound("tile");
	
	world.Save();
}

function goToClub()
{
	world.playSound("door");
	world.changeScene("club");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setStepSound("wood");
}

function goFromClub()
{
	world.playSound("door");
	world.changeScene("street");
	thread.sleep(500);
	world.getPlayer().setX(270);
	
	world.setStepSound("tile");
}

function goToGirl()
{
	world.playSound("door");
	world.changeScene("girl");
	thread.sleep(500);
	world.setPauseBlocked(true);
	world.getPlayer().getLight().setVisible(true);
	world.getPlayer().setLocked(true);
	world.getPlayer().setX(270);
	world.getPlayer().lookLeft();
	world.stopMusic();
	thread.sleep(6000);
	world.getMessages().put(["girl1", "girl2"]);
	thread.sleep(5000);
	world.getMessages().deleteCurrent();
	thread.sleep(5000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	thread.sleep(5000);
	world.changeLevel("hpast");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
}

function Talk()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["talk1", "talk2", "talk3", "talk4"]);
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
	thread.sleep(6000);
	world.fadeOut();
	world.getMessages().put(["talk5", "talk6", "talk7"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getLevel().getScene().getEntity("chair").setUsable(false);
	world.getLevel().getScene().getEntity("door_out").setFunction("goToGirl");
}