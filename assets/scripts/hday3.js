function lookAtBooks()
{
	world.getMessages().put(["books1", "books2"]);
}

function useLampItem()
{
	world.getMessages().put(["cantuse1", "cantuse2"]);
}

function useScrap()
{
	if(world.getSelectedKey() == "bad_wall")
	{
		world.getMessages().put(["hidden1", "hidden2", "hidden3", "hidden4"]);
		world.getLevel().getScene().getEntity("bad_wall").setFunction("goToHidden");
		world.getLevel().getScene().getEntity("bad_wall2").setVisible(true);
		world.playSound("wood");
	}
	else
		world.getMessages().put(["not"]);
}

function useKey()
{
	if(world.getLevel().getSceneName() == "garden" && world.getSelectedKey() == "door_garden")
	{
		world.playSound("usekey");
		world.getMessages().put(["open1"]);
		world.getInventory().goalDone("goal_open");
		world.getLevel().getScene().getEntity("door_garden").setFunction("goToBarn2");
		world.getInventory().deleteItem("keydream");
		goToBarn2();
	}
	else
		world.getMessages().put(["not"]);
}

function useMap()
{
	world.getMessages().put(["map1", "map2"]);
}

function goToCave()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["cave1", "cave2"]);
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	thread.sleep(4000);
	world.getMessages().deleteCurrent();
	world.fadeIn();
	thread.sleep(4000);
	world.changeLevel("hcave");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getPlayer().setVisible(true);
}

function readBook()
{
	world.settingsAction();
	world.getInventory().addNote("book1");
	world.readNote();
	
	if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable4");
	else if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable2")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable5");
	else if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable3")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable6");
	else if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable7")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable228");
}

function readLetter()
{
	world.settingsAction();
	world.getInventory().addNote("letter5");
	world.readNote();
	
	if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable3");
	else if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable3")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable7");
	else if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable4")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable6");
	else if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable5")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable228");
}

function readDiary()
{
	world.settingsAction();
	world.getInventory().addNote("olddiary1");
	world.readNote();
	
	if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable2");
	else if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable2")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable7");
	else if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable4")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable5");
	else if(world.getLevel().getScene().getEntity("hiddentable").getFunction() == "lookAtHiddenTable6")
		world.getLevel().getScene().getEntity("hiddentable").setFunction("lookAtHiddenTable228");
}

function start()
{
	world.getLevel().setLightEnabled(false);
	world.getPlayer().getLight().setVisible(false);
	world.getPlayer().setX(50);
	world.getPlayer().lookRight();
	world.getMessages().put(["wake1", "wake2", "wake3", "wake4", "wake5"]);
	
	world.setMusic("Home");
	world.setStepSound("wood");
	
	world.Save();
}

function useBed1()
{
	if(world.getInventory().isThereGoal("goal_sleep"))
	{
		world.setPauseBlocked(true);
		world.getPlayer().setLocked(true);
		world.getInventory().goalDone("goal_sleep");
		world.getInventory().clearGoals();
		world.getMessages().put(["sleep1", "sleep2"]);
		thread.sleep(2000);
		world.getMessages().deleteCurrent();
		thread.sleep(2000);
		world.getMessages().deleteCurrent();
		world.fadeIn();
		thread.sleep(8000);
		world.changeLevel("hdream2");
		thread.sleep(1000);
		world.setPauseBlocked(false);
		world.getPlayer().setLocked(false);
	}
	else
		world.getMessages().put(["bed11", "bed12", "bed13", "bed14"]);
}

function lookAtFaucetB2()
{
	world.getActions().setActions(["haveWash", "takeMedicine"]);
}

function lookAtFaucetB22()
{
	world.getActions().setActions(["takeMedicine"]);
}

function lookAtFaucetB23()
{
	world.getActions().setActions(["haveWash"]);
}

function lookAtFaucetB24()
{
	world.getMessages().put(["faucetb1", "faucetb2"]);
}

