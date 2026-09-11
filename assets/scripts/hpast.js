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
	world.getLevel().setLightEnabled(false);
	world.getPlayer().getLight().setVisible(false);
	world.getPlayer().setX(150);
	world.getPlayer().lookRight();
	world.getMessages().put(["wake1", "wake2", "wake3"]);
	world.getInventory().deleteItem("lampitem");
	world.getInventory().deleteItem("scrapitem");
	world.setMusic("Day");
	
	world.setStepSound("wood");
	
	world.Save();
}

function useBed()
{
	world.getMessages().put(["bed1"]);
}

function useLamp1()
{
	world.getLevel().getScene().getLight("light1").setVisible();
	world.playSound("click2");
}

function useLamp2()
{
	world.getLevel().getScene().getLight("light2").setVisible();
	world.playSound("click2");
}

function useLight()
{
	world.getLevel().getScene().getLight("clicker").setVisible();
	world.playSound("click2");
}

function goToCorridor()
{
	world.playSound("door");
	world.changeScene("corridor");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToBed()
{
	world.playSound("door");
	world.changeScene("bed");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function Room1()
{
	world.getMessages().put(["roomm1"]);
}

function Room2()
{
	world.getMessages().put(["roomm2"]);
}

function Read()
{
	world.settingsAction();
	world.getInventory().addNote("letter6");
	world.readNote();
	world.getLevel().getScene().getEntity("note").setVisible(false);
}

function goOut()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	thread.sleep(2000);
	world.getMessages().put(["out1", "out2", "out3"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.fadeIn();
	thread.sleep(3000);
	world.getPlayer().setX(80);
	world.getPlayer().lookRight();
	world.changeScene("street");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	
	world.setStepSound("tile");
}

function lookAtCar()
{
	world.getMessages().put(["car1"]);
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

function Talk()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["talk1", "talk2", "talk3", "talk4", "talk5", "talk6", "talk7", "talk8", "talk9", "talk10", "talk11", "talk12", 
								"talk13", "talk14"]);
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
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getLevel().getScene().getEntity("chair").setUsable(false);
	world.getLevel().getScene("street").getEntity("car").setUsable(true);
	world.getLevel().getScene("street").getEntity("car").setFunction("lookAtCar2");
}

function lookAtCar2()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["car2", "car3"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	world.playSound("engine");
	world.getPlayer().setX(900);
	world.getPlayer().lookLeft();
	thread.sleep(3000);
	world.changeScene("hotel");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	
	world.setStepSound("wood");
}

function useClicker()
{
	world.getLevel().getScene().getLight("clicker").setVisible();
	world.playSound("click2");
}

function goAway1()
{
	world.getMessages().put(["away1"]);
}

function goToRoom1()
{
	world.getMessages().put(["room11"]);
}

function goToRoom2()
{
	world.getMessages().put(["room22"]);
}

function goToRoom3()
{
	world.getMessages().put(["room3"]);
}

function goToRoom4()
{
	world.getMessages().put(["room4"]);
}

function talkToGuy()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["admin1", "admin2", "admin3", "admin4", "admin5"]);
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
	thread.sleep(3000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getLevel().getScene().getEntity("guy").setUsable(false);
	world.getLevel().getScene().getEntity("door_out").setFunction("goAway2");
}

function goAway2()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["away2"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	thread.sleep(3000);
	world.changeLevel("hdream3");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
}