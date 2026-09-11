function start()
{
	world.nullSave();
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getLevel().setLightEnabled(false);
	world.getPlayer().getLight().setVisible(true);
	world.getPlayer().setVisible(false);
	world.getPlayer().setLocked(true);
	world.getPlayer().lookRight();
	
	thread.sleep(4000);
	world.getLevel().getScene().getEntity(world.getLanguage() ? "nyctophilia" : "nyctophilia_r").setVisible(true);
	world.playSound("intro2");
	thread.sleep(6000);
	world.fadeIn();
	thread.sleep(3000);
	world.getLevel().getScene().getEntity(world.getLanguage() ? "nyctophilia" : "nyctophilia_r").setVisible(false);
	world.getLevel().getScene().getEntity(world.getLanguage() ? "presents" : "presents_r").setVisible(true);
	world.fadeOut();
	thread.sleep(5000);
	world.fadeIn();
	thread.sleep(3000);
	world.getLevel().getScene().getEntity(world.getLanguage() ? "presents" : "presents_r").setVisible(false);
	world.getLevel().getScene().getEntity(world.getLanguage() ? "game" : "game_r").setVisible(true);
	world.fadeOut();
	thread.sleep(5000);
	world.fadeIn();
	thread.sleep(3000);
	world.getLevel().getScene().getEntity(world.getLanguage() ? "game" : "game_r").setVisible(false);
	world.fadeOut();
	thread.sleep(3000);
	world.setMusic("First Dream");
	world.changeScene("corridor");
	thread.sleep(500);
	
	world.getPlayer().setX(30);
	world.getLevel().setLightEnabled(true);
	world.getPlayer().setVisible(true);
	world.getPlayer().getLight().setVisible(true);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getNotifications().put(["walking"]);
	
	world.setStepSound("cave");
	
	world.Save();
}

function first()
{
	world.getLevel().getScene().getEntity("event1").setUsable(false);
	world.getLevel().getScene().getEntity("event2").setUsable(true);
	world.getLevel().getScene().getEntity("block3").setVisible(true);
	world.getLevel().getScene().setMinX(320);
	world.getMessages().put(["sound1", "sound11"]);
	world.playSound("rock");
}

function second()
{
	world.getLevel().getScene().getEntity("event2").setUsable(false);
	world.getLevel().getScene().getEntity("event3").setUsable(true);
	world.getLevel().getScene().getEntity("block4").setVisible(true);
	world.getLevel().getScene().setMaxX(1280);
	world.getMessages().put(["sound2"]);
	world.playSound("rock");
}

function third()
{
	world.getLevel().getScene().getEntity("event3").setUsable(false);
	world.getLevel().getScene().getEntity("event4").setUsable(true);
	world.getLevel().getScene().getEntity("block5").setVisible(true);
	world.getLevel().getScene().setMinX(640);
	world.getMessages().put(["sound3"]);
	world.playSound("rock");
}

function fourth()
{
	world.playSound("rock");
	world.setMusic("Tallman Appearence");
	world.setPauseBlocked(true);
	world.getLevel().getScene().getEntity("event4").setUsable(false);
	world.getLevel().getScene().getEntity("block6").setVisible(true);
	world.getLevel().getScene().setMaxX(960);
	thread.sleep(10000);
	world.changeScene("tallman");
	thread.sleep(500);
	world.getPlayer().setX(100);
	world.getPlayer().lookRight();
	world.getPlayer().setLocked(true);
	thread.sleep(15000);
	world.changeScene("day");
	world.getPlayer().setVisible(false);
	world.getPlayer().setX(30);
	thread.sleep(1000);
	world.getLevel().getScene().getEntity("gamename").setVisible(true);
	world.playSound("ston");
	thread.sleep(15000);
	world.fadeIn();
	thread.sleep(3000);
	world.getLevel().getScene().getEntity("gamename").setVisible(false);
	world.getLevel().getScene().getEntity(world.getLanguage() ? "day1" : "rday1 ").setVisible(true);
	world.getLevel().setLightEnabled(false);
	world.fadeOut();
	
	world.stopMusic();
	world.setStepSound("wood");
	
	thread.sleep(4000);
	world.changeScene("hotel");
	thread.sleep(500);
	world.getPlayer().setVisible(true);
	world.getPlayer().setLocked(false);
	world.getPlayer().getLight().setVisible(false);
	world.getPlayer().setX(165);
	world.getNotifications().put(["using"]);
	world.getMessages().put(["dream1", "dream2", "dream3"]);
	world.setPauseBlocked(false);
}

function useClicker()
{
	world.getLevel().getScene().getLight("lightMap").setVisible();
	world.playSound("click2");
}

function useTable()
{
	world.getActions().setActions(["lookAtTable", "useLamp", "getKey"]);
}

function useTable2()
{
	world.getActions().setActions(["lookAtTable2", "useLamp"]);
}

function lookAtTable2()
{
	world.getMessages().put(["table2"]);
}