function haveWash()
{
	world.getMessages().put(["takewash1", "takewash2", "takewash3"]);
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	world.fadeIn();
	world.playSound("water");
	thread.sleep(3000);
	world.fadeOut();
	world.getMessages().put(["takewash3"]);
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	if(world.getLevel().getScene().getEntity("faucetb").getFunction() == "lookAtFaucetB2")
		world.getLevel().getScene().getEntity("faucetb").setFunction("lookAtFaucetB22");
	else
		world.getLevel().getScene().getEntity("faucetb").setFunction("lookAtFaucetB24");
	thread.sleep(500);
	world.settingsAction();
}

function takeMedicine()
{
	world.getActions().setActions(["Take", "notTake"]);
}

function Take()
{
	world.playSound("medicine");
	world.getMessages().put(["takeM"]);
	if(world.getLevel().getScene().getEntity("faucetb").getFunction() == "lookAtFaucetB2")
		world.getLevel().getScene().getEntity("faucetb").setFunction("lookAtFaucetB23");
	else
		world.getLevel().getScene().getEntity("faucetb").setFunction("lookAtFaucetB24");
	world.settingsAction();
}

function notTake()
{
	world.getMessages().put(["notTakeM"]);
}

function lookAtFridge()
{
	world.getMessages().put(["fridge1", "fridge2"]);
	world.getActions().setActions(["Eat", "Drink"]);
}

function lookAtFridge2()
{
	world.getActions().setActions(["Drink"]);
}

function lookAtFridge3()
{
	world.getActions().setActions(["Eat"]);
}

function lookAtFridge4()
{
	world.getMessages().put(["faucetb1", "faucetb2"]);
}

function Eat()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.fadeIn();
	world.playSound("chew");
	thread.sleep(3000);
	world.fadeOut();
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getMessages().put(["eat1", "eat2"]);
	if(world.getLevel().getScene().getEntity("fridge").getFunction() == "lookAtFridge")
		world.getLevel().getScene().getEntity("fridge").setFunction("lookAtFridge2");
	else
		world.getLevel().getScene().getEntity("fridge").setFunction("lookAtFridge4");
	world.settingsAction();
}

function Drink()
{
	world.getActions().setActions(["drinkTea", "drinkBeer", "drinkCoffee","drinkJuice"]);
}

function drinkTea()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["tea1", "tea2"]);
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	actuallyDrink();
}

function drinkBeer()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["beer1", "beer2"]);
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	actuallyDrink();
}

function drinkCoffee()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["coffee1", "coffee2"]);
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.settingsAction();
	actuallyDrink();
}

function drinkJuice()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["juice1", "juice2"]);
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	thread.sleep(2000);
	world.getMessages().deleteCurrent();
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	actuallyDrink();
}

function actuallyDrink()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.fadeIn();
	world.playSound("drink");
	thread.sleep(3000);
	world.fadeOut();
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	if(world.getLevel().getScene().getEntity("fridge").getFunction() == "lookAtFridge")
		world.getLevel().getScene().getEntity("fridge").setFunction("lookAtFridge3");
	else
		world.getLevel().getScene().getEntity("fridge").setFunction("lookAtFridge4");
}

function lookAtTableB()
{
	if(world.getInventory().isThereGoal("goal_sleep"))
	{
		world.playSound("pen");
		world.getInventory().addNote("diary2");
		world.readNote();
		world.getLevel().getScene().getEntity("tableb").setFunction("lookAtTableB2");
		thread.sleep(500);
		world.settingsAction();
	}
	else
		world.getMessages().put(["diary1", "diary2"]);
}

function lookAtTableB2()
{
	world.getMessages().put(["tableb1", "tableb2"]);
}

function lookAtTV()
{
	if(!world.getLevel().getScene().getLight("tvlight").isVisible())
	{
		world.getLevel().getScene().getLight("tvlight").setVisible(true);
		world.playSound("click2");
	}
	else
		world.getActions().setActions(["watchTv", "offTv"]);
}

function watchTv()
{
	world.getMessages().put(["tv1", "tv2", "tv3"]);
}

function offTv()
{
	world.getLevel().getScene().getLight("tvlight").setVisible(false);
	world.playSound("click2");
}

function useCar()
{
	world.getMessages().put(["car1", "car2", "car3", "car4", "car5"]);
}

