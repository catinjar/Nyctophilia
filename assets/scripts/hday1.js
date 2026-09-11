function start()
{
	world.getLevel().setLightEnabled(false);
	world.getPlayer().getLight().setVisible(false);
	world.getPlayer().setX(100);
	world.getPlayer().lookRight();
	world.getMessages().put(["came1", "came2", "came3", "came4", "came5", "came6", "came7"]);
	world.getNotifications().put(["tasks"]);
	world.getInventory().addGoal("goal_sleep");
	
	world.setMusic("Garden");
	world.setStepSound("grass");
	
	world.Save();
}

function useBed1()
{
	world.setPauseBlocked(true);
	world.getInventory().goalDone("goal_sleep");
	world.getInventory().clearGoals();
	world.getMessages().put(["sleep1", "sleep2"]);
	world.getPlayer().setLocked(true);
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	world.fadeIn();
	thread.sleep(3000);
	world.changeScene("day");
	world.getPlayer().setVisible(false);
	thread.sleep(1000);
	world.getLevel().getScene().getEntity(world.getLanguage() ? "day2" : "rday2").setVisible(true);
	thread.sleep(4000);
	world.fadeIn();
	thread.sleep(2000);
	world.changeLevel("hday2");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getPlayer().setVisible(true);
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
	world.getMessages().put(["tv1", "tv2"]);
}

function offTv()
{
	world.getLevel().getScene().getLight("tvlight").setVisible(false);
	world.playSound("click2");
}

function useCar()
{
	world.getMessages().put(["car1", "car2", "car3", "car4"]);
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
	world.getMessages().put(["faucet1", "faucet2"]);
}

function lookAtFridge()
{
	world.getMessages().put(["fridge1"]);
}

function lookAtToilet()
{
	world.getMessages().put(["toilet1", "toilet2"]);
}

function lookAtFaucetB()
{
	world.getMessages().put(["faucetb1", "faucetb2"]);
}

function lookAtBath()
{
	world.getMessages().put(["bath1", "bath2", "bath3"]);
}

function lookAtWasher()
{
	world.getMessages().put(["washer1", "washer2", "washer3"]);
}

function lookAtBox()
{
	world.getMessages().put(["box1", "box2"]);
}

function lookAtBadWall()
{
	world.getMessages().put(["badwall1", "badwall2"]);
}

function lookAtBooks()
{
	world.getMessages().put(["books1", "books2"]);
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
	world.getMessages().put(["bed21", "bed22", "bed23"]);
}

function lookAtTableB()
{
	world.getMessages().put(["diary1", "diary2"]);
}

function lookAtToilet2()
{
	world.getMessages().put(["toilet21"]);
}

function lookAtBath2()
{
	world.getMessages().put(["bath21", "bath22"]);
}

function lookAtFaucetB2()
{
	world.getMessages().put(["faucet21", "faucet22"]);
}

function goToLoft()
{
	world.getMessages().put(["loft1", "loft2", "loft3"]);
}

function goToCellar()
{
	world.getMessages().put(["cellar1", "cellar2", "cellar3", "cellar4"]);
}

function goToBarn()
{
	world.getMessages().put(["barn1", "barn2"]);
}

function goFromGarden()
{
	world.playSound("door");
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(750);
	
	world.setMusic("Home");
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
	world.setStepSound("tile");
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