function goToBath()
{
	world.playSound("door");
	world.changeScene("bath");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setStepSound("tile");
}

function goFromBath()
{
	world.playSound("door");
	world.changeScene("hotel");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setStepSound("wood");
}

function useLamp()
{
	world.getLevel().getScene().getLight("key").setVisible();
	world.playSound("click2");
}

function lookAtFacet()
{
	world.getMessages().put(["facet1", "facet2", "facet3"]);
}

function useBed()
{
	world.getMessages().put(["bed1"]);
}

function goToHotel()
{
	world.getMessages().put(["hotel1", "hotel2", "hotel3"]);
}

function goToHotel2()
{
	world.getMessages().put(["hotel1", "hotel2", "hotel3"]);
	world.getNotifications().put(["useitem"]);
}

function lookAtTable()
{
	world.getMessages().put(["table1"]);
}

function getKey()
{
	world.playSound("key");
	world.getLevel().getScene().getEntity("key").setVisible(false);
	world.getLevel().getScene().getEntity("table").setFunction("useTable2");
	world.getLevel().getScene().getEntity("door").setFunction("goToHotel2");
	world.getInventory().addItem("keyitem", "useKey", 25, 0);
	world.getNotifications().put(["useitem"]);
}

function useKey()
{
	if(world.getSelectedKey() == "door")
	{
		world.playSound("usekey");
		world.getLevel().getScene().getEntity("door").setFunction("goToCorridor");
		world.changeScene("hotel_corridor");
		thread.sleep(500);
		world.getPlayer().setX(70);
	}
	else if(world.getSelectedKey() == "guy")
	{
		world.getLevel().getScene().getEntity("door").setFunction("goAway2");
		world.getMessages().put(["givekey"]);
		world.getInventory().deleteItem("keyitem");
	}
	else
		world.getMessages().put(["notkey"]);
}

function goToRoom()
{
	world.playSound("door");
	world.changeScene("hotel");
	thread.sleep(500);
	world.getPlayer().setX(260);
}

function goToCorridor()
{
	world.playSound("door");
	world.changeScene("hotel_corridor");
	thread.sleep(500);
	world.getPlayer().setX(70);
}

function room1()
{
	world.getMessages().put(["room2"]);
}

function room2()
{
	world.getMessages().put(["room2"]);
	
	if(world.getSelectedKey() == "door2")
	{
		world.getLevel().getScene().getEntity("door2").setFunction("room1");
		world.getLevel().getScene().getEntity("door3").setFunction("room3");
		world.getLevel().getScene().getEntity("door4").setFunction("room3");
	}
	else if(world.getSelectedKey() == "door3")
	{
		world.getLevel().getScene().getEntity("door3").setFunction("room1");
		world.getLevel().getScene().getEntity("door2").setFunction("room3");
		world.getLevel().getScene().getEntity("door4").setFunction("room3");
	}
	else if(world.getSelectedKey() == "door4")
	{
		world.getLevel().getScene().getEntity("door4").setFunction("room1");
		world.getLevel().getScene().getEntity("door2").setFunction("room3");
		world.getLevel().getScene().getEntity("door3").setFunction("room3");
	}
}

function room3()
{
	world.getMessages().put(["room3"]);

	if(world.getSelectedKey() == "door2")
	{
		if(world.getLevel().getScene().getEntity("door3").getFunction() == "room1")
			world.getLevel().getScene().getEntity("door4").setFunction("room4");
		else
			world.getLevel().getScene().getEntity("door3").setFunction("room4");
	}
	else if(world.getSelectedKey() == "door3")
	{
		if(world.getLevel().getScene().getEntity("door2").getFunction() == "room1")
			world.getLevel().getScene().getEntity("door4").setFunction("room4");
		else
			world.getLevel().getScene().getEntity("door2").setFunction("room4");
	}
	else if(world.getSelectedKey() == "door4")
	{
		if(world.getLevel().getScene().getEntity("door3").getFunction() == "room1")
			world.getLevel().getScene().getEntity("door2").setFunction("room4");
		else
			world.getLevel().getScene().getEntity("door3").setFunction("room4");
	}
}

function room4()
{
	world.getMessages().put(["room4"]);
}

function talkToGuy()
{
	world.getMessages().put(["talk1", "talk2", "talk3", "talk4", "talk5", "talk6"]);
}

function goAway1()
{
	world.getMessages().put(["away1"]);
}

function goAway2()
{
	world.setPauseBlocked(true);
	world.getMessages().put(["away2"]);
	world.getPlayer().setLocked(true);
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	world.changeScene("later");
	thread.sleep(500);
	world.getPlayer().setVisible(false);
	thread.sleep(2000);
	world.fadeIn();
	world.changeLevel("hday1");
	thread.sleep(1000);
	world.getPlayer().setLocked(false);
	world.getPlayer().setVisible(true);
	world.setPauseBlocked(false);
}