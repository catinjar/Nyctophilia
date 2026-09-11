function useLampItem()
{
	world.changeCharacterScene();
	thread.sleep(500);
	world.getPlayer().changeCharacter();
	world.getInventory().changeItems();
}

function useKey()
{
	if(world.getSelectedKey() == "door2")
	{
		world.playSound("usekey");
		world.getLevel().getScene().getEntity("door2").setFunction("goToOther2");
		world.getLevel().getScene("puzzle").getEntity("door2").setFunction("goToEnd3");
		world.getInventory().deleteItem("keydream");
	}
	else
		world.getMessages().put(["notkey"]);
}

function start()
{
	world.getLevel().setLightEnabled(true);
	world.getPlayer().getLight().setVisible(true);
	world.getPlayer().setX(30);
	world.getPlayer().lookRight();
	world.setMusic("Misanthropy");
	
	world.setStepSound("dream");
	
	world.Save();
}

function goFromBegin()
{
	world.playSound("door");
	world.changeScene("eyes1");
	thread.sleep(500);
	world.getPlayer().setX(40);
}

function goToBegin()
{
	world.playSound("door");
	world.changeScene("begin");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToEyes2()
{
	world.playSound("door");
	world.changeScene("eyes2");
	thread.sleep(500);
	world.getPlayer().setX(40);
}

function goToEyes1()
{
	world.playSound("door");
	world.changeScene("eyes1");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToEyes3()
{
	world.playSound("door");
	world.changeScene("eyes3");
	thread.sleep(500);
	world.getPlayer().setX(40);
}

function goFromEyes3()
{
	world.playSound("door");
	world.changeScene("eyes2");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToPuzzle()
{
	world.playSound("door");
	world.changeScene("puzzle");
	thread.sleep(500);
	world.getPlayer().setX(40);
	
	world.setStepSound("cave");
}

function readLetter1()
{
	world.settingsAction();
	world.getInventory().addNote("letter1");
	world.readNote();
	world.getLevel().getScene().getEntity("note1").setVisible(false);
}

function readLetter2()
{
	world.settingsAction();
	world.getInventory().addNote("letter2");
	world.readNote();
	world.getLevel().getScene().getEntity("note2").setVisible(false);
}

function readLetter3()
{
	world.settingsAction();
	world.getInventory().addNote("letter3");
	world.readNote();
	world.getLevel().getScene().getEntity("note3").setVisible(false);
}

function goFromPuzzle()
{
	world.playSound("door");
	world.changeScene("eyes3");
	thread.sleep(500);
	world.getPlayer().setX(270);
	
	world.setStepSound("dream");
}

function goFromPuzzle2()
{
	world.getMessages().put(["cantescape"]);
}

function goToEnd()
{
	world.getMessages().put(["locked"]);
	world.getLevel().getScene().getEntity("table").setVisible(true);
	world.getLevel().getScene().getEntity("lamp").setVisible(true);
	world.getLevel().getScene().getEntity("door2").setFunction("goToEnd2");
}

function goToEnd2()
{
	world.getMessages().put(["locked"]);
}

function useLamp()
{
	world.getLevel().getScene().getEntity("lamp").setVisible(false);
	world.getInventory().addItem("lampitem", "useLampItem", 50, 0);
	world.getInventory().changeItems();
	world.getInventory().addItem("lampitem", "useLampItem", 50, 0);
	world.getInventory().changeItems();
	world.getMessages().put(["lamp1", "lamp2", "lamp3"]);
	world.getLevel().getScene().getEntity("door1").setFunction("goFromPuzzle2");
}

function goTry()
{
	world.getMessages().put(["trylocked"]);
}

function goToOther()
{
	world.getMessages().put(["otherlocked"]);
}

function getKey()
{
	world.playSound("key");
	world.getInventory().addItem("keydream", "useKey", 25, 0);
	world.getLevel().getScene().getEntity("key").setVisible(false);
}

function goToOther2()
{
	world.changeScene("other2");
	thread.sleep(500);
	world.getPlayer().setX(40);
}

function goFromOther()
{
	world.changeScene("puzzle2");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function readLetter4()
{
	world.settingsAction();
	world.getInventory().addNote("letter4");
	world.readNote();
	world.getLevel().getScene().getEntity("note3").setVisible(false);
}

function goToEnd3()
{
	world.playSound("door");
	world.stopMusic();
	world.changeScene("girl");
	thread.sleep(500);
	world.getPlayer().setX(40);
	
	world.setStepSound("cave");
}

function Girl()
{
	world.getLevel().getScene().getEntity("event").setUsable(false);
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["girl1", "girl2", "girl3"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.fadeIn();
	world.stopMusic();
	thread.sleep(4000);
	world.changeScene("day");
	world.getPlayer().setVisible(false);
	thread.sleep(1000);
	world.getLevel().getScene().getEntity(world.getLanguage() ? "day2" : "rday2").setVisible(true);
	thread.sleep(5000);
	world.fadeIn();
	thread.sleep(3000);
	world.getPlayer().setVisible(true);
	world.changeLevel("hday3");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
}