function phoneUse()
{
	world.getMessages().put(["phone1", "phone2"]);
}

function lookAtPicture1()
{
	world.getMessages().put(["picture1", "picture2", "picture3"]);
}

function lookAtPicture2()
{
	world.getMessages().put(["picture21", "picture22"]);
}

function lookAtPicture3()
{
	world.getMessages().put(["picture31"]);
}

function lookAtPicture4()
{
	world.getMessages().put(["picture41", "picture42"]);
}

function lookAtFaucet()
{
	world.getMessages().put(["faucet1"]);
}

function lookAtToilet()
{
	world.getMessages().put(["toilet1", "toilet12"]);
}

function lookAtBath()
{
	world.getMessages().put(["bath1", "bath2"]);
}

function lookAtWasher()
{
	world.getMessages().put(["washer1", "washer2"]);
}

function lookAtBox()
{
	world.getMessages().put(["box1", "box2"]);
	
	if(world.getInventory().isThereGoal("goal_find") )
	{
		world.getInventory().addItem("scrapitem", "useScrap", 75, 0);
		world.getMessages().put(["find1", "find2", "find3"]);
		world.getLevel().getScene().getEntity("box").setFunction("lookAtBox2");
	}
}

function lookAtBox2()
{
	world.getMessages().put(["box1", "box2"]);
}

function lookAtJunk()
{
	world.getMessages().put(["junk1"]);
}

function lookAtBooks2()
{
	world.getMessages().put(["books21"]);
}

function useBed2()
{
	world.getMessages().put(["bed21", "bed22"]);
}

function lookAtToilet2()
{
	world.getMessages().put(["toilet21", "toilet22"]);
}

function lookAtBath2()
{
	world.getMessages().put(["bath21"]);
}

function lookAtFaucetB()
{
	world.getMessages().put(["faucet21", "faucet22"]);
}

function lookAtHiddenBox()
{
	if(world.getInventory().isThereGoal("goal_look"))
	{
		world.playSound("key");
		world.getInventory().goalDone("goal_look");
		world.getInventory().addGoal("goal_open");
		world.getInventory().addItem("keydream", "useKey", 25, 0);
		world.getInventory().addItem("mapitem", "useMap", 100, 0);
		world.getMessages().put(["look1", "look2"]);
	}
}

function lookAtBooks3()
{
	world.getMessages().put(["books31", "books32", "books33", "books34"]);
}

function lookAtHiddenTable()
{
	world.getMessages().put(["notes1", "notes2"]);
	world.getActions().setActions(["readBook", "readLetter", "readDiary"]);
}

function lookAtHiddenTable2()
{
	world.getActions().setActions(["readBook", "readLetter"]);
}

function lookAtHiddenTable3()
{
	world.getActions().setActions(["readBook", "readDiary"]);
}

function lookAtHiddenTable4()
{
	world.getActions().setActions(["readLetter", "readDiary"]);
}

function lookAtHiddenTable5()
{
	world.getActions().setActions(["readLetter"]);
}

function lookAtHiddenTable6()
{
	world.getActions().setActions(["readDiary"]);
}

function lookAtHiddenTable7()
{
	world.getActions().setActions(["readBook"]);
}

function lookAtHiddenTable228()
{
	world.getMessages().put(["everything"]);
}

function goToLoft()
{
	world.getMessages().put(["loft1", "loft2"]);
}

function goToCellar()
{
	world.getMessages().put(["cellar1", "cellar2"]);
}

function goToBarn()
{
	world.getMessages().put(["barn1", "barn2"]);
}

function goToBarn2()
{
	world.playSound("door");
	world.changeScene("barn");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setMusic("Home");
	world.setStepSound("wood");
}

function goFromBarn()
{
	world.playSound("door");
	world.changeScene("garden");
	thread.sleep(500);
	world.getPlayer().setX(270);
	
	world.setMusic("Garden");
	world.setStepSound("grass");
}

