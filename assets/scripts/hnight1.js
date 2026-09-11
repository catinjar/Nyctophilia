function lookAtTV()
{
	world.setMusic("Devil");
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getPlayer().lookLeft();
	world.getMessages().put(["tv1", "tv2", "tv3"]);
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	world.getPlayer().lookRight();
	world.getLevel().getScene().getEntity("satan").setVisible(true);
	world.getLevel().getScene().getLight("satanl").setVisible(true);
	world.getLevel().getScene().getLight("satanl2").setVisible(true);
	thread.sleep(5000);
	world.getMessages().put(["satan1", "satan2", "satan3", "satan4", "satan5", "satan6"]);
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
	world.changeLevel("hday4");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
}

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
	world.getMessages().put(["cantuse1"]);
}

function start()
{
	world.setMusic("Night");
	world.getLevel().setLightEnabled(true);
	world.getPlayer().getLight().setVisible(true);
	world.getPlayer().setX(50);
	world.getPlayer().lookRight();
	world.getMessages().put(["wake1", "wake2", "wake3", "wake4", "wake5"]);
	
	world.setStepSound("wood");
	
	world.Save();
}

function goToCave()
{
	
}

function useBed1()
{	
	world.getMessages().put(["bed11", "bed12"]);
}

function lookAtFaucetB2()
{
	world.getMessages().put(["faucetb1", "faucetb2"]);
}

function lookAtFridge()
{
	world.getMessages().put(["fridge1", "fridge2"]);
}

function lookAtTableB()
{
	world.getMessages().put(["diary1", "diary2"]);
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
	world.getMessages().put(["toilet1"]);
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
	
}

function lookAtBooks3()
{
	
}

function lookAtHiddenTable()
{
	
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
	
	world.setStepSound("wood");
}

function goFromBarn()
{
	world.playSound("door");
	world.changeScene("garden");
	thread.sleep(500);
	world.getPlayer().setX(270);
	
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
	
	world.setStepSound("wood");
}

function goToGarden()
{
	world.playSound("door");
	world.changeScene("garden");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setStepSound("grass");
}

function goFromStreet()
{
	world.playSound("door");
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setStepSound("wood");
}

function goToStreet()
{
	world.playSound("door");
	world.changeScene("street");
	thread.sleep(500);
	world.getPlayer().setX(590);
	
	world.setStepSound("grass");
}

function goFromGallery()
{
	world.playSound("door");
	world.changeScene("floor_2");
	thread.sleep(500);
	world.getPlayer().setX(750);
}

function goGallery()
{
	world.playSound("door");
	world.changeScene("gallery");
	thread.sleep(500);
	world.getPlayer().setX(30);
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
}

function goToKitchen()
{
	world.playSound("door");
	world.changeScene("kitchen");
	thread.sleep(500);
	world.getPlayer().setX(260);
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