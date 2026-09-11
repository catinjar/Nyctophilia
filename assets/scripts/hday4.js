function lookAtBooks()
{
	world.getMessages().put(["books1", "books2"]);
}

function useLampItem()
{
	world.getMessages().put(["cantuse1"]);
}

function useScrap()
{
	world.getMessages().put(["not"]);
}

function useKey()
{
	if(world.getSelectedKey() == "loft")
	{
		world.playSound("usekey");
		world.getMessages().put(["use1", "use2"]);
		world.getLevel().getScene().getEntity("loft").setFunction("goToLoft2");
		world.getInventory().goalDone("goal_open");
		world.getInventory().deleteItem("keydream");
	}
	else
		world.getMessages().put(["not"]);
}

function useSquare()
{
	world.getLevel().getScene().getEntity("square").setUsable(false);
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	thread.sleep(5000);
	world.fadeIn();
	thread.sleep(3000);
	world.getPlayer().setVisible(false);
	world.changeScene("eye");
	thread.sleep(10000);
	world.fadeIn();
	thread.sleep(3000);
	world.getPlayer().setVisible(true);
	world.changeScene("loft");
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getMessages().put(["know1", "know2", "know3"]);
	world.getLevel().getScene("street").getEntity("car").setFunction("Ride");
	world.getInventory().addGoal("goal_ride");
}

function Ride()
{
	world.getInventory().clearGoals();
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["ride1", "ride2", "ride3", "ride4", "ride5", "ride6", "ride7", "ride8"]);
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
	world.playSound("engine");
	thread.sleep(3000);
	world.changeLevel("hclub");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
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
	world.getMessages().put(["bed11", "bed12"]);
}

function goToCave()
{
	world.getMessages().put(["cave1"]);
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
	world.getMessages().put(["takewash1", "takewash2"]);
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
	if(world.getInventory().isThereGoal("goal_ride"))
	{
		world.playSound("pen");
		world.getInventory().addNote("diary3");
		world.readNote();
		world.getLevel().getScene().getEntity("tableb").setFunction("lookAtTableB2");
		thread.sleep(500);
		world.settingsAction();
	}
	else if(world.getLevel().getScene().getEntity("key").isVisible())
	{
		world.playSound("key");
		world.getLevel().getScene().getEntity("key").setVisible(false);
		world.getInventory().addItem("keydream", "useKey", 25, 0);
		world.getMessages().put(["key1", "key2", "key3"]);
		world.getInventory().addGoal("goal_open");
	}
	else
		world.getMessages().put(["diary1"]);
}

function lookAtTableB2()
{
	world.getMessages().put(["tableb1"]);
}

function lookAtTV()
{
	world.getMessages().put(["tv1", "tv2", "tv3"]);
	world.playSound("click2");
}

function useCar()
{
	world.getMessages().put(["car1", "car2"]);
}

function phoneUse()
{
	world.getMessages().put(["phone1", "phone2"]);
}

function lookAtPicture1()
{
	world.getMessages().put(["picture1"]);
}

function lookAtPicture2()
{
	world.getMessages().put(["picture21"]);
}

function lookAtPicture3()
{
	world.getMessages().put(["picture31"]);
}

function lookAtPicture4()
{
	world.getMessages().put(["picture41"]);
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
	world.getMessages().put(["bath1"]);
}

function lookAtWasher()
{
	world.getMessages().put(["washer1"]);
}

function lookAtBox()
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
	world.getMessages().put(["bed21"]);
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
	
}

function lookAtBooks3()
{
	world.getMessages().put(["books31", "books32", "books33", "books34"]);
}

function lookAtHiddenTable()
{
	world.getMessages().put(["notes1", "notes2"]);
}

function goToLoft()
{
	world.getMessages().put(["loft1", "loft2"]);
}

function goToCellar()
{
	world.getMessages().put(["cellar1", "cellar2"]);
}

function goToLoft2()
{
	world.changeScene("loft");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromLoft()
{
	world.changeScene("floor_2");
	thread.sleep(500);
	world.getPlayer().setX(30);
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

function goToHidden()
{
	world.changeScene("hidden");
	thread.sleep(500);
	world.getPlayer().setX(270);
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
	world.getMessages().put(["light1", "light2"]);
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
	world.getMessages().put(["light1", "light2"]);
	world.playSound("click2");
}