function lookAtBadWall()
{
	world.getMessages().put(["badwall1", "badwall2", "badwall3", "badwall4"]);
	
	if(world.getInventory().isThereGoal("goal_wind") && !world.getInventory().isThereGoal("goal_find"))
	{
		world.getInventory().goalDone("goal_wind");
		world.getInventory().addGoal("goal_find");
	}
}

function goToHidden()
{
	world.changeScene("hidden");
	thread.sleep(500);
	world.getPlayer().setX(270);
	
	if(world.getInventory().isThereGoal("goal_find") && !world.getInventory().isThereGoal("goal_look"))
	{
		world.getInventory().goalDone("goal_find");
		world.getInventory().addGoal("goal_look");
		world.getMessages().put(["found1", "found2"]);
	}
}

function goFromHidden()
{
	world.changeScene("floor_2");
	thread.sleep(500);
	world.getPlayer().setX(490);
}

function goFromGarden()
{
	world.playSound("door");
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(750);
	
	world.setMusic("Home");
	world.setStepSound("wood");
}

function goToGarden()
{
	world.playSound("door");
	world.changeScene("garden");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setMusic("Garden");
	world.setStepSound("grass");
}

function goFromStreet()
{
	world.playSound("door");
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setMusic("Home");
	world.setStepSound("wood");
}

function goToStreet()
{
	world.playSound("door");
	world.changeScene("street");
	thread.sleep(500);
	world.getPlayer().setX(590);
	
	world.setMusic("Garden");
	world.setStepSound("grass");
}

function goFromGallery()
{
	world.playSound("door");
	world.changeScene("floor_2");
	thread.sleep(500);
	world.getPlayer().setX(750);
	
	world.setMusic("Home");
}

function goGallery()
{
	world.playSound("door");
	world.changeScene("gallery");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setMusic("Garden");
}

function goFromBath2()
{
	world.playSound("door");
	world.changeScene("floor_2");
	thread.sleep(500);
	world.getPlayer().setX(620);
	
	world.setStepSound("wood");
}

function goToBath2()
{
	world.playSound("door");
	world.changeScene("bathroom2");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setStepSound("tile");
}

function goFromBed2()
{
	world.playSound("door");
	world.changeScene("floor_2");
	thread.sleep(500);
	world.getPlayer().setX(230);
}

function goToBed2()
{
	world.playSound("door");
	world.changeScene("bed2");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromBed1()
{
	world.playSound("door");
	world.changeScene("floor_2");
	thread.sleep(500);
	world.getPlayer().setX(110);
	
	if(!world.getInventory().isThereGoal("goal_wind"))
	{
		world.getInventory().addGoal("goal_wind");
		world.getMessages().put(["wind1", "wind2", "wind3"]);
	}
}

function goToBed1()
{
	world.playSound("door");
	world.changeScene("bed1");
	thread.sleep(500);
	world.getPlayer().setX(260);
}

function goFromStore()
{
	world.playSound("door");
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(620);
}

function goToStore()
{
	world.playSound("door");
	world.changeScene("store");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromLiving()
{
	world.playSound("door");
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(490);
}

function goToLiving()
{
	world.playSound("door");
	world.changeScene("living");
	thread.sleep(500);
	world.getPlayer().setX(260);
}

function goFromBath1()
{
	world.playSound("door");
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(230);
	
	world.setStepSound("wood");
}

function goToBath()
{
	world.playSound("door");
	world.changeScene("bathroom");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setStepSound("tile");
}

function lightsKitchen()
{
	world.getLevel().getScene().getLight("lightmapk").setVisible();
	world.playSound("click2");
}

function goFromKitchen()
{
	world.playSound("door");
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(110);
	
	world.setMusic("Home");
}

function goToKitchen()
{
	world.playSound("door");
	world.changeScene("kitchen");
	thread.sleep(500);
	world.getPlayer().setX(260);
	
	world.setMusic("Kitchen");
}

function goDown()
{
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(360);
}

function goUp()
{
	world.changeScene("floor_2");
	thread.sleep(500);
	world.getPlayer().setX(360);
}

function lights()
{
	world.getLevel().getScene().getLight("light1").setVisible();
	world.getLevel().getScene().getLight("light2").setVisible();
	world.playSound("click2");
}