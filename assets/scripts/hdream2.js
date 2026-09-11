function useLampItem()
{
	world.changeCharacterScene();
	thread.sleep(500);
	if(world.getLevel().getSceneName() == "lever")
		world.getPlayer().setVisible(false);
	if(world.getLevel().getSceneName() == "lever2")
		world.getPlayer().setVisible(true);
	world.getPlayer().changeCharacter();
	world.getInventory().changeItems();
}

function start()
{
	world.getLevel().setLightEnabled(true);
	world.getPlayer().getLight().setVisible(true);
	world.getPlayer().setX(30);
	world.getPlayer().lookRight();
	world.setMusic("Purgatory");
	
	world.setStepSound("dream");
	
	world.Save();
}

function lookAtBed()
{
	world.getMessages().put(["bed1", "bed2", "bed3", "bed4", "bed5"]);
}

function goFromBegin()
{
	world.playSound("door");
	world.changeScene("kitchen2");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToBegin()
{
	world.playSound("door");
	world.changeScene("begin2");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function lookAtFaucet()
{
	world.getMessages().put(["faucet1"]);
	world.getActions().setActions(["Wash", "notWash"]);
}

function Wash()
{
	world.getMessages().put(["faucet2", "faucet3"]);
}

function notWash() {}

function lookAtTable()
{
	world.getMessages().put(["table1", "table2"]);
}

function goFromKitchen()
{
	world.playSound("door");
	world.changeScene("gallery2");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToKitchen()
{
	world.playSound("door");
	world.changeScene("kitchen2");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function lookAtGirl()
{
	world.getMessages().put(["girl1", "girl2", "girl3", "girl4"]);
}

function lookAtGuy()
{
	world.getMessages().put(["guy1", "guy2", "guy3"]);
}

function lookAtPicture1()
{
	world.getMessages().put(["picture1"]);
}

function lookAtPicture2()
{
	world.getMessages().put(["picture2"]);
}

function lookAtPicture3()
{
	world.getMessages().put(["picture3"]);
}

function lookAtPicture4()
{
	world.getMessages().put(["picture4"]);
}

function goFromGallery()
{
	world.playSound("door");
	world.changeScene("puzzle");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function lookAtWell()
{
	world.getMessages().put(["well1", "well2", "well3"]);
}

function goFromLever()
{
	world.playSound("door");
	world.changeScene("puzzle");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToLever()
{
	world.playSound("door");
	world.changeScene("lever");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function useLever()
{
	world.getActions().setActions(["Right", "Left"]);
}

function Left()
{
	world.playSound("click2");
	if(world.getSelectedKey() == "level11" || world.getSelectedKey() == "level12" || world.getSelectedKey() == "level13")
	{
		world.getLevel().getScene().getEntity("level11").setVisible(false);
		world.getLevel().getScene().getEntity("level12").setVisible(true);
		world.getLevel().getScene().getEntity("level13").setVisible(false);
	}
	else if(world.getSelectedKey() == "level21" || world.getSelectedKey() == "level22" || world.getSelectedKey() == "level23")
	{
		world.getLevel().getScene().getEntity("level21").setVisible(false);
		world.getLevel().getScene().getEntity("level22").setVisible(true);
		world.getLevel().getScene().getEntity("level23").setVisible(false);
	} 
	else if(world.getSelectedKey() == "level31" || world.getSelectedKey() == "level32" || world.getSelectedKey() == "level33")
	{
		world.getLevel().getScene().getEntity("level31").setVisible(false);
		world.getLevel().getScene().getEntity("level32").setVisible(true);
		world.getLevel().getScene().getEntity("level33").setVisible(false);
	} 
	else if(world.getSelectedKey() == "level41" || world.getSelectedKey() == "level42" || world.getSelectedKey() == "level43")
	{
		world.getLevel().getScene().getEntity("level41").setVisible(false);
		world.getLevel().getScene().getEntity("level42").setVisible(true);
		world.getLevel().getScene().getEntity("level43").setVisible(false);
	} 
	else if(world.getSelectedKey() == "level51" || world.getSelectedKey() == "level52" || world.getSelectedKey() == "level53")
	{
		world.getLevel().getScene().getEntity("level51").setVisible(false);
		world.getLevel().getScene().getEntity("level52").setVisible(true);
		world.getLevel().getScene().getEntity("level53").setVisible(false);
	} 
	else if(world.getSelectedKey() == "level61" || world.getSelectedKey() == "level62" || world.getSelectedKey() == "level63")
	{
		world.getLevel().getScene().getEntity("level61").setVisible(false);
		world.getLevel().getScene().getEntity("level62").setVisible(true);
		world.getLevel().getScene().getEntity("level63").setVisible(false);
	}
	checkPuzzle();
}

function Right()
{
	world.playSound("click2");
	if(world.getSelectedKey() == "level11" || world.getSelectedKey() == "level12" || world.getSelectedKey() == "level13")
	{
		world.getLevel().getScene().getEntity("level11").setVisible(false);
		world.getLevel().getScene().getEntity("level12").setVisible(false);
		world.getLevel().getScene().getEntity("level13").setVisible(true);
	}
	else if(world.getSelectedKey() == "level21" || world.getSelectedKey() == "level22" || world.getSelectedKey() == "level23")
	{
		world.getLevel().getScene().getEntity("level21").setVisible(false);
		world.getLevel().getScene().getEntity("level22").setVisible(false);
		world.getLevel().getScene().getEntity("level23").setVisible(true);
	}
	else if(world.getSelectedKey() == "level31" || world.getSelectedKey() == "level32" || world.getSelectedKey() == "level33")
	{
		world.getLevel().getScene().getEntity("level31").setVisible(false);
		world.getLevel().getScene().getEntity("level32").setVisible(false);
		world.getLevel().getScene().getEntity("level33").setVisible(true);
	}
	else if(world.getSelectedKey() == "level41" || world.getSelectedKey() == "level42" || world.getSelectedKey() == "level43")
	{                                             
		world.getLevel().getScene().getEntity("level41").setVisible(false);
		world.getLevel().getScene().getEntity("level42").setVisible(false);
		world.getLevel().getScene().getEntity("level43").setVisible(true);
	}
	else if(world.getSelectedKey() == "level51" || world.getSelectedKey() == "level52" || world.getSelectedKey() == "level53")
	{                                            
		world.getLevel().getScene().getEntity("level51").setVisible(false);
		world.getLevel().getScene().getEntity("level52").setVisible(false);
		world.getLevel().getScene().getEntity("level53").setVisible(true);
	}
	else if(world.getSelectedKey() == "level61" || world.getSelectedKey() == "level62" || world.getSelectedKey() == "level63")
	{                                              
		world.getLevel().getScene().getEntity("level61").setVisible(false);
		world.getLevel().getScene().getEntity("level62").setVisible(false);
		world.getLevel().getScene().getEntity("level63").setVisible(true);
	}
	checkPuzzle();
}

function checkPuzzle()
{
	if(world.getLevel().getScene().getEntity("level13").isVisible() && world.getLevel().getScene().getEntity("level22").isVisible()
		&& world.getLevel().getScene().getEntity("level32").isVisible() && world.getLevel().getScene().getEntity("level42").isVisible()
			&& world.getLevel().getScene().getEntity("level53").isVisible() && world.getLevel().getScene().getEntity("level63").isVisible())
	{
		world.getLevel().getScene("puzzle").getEntity("door").setFunction("goToTallman2");
		world.getMessages().put(["solved"]);	
	}
}

function goToTallman()
{
	world.getMessages().put(["try1"]);
}

function goToTallman2()
{
	world.playSound("door");
	world.changeScene("tallman");
	thread.sleep(500);
	world.getPlayer().setX(270);
	
	world.setStepSound("dream");
}

function readDiary1()
{
	world.settingsAction();
	world.getInventory().addNote("olddiary6");
	world.readNote();
	world.getLevel().getScene().getEntity("note").setVisible(false);
}

function readDiary2()
{
	world.settingsAction();
	world.getInventory().addNote("olddiary7");
	world.readNote();
	world.getLevel().getScene().getEntity("note").setVisible(false);
}

function readDiary3()
{
	world.settingsAction();
	world.getInventory().addNote("olddiary8");
	world.readNote();
	world.getLevel().getScene().getEntity("note").setVisible(false);
}

function useTallman()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["tallman1", "tallman2", "tallman3", "tallman4", "tallman5", "tallman6"]);
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
	world.setMusic("How Do You Wake Up From A Nightmare When Youre Not Asleep");
	world.fadeIn();
	thread.sleep(4000);
	world.getPlayer().setX(160);
	world.getPlayer().setVisible(false);
	world.changeScene("purgatory");
	thread.sleep(2000);
	world.getMessages().put(["talk1", "talk2", "talk3", "talk4", "talk5", "talk6", "talk7", "talk8", "talk9", "talk10", "talk11", "talk12", "talk13"]);
	world.getMessages().put(["talk14", "talk15", "talk16", "talk17", "talk18", "talk19", "talk20", "talk21", "talk22", "talk23", "talk24", "talk25"]);
	world.getMessages().put(["talk26", "talk27", "talk28", "talk29", "talk30", "talk31", "talk32", "talk33", "talk34", "talk35", "talk36", "talk37", "talk38"]);
	
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
	world.getLevel().getScene().getLight("tallman").setVisible(true);
	world.getLevel().getScene().getLight("tallman2").setVisible(true);
	world.getLevel().getScene().getLight("tallman3").setVisible(true);
	world.getLevel().getScene().getLight("tallman4").setVisible(true);
	thread.sleep(5000);
	world.fadeIn();
	thread.sleep(5000);
	world.getPlayer().setVisible(true);
	world.changeLevel("hnight1");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
}