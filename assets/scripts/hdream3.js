function goToCellar()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.fadeIn();
	thread.sleep(3000);
	world.changeLevel("hend");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
}

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
	world.getLevel().setLightEnabled(true);
	world.getLevel().setEffectEnabled(true);
	world.getPlayer().getLight().setVisible(true);
	world.getPlayer().setX(270);
	world.getPlayer().lookLeft();
	world.getMessages().put(["wake1", "wake2"]);
	world.setMusic("Last Dream");
	
	world.setStepSound("wood");
	
	world.Save();
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
	
}

function goFromHidden()
{
	world.changeScene("floor_2");
	thread.sleep(500);
	world.getPlayer().setX(490);
}

function goFromGarden()
{
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(750);
	
	world.setStepSound("wood");
}

function goToGarden()
{
	
}

function goFromStreet()
{
	world.changeScene("floor_1");
	thread.sleep(500);
	world.getPlayer().setX(30);
	
	world.setStepSound("wood");
}

function goToStreet()
{
	
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