function start()
{
	world.setMusic("Cave");
	world.getLevel().setLightEnabled(true);
	world.getPlayer().getLight().setVisible(true);
	world.getPlayer().setX(30);
	world.getPlayer().lookRight();
	
	world.getInventory().addGoal("goal_cave");
	world.getMessages().put(["start1", "start2", "start3", "start4", "start5", "start6"]);
	world.getNotifications().put(["return"]);
	
	world.setStepSound("cave");
	
	world.Save();
}

function useLampItem()
{
	world.getMessages().put(["cantuse1", "cantuse2"]);
}

function useScrap()
{
	if(world.getSelectedKey() == "door_locked")
	{
		world.getMessages().put(["scrap1", "scrap2", "scrap3"]);
		world.getLevel().getScene().getEntity("door_locked").setVisible(false);
		world.getLevel().getScene().getEntity("door").setVisible(true);
		world.playSound("metal");
	}
	else
		world.getMessages().put(["not"]);
}

function useMap()
{
	if(world.getLevel().getSceneName() != "cave1")
		world.getActions().setActions(["Return", "notReturn"]);
	else
		world.getMessages().put(["not"]);
}

function Return()
{
	world.changeScene("cave1");
	thread.sleep(500);
	world.getPlayer().setX(270);
	world.getPlayer().lookLeft();
}

function notReturn()
{
	world.getMessages().put(["notnow"]);
}

function lookAtStair()
{
	world.getMessages().put(["stair1", "stair2"]);
}

function tryGo()
{
	world.getMessages().put(["try1", "try2"]);
}

function goToCave2()
{
	world.changeScene("cave2");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave2()
{
	world.changeScene("cave1");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave3()
{
	world.changeScene("cave3");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave3()
{
	world.changeScene("cave2");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave4()
{
	world.changeScene("cave4");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave4()
{
	world.changeScene("cave3");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave5()
{
	world.changeScene("cave5");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave5()
{
	world.changeScene("cave4");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave6()
{
	world.changeScene("cave6");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave6()
{
	world.changeScene("cave5");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave7()
{
	world.changeScene("cave7");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave7()
{
	world.changeScene("cave6");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave8()
{
	world.changeScene("cave8");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave8()
{
	world.changeScene("cave7");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave9()
{
	world.changeScene("cave9");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave9()
{
	world.changeScene("cave8");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave10()
{
	world.changeScene("cave10");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave10()
{
	world.changeScene("cave9");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave11()
{
	world.changeScene("cave11");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave11()
{
	world.changeScene("cave10");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goToCave12()
{
	world.changeScene("cave12");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave12()
{
	world.changeScene("cave11");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave13()
{
	world.changeScene("cave13");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave13()
{
	world.changeScene("cave12");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave14()
{
	world.changeScene("cave14");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave14()
{
	world.changeScene("cave13");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave15()
{
	world.changeScene("cave15");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave15()
{
	world.changeScene("cave14");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave16()
{
	world.changeScene("cave16");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave16()
{
	world.changeScene("cave15");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave22()
{
	world.changeScene("cave22");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave22()
{
	world.changeScene("cave13");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave21()
{
	world.changeScene("cave21");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave21()
{
	world.changeScene("cave22");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave23()
{
	world.changeScene("cave23");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave23()
{
	world.changeScene("cave21");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave20()
{
	world.changeScene("cave20");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goFromCave20()
{
	world.changeScene("cave21");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave19()
{
	world.changeScene("cave20");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave19()
{
	world.changeScene("cave19");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave18()
{
	world.changeScene("cave18");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave18()
{
	world.changeScene("cave7");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave182()
{
	world.changeScene("cave18");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goFromCave182()
{
	world.changeScene("cave19");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goFromCave37()
{
	world.changeScene("cave19");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave37()
{
	world.changeScene("cave37");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave36()
{
	world.changeScene("cave37");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave36()
{
	world.changeScene("cave36");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave24()
{
	world.changeScene("cave36");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave24()
{
	world.changeScene("cave24");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave25()
{
	world.changeScene("cave24");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave25()
{
	world.changeScene("cave25");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave17()
{
	world.changeScene("cave17");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave17()
{
	world.changeScene("cave4");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goToCave172()
{
	world.changeScene("cave17");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goFromCave172()
{
	world.changeScene("cave24");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goFromCave26()
{
	world.changeScene("cave25");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave26()
{
	world.changeScene("cave26");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave27()
{
	world.changeScene("cave26");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave27()
{
	world.changeScene("cave27");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave28()
{
	world.changeScene("cave28");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave28()
{
	world.changeScene("cave27");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goToCave29()
{
	world.changeScene("cave29");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave29()
{
	world.changeScene("cave28");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goFromCave30()
{
	world.changeScene("cave29");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave30()
{
	world.changeScene("cave30");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave31()
{
	world.changeScene("cave30");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave31()
{
	world.changeScene("cave31");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave32()
{
	world.changeScene("cave31");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave32()
{
	world.changeScene("cave32");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave33()
{
	world.changeScene("cave32");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave33()
{
	world.changeScene("cave33");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave34()
{
	world.changeScene("cave33");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave34()
{
	world.changeScene("cave34");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave35()
{
	world.changeScene("cave34");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave35()
{
	world.changeScene("cave35");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave38()
{
	world.changeScene("cave37");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave38()
{
	world.changeScene("cave38");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave39()
{
	world.changeScene("cave38");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave39()
{
	world.changeScene("cave39");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave40()
{
	world.changeScene("cave39");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave40()
{
	world.changeScene("cave40");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave41()
{
	world.changeScene("cave40");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave41()
{
	world.changeScene("cave41");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave42()
{
	world.changeScene("cave41");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave42()
{
	world.changeScene("cave42");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave43()
{
	world.changeScene("cave42");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave43()
{
	world.changeScene("cave43");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave44()
{
	world.changeScene("cave43");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave44()
{
	world.changeScene("cave44");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave45()
{
	world.changeScene("cave44");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goToCave45()
{
	world.changeScene("cave45");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave46()
{
	world.changeScene("cave42");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goToCave46()
{
	world.changeScene("cave46");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave47()
{
	world.changeScene("cave46");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goToCave47()
{
	world.changeScene("cave47");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goFromCave53()
{
	world.changeScene("cave47");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goToCave53()
{
	world.changeScene("cave53");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goFromCave49()
{
	world.changeScene("cave53");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave49()
{
	world.changeScene("cave49");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave50()
{
	world.changeScene("cave49");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave50()
{
	world.changeScene("cave50");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave51()
{
	world.changeScene("cave50");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave51()
{
	world.changeScene("cave51");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave52()
{
	world.changeScene("cave51");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goToCave52()
{
	world.changeScene("cave52");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goFromCave54()
{
	world.changeScene("cave53");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave54()
{
	world.changeScene("cave54");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave55()
{
	world.changeScene("cave54");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave55()
{
	world.changeScene("cave55");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave61()
{
	world.changeScene("cave55");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave61()
{
	world.changeScene("cave61");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave57()
{
	world.changeScene("cave61");
	thread.sleep(500);
	world.getPlayer().setX(160);
}

function goToCave57()
{
	world.changeScene("cave57");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goFromCave58()
{
	world.changeScene("cave57");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goToCave58()
{
	world.changeScene("cave58");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goFromCave59()
{
	world.changeScene("cave58");
	thread.sleep(500);
	world.getPlayer().setX(60);
}

function goToCave59()
{
	world.changeScene("cave59");
	thread.sleep(500);
	world.getPlayer().setX(180);
}

function goFromCave62()
{
	world.changeScene("cave61");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave62()
{
	world.changeScene("cave62");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function goFromCave63()
{
	world.changeScene("cave62");
	thread.sleep(500);
	world.getPlayer().setX(270);
}

function goToCave63()
{
	world.changeScene("cave63");
	thread.sleep(500);
	world.getPlayer().setX(30);
}

function lookAtWell()
{
	world.setMusic("Tallman Advice");
	world.getLevel().getScene().getEntity("well").setFunction("lookAtWell2");
	world.getLevel().getScene("cave1").getEntity("stair").setFunction("lookAtStair2");
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["well1", "well2", "well3"]);
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	world.playSound("ston");
	thread.sleep(15000);
	world.fadeIn();
	world.getPlayer().lookLeft();
	thread.sleep(4000);
	world.getLevel().getScene().getEntity("tallmen").setVisible(true);
	world.fadeOut();
	thread.sleep(1000);
	world.getMessages().put(["tallmen1", "tallmen2", "tallmen3", "tallmen4", "tallmen5", "tallmen6", "tallmen7", "tallmen8", "tallmen9"]);
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
	thread.sleep(5000);
	world.fadeIn();
	thread.sleep(3000);
	world.getLevel().getScene().getEntity("tallmen").setVisible(false);
	world.fadeOut();
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getPlayer().setVisible(true);
	world.getInventory().goalDone("goal_cave");
	world.getNotifications().put(["return"]);
	world.stopMusic();
}

function lookAtWell2()
{
	world.getMessages().put(["dontwant1", "dontwant2"]);
}

function lookAtStair2()
{
	world.setPauseBlocked(true);
	world.getPlayer().setLocked(true);
	world.getMessages().put(["goaway1", "goaway2"]);
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(3000);
	world.getMessages().deleteCurrent();
	thread.sleep(5000);
	world.fadeIn();
	thread.sleep(3000);
	world.getLevel().setLightEnabled(false);
	world.getPlayer().getLight().setVisible(false);
	world.getPlayer().setX(270);
	world.getPlayer().lookLeft();
	world.stopMusic();
	world.changeScene("bed1");
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getInventory().deleteItem("mapitem");
	world.getMessages().put(["tired1", "tired2"]);
	world.getInventory().addGoal("goal_sleep");
	
	world.setStepSound("wood");
}

function goFromBed1()
{
	world.getMessages().put(["enough"]);
}

function lightsKitchen()
{
	world.getLevel().getScene().getLight("lightmapk").setVisible();
	world.playSound("click2");
}

function useBed1()
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
	thread.sleep(5000);
	world.changeLevel("hdream2");
	thread.sleep(1000);
	world.setPauseBlocked(false);
	world.getPlayer().setLocked(false);
	world.getInventory().deleteItem("mapitem");
}

function lookAtTableB()
{
	world.getInventory().addNote("diary2");
	world.readNote();
	world.getLevel().getScene().getEntity("tableb").setFunction("lookAtTableB2");
	world.settingsAction();
}

function lookAtTableB2()
{
	world.getMessages().put(["tableb1", "tableb2"]);
}

function readDiary1()
{
	world.settingsAction();
	world.getInventory().addNote("olddiary2");
	world.readNote();
	world.getLevel().getScene().getEntity("diary1").setVisible(false);
}

function readDiary2()
{
	world.settingsAction();
	world.getInventory().addNote("olddiary3");
	world.readNote();
	world.getLevel().getScene().getEntity("diary1").setVisible(false);
}

function readDiary3()
{
	world.settingsAction();
	world.getInventory().addNote("olddiary4");
	world.readNote();
	world.getLevel().getScene().getEntity("diary1").setVisible(false);
}

function readDiary4()
{
	world.settingsAction();
	world.getInventory().addNote("olddiary5");
	world.readNote();
	world.getLevel().getScene().getEntity("diary1").setVisible(false);
}

function lookAtCat()
{
	world.getMessages().put(["cat1", "cat2"]);
	world.getActions().setActions(["Go", "notGo"]);
}

function notGo()
{

}

function Go()
{
	world.settingsAction();
	world.getLevel().getScene().getEntity("cat").setVisible(false);
	world.getMessages().put(["run1"]);
}