//consts go here//
const readline = require('readline').createInterface
    ({
    input: process.stdin,
    output: process.stdout
    });
const fs = require('fs');



//Color definitions//
const Reset = "\x1b[0m";
const Bright = "\x1b[1m";
const Dim = "\x1b[2m";
const Underscore = "\x1b[4m";
const Blink = "\x1b[5m";
const Reverse = "\x1b[7m";
const Hidden = "\x1b[8m";
const Black = "\x1b[30m";
const Red = "\x1b[31m";
const Green = "\x1b[32m";
const Yellow = "\x1b[33m";
const Blue = "\x1b[34m";
const Magenta = "\x1b[35m";
const Cyan = "\x1b[36m";
const White = "\x1b[37m";

const BgBlack = "\x1b[40m";
const BgRed = "\x1b[41m";
const BgGreen = "\x1b[42m";
const BgYellow = "\x1b[43m";
const BgBlue = "\x1b[44m";
const BgMagenta = "\x1b[45m";
const BgCyan = "\x1b[46m";
const BgWhite = "\x1b[47m";
const save = "save";
const load = "load";
const exit = "exit";
//end color def//
//end of consts//




//vars go here//
let ts = Date.now();
let date_ob = new Date(ts);
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let realhoursPM = hours - 12;
let realhours = hours;
var savedataswitcher = 0;
let playername = 0;
let playerage = 0;
let dn = 0;
let dnstatus = 0;
var playernamesw = 0;
var playeragesw = 0;
var playerlvl = 0;
var health = 0;
var gold = 0;
var mana = 0;
let savedata = 0;
var holdname = 0;
var holdage = 0;
var map = [40, 60, 3];
let playerloc = [0, 0, 0];
let input = 0;
var intialsw = 0;
var savedatasw = 0;
var savecoord = 0;
let initial_save = 0;
var statsw = 0;
var playerinfo =
{
    playername,
    playerlvl,
    health,
    mana,
    gold,
    savecoord,
    savedatasw
};
//end of vars//


//functs go here//

//stats intitilzation//
function Getstats()
{
    if (input==0)
    {
        readline.question("\n\nPlease tell me your name. ", playername =>
        {
            console.log("\nYou have chosen the name: %s. ", playername);
            playernamesw = 1;
            holdname = playername;
            health=100;
            mana=50;
            gold=10;
            playerlvl = 1;
            playerloc = [0, 0, 0];
            savedatasw = 1;
            input = 1;
            Save();
            Graphic2();
            Map();
            Hud();
            Commands();
        });
    }
};

//Date & Time function//

function datetimestamp()
{
    daynight();

    if (hours < 12 && minutes < 10)
    {
        console.log("\x1b[0m  " + realhours + ":0" + minutes + "AM " + month + "-" + date + "-" + year + "  " + "\x1b[40m %s \x1b[0m", dn);
        return;
    }
    
    if (hours < 12 && minutes > 10)
    {
        console.log("\x1b[0m  " + realhours + ":" + minutes + "AM " + month + "-" + date + "-" + year + "  " + "\x1b[40m %s \x1b[0m", dn);
        return;
    }
    
    if (hours > 12 && minutes < 10)
    {
        console.log("\x1b[0m  " + realhoursPM + ":0" + minutes + "PM " + month + "-" + date + "-" + year + "  " + "\x1b[40m %s \x1b[0m", dn);
        return;
    }

    if (hours > 12 && minutes > 10)
    {
        console.log("\x1b[0m  " + realhoursPM + ":" + minutes + "PM " + month + "-" + date + "-" + year + "  " + "\x1b[40m %s \x1b[0m", dn);
        return;
    }
    return;
};
//end date&time//


//day/night system//
function daynight()
{
   
    if (hours < 12)
    {
        dnstatus = "Morning";
        dn = dnstatus;
        return;
    }

    if (hours > 12 && hours < 16)
    {
        dnstatus = "Afternoon";
        dn = dnstatus;
        return;
    }

    if (hours > 16 && hours < 20)
    {
        dnstatus = "Evening";
        dn = dnstatus;
        return;
    }

    else
    {
        dnstatus = "Night";
        dn = dnstatus;
        return;
    }
 return;
};
//end day/night system//

//save function//

function Save() 
{
   /* var savearr = [holdname, playerlvl, health, mana, gold, savecoord];
    var savedata = JSON.stringify(savearr);*/
    savedatasw = 1;
    playerinfo.playername=playername;
    playerinfo.playerlvl=playerlvl;
    playerinfo.health=health;
    playerinfo.mana=mana;
    playerinfo.gold=gold;
    playerinfo.savecoord=savecoord;
    playerinfo.savedatasw=savedatasw;
    
    fs.writeFileSync("save.json", JSON.stringify(playerinfo));
    
    return;
};
//end save//

//load function//
function Load()
{
    // The file *does* exist
    if (fs.existsSync("save.json"))
    {
        savedatasw = 1;
        const importdata = fs.readFileSync('save.json', 'utf8');
        const playerdata = JSON.parse(importdata);
        playername=playerdata.playername;
        playerlvl=playerdata.playerlvl;
        health=playerdata.health;
        mana=playerdata.mana;
        gold=playerdata.gold;
        savecoord=playerdata.savecoord;
        savedatasw=playerdata.savedatasw;
        playerinfo.playername=playername;
        playerinfo.playerlvl=playerlvl;
        playerinfo.health=health;
        playerinfo.mana=mana;
        playerinfo.gold=gold;
        playerinfo.savecoord=savecoord;
        playerinfo.savedatasw=savedatasw;
        return;
    }

    return;
    };
//end load//


//coordinates//
function Coord()
{
    console.log("  \x1b[33mLocation: %s\n", playerloc);
};

//HUD display//
function Hud()
{
    Coord();
    datetimestamp();
    console.log("\n\x1b[32m< %s LV: %d H \x1b[31m %d \x1b[32m M \x1b[34m %d \x1b[32m G \x1b[33m %d \x1b[32m >\x1b[0m", playerinfo.playername, playerinfo.playerlvl, playerinfo.health, playerinfo.mana, playerinfo.gold);
};

//save check function//
function Savecheck()
{
    if (fs.existsSync("save.json"))
        {
            initial_save=1;
            return;
        }
        else
        {
            initial_save=0;
            return;
        }   
};


//Map function//
function Map()
{
    if (playerloc=[0, 0, 0])
    {
        savecoord = "zero";
        console.log("\x1b[40m");
        console.log(Cyan, "~~~~", Yellow, "========================");
        console.log(Cyan, "~~", Yellow, "==========================");
        console.log(Cyan, "~~~~", Yellow, "============", Green, "#########", Yellow, "===");
        console.log(Cyan, "~~~", Yellow, "============", Green, "############", Yellow, "=");
        console.log(Cyan, "~~~", Yellow, "==========", Green, "####", Yellow, "=======", Green, "####");
        console.log(Cyan, "~~", Yellow, "===========", Green, "####", Yellow, "========", Green, "###");
        console.log(Cyan, "~~~~", Yellow, "========", Green, "####", Yellow, "==========", Green, "##");
        console.log(Cyan, "~~~~~~", Yellow, "======", Green, "####", Yellow, "===========", Green, "#");
        console.log(Cyan, "~~~~~~", Yellow, "======", Green, "####", Yellow, "============");
        console.log(Cyan, "~~~~~", Yellow, "=======", Green, "####", Yellow, "============");
        console.log(Cyan, "~~", Yellow, "==========", Green, "####", Yellow, "============\x1b[0m");

    }
   /* else
    {
        console.log("");
        console.log(Cyan, "~~~~", Yellow, "========================");
        console.log(Cyan, "~~", Yellow, "==========================");
        console.log(Cyan, "~~~~", Yellow, "============", Green, "#########", Yellow, "===");
        console.log(Cyan, "~~~", Yellow, "============", Green, "############", Yellow, "=");
        console.log(Cyan, "~~~", Yellow, "==========", Green, "####", Yellow, "=======", Green, "####");
        console.log(Cyan, "~~", Yellow, "===========", Green, "####", Yellow, "========", Green, "###");
        console.log(Cyan, "~~~~", Yellow, "========", Green, "####", Yellow, "==========", Green, "##");
        console.log(Cyan, "~~~~~~", Yellow, "======", Green, "####", Yellow, "===========", Green, "#");
        console.log(Cyan, "~~~~~~", Yellow, "======", Green, "####", Yellow, "============");
        console.log(Cyan, "~~~~~", Yellow, "=======", Green, "####", Yellow, "============");
        console.log(Cyan, "~~", Yellow, "==========", Green, "####", Yellow, "============", Reset);
        return;
    }*/

};
//end map function//

//Commands//
function Commands()
{
    input = 0;
    if (input != 2)
    {
        readline.question("Enter Command: ", input =>
        {
            if (input == save)
            {
                playerinfo.playername=playername;
                playerinfo.playerlvl=playerlvl;
                playerinfo.health=health;
                playerinfo.mana=mana;
                playerinfo.gold=gold;
                playerinfo.savecoord=savecoord;
                playerinfo.savedatasw=savedatasw;
                Save();
                input = 0;
                Map();
                Hud();
                console.log("\n\nGame saved.\n\n");
                Commands();
                return;
            }
        
            if (input == load)
            {
                Load();
                input = 0;
                Map();
                Hud();
                console.log("\n\nGame loaded.\n\n");
                Commands();

                return;
            }

            if (input == exit)
            {
                
                playerinfo.playername=playername;
                playerinfo.playerlvl=playerlvl;
                playerinfo.health=health;
                playerinfo.mana=mana;
                playerinfo.gold=gold;
                playerinfo.savecoord=savecoord;
                playerinfo.savedatasw=savedatasw;
                Save();
                console.log("\n\nGame saved. Exiting.\n\n");
                process.exit();
            }

            else 
            {
                Map();
                Hud();
                console.log(Red,"You have entered an incorrect command. Please try again.", Reset);
                Commands();
            }
            
        return;
        });
    return;
    };
};

function Graphic1()
{
    //print opening graphics//
            console.log("\x1b[40m\x1b[5m                                       ,                                     ");
            console.log("                                      ,  ,      ,          ,   ,     ,       ");
            console.log("                                       ,         ,    ,            ,         ");
            console.log("    ß                                 ,       .,,,,,.,.........,,,,,,,,,,.    ");
            console.log("                               ,,  ,,   ,,,,......,,,,,,,,,,,,,,,,,,         ");
            console.log("                                    ,,,,,,,,,,,,,,..,,,,,,.,,,,,             ");
            console.log("                                ,,,,,,,,,,,,,,,,,,,,,,,,,,,~                 ");
            console.log("                       ,     ,,,,,,,,,,,,,,,,,,,,,,,.,,,                     ");
            console.log("                        , ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                      ");
            console.log("               ,    , ,  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,    ,                  ");
            console.log("               ,     , ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ,                    ");
            console.log("                     ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                      ");
            console.log("                ,  , ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                   ");
            console.log("                ,,, ,,,,,,,,,,,,,,,,,:,,,,,,,,,,,,,,,,,,,,  ,,               ");
            console.log("                 ,,,,,,,,,,,,,,,,,,,:,,,,,,,,,,,,,,,,,                       ");
            console.log("             ,   ,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                        ");
            console.log("            ,      ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                          ");
            console.log("               , , ,,,,,,,,,,,,,,,,,,,,,,,,,,,,                              ");
            console.log("               ,   ,,,,,,,,.:,,,,,::,,,,,,,,    ,,,,,,,                      ");
            console.log("           .    , ,,,,,,,,,...,,,,,,~+=:,,.. ,,,,,,,,,,,,                    ");
            console.log("             ,  ,,......,,.....=,,,,:=~:,,,,,,,,,,,,,,,,,,,                  ");
            console.log("      ,  ,    , , ,,..,,,,,.....:~,,,,,,,,,,,,,,,,,,,,,,,,,                  ");
            console.log("      ,   ,,      ,,,,,,,,...,,..:,,,,,,,,,,,,, ,,,  ,,,,,,,                 ");
            console.log("      ,  , ,       ,,,,,,....,...,~,,,,,,,,,, ,        ,,,,,,                ");
            console.log("      ,,  ,  ,      ,:,,,..,..,..,,,:,,,,,,,          , ,,,,       ,         ");
            console.log("         ,, ,      , ,,,.,.....:.,,,,,,:,,,             ,,,,,                ");
            console.log("     , ,,,,,,,,,     ,,..,,. ,,,,,,.,,,,:, ,             ,,,,                ");
            console.log("       ,,,,,,,,,, ~  ,.,.,..,..,,,,.,..,, ,,,,          ,,,,                 ");
            console.log("     ,,,,,  ,,,,,,,  ,..:..........,,,.,.,,,,,,,       ,,,,,,                ");
            console.log("     ,,,,     ,,,,, ,..,.........,,,,...,,,,.,,     ,,,,,,,                  ");
            console.log("     ,,,      ,,,,,,,,,.,........,,,,.,,,,, ,,,  ,,,,,,,,                    ");
            console.log("    ,,,,,      ,,,,,,,,.,,..,..,,,,,,...,   ,,  ,,,,,,                       ");
            console.log("     , ,         ,,,,,,,.....,,,,,,        ,, ,  ,,,                         ");
            console.log("    ,, ,,   , ,,,,,,,..........  ,        ,,      ,,,,,                      ");
            console.log("           ,,,        .,,, ,      ,        ,         :,,                     ");
            console.log("          ,,,,    :,,,,,,,,,                        :,,                      ");
            console.log("          ,      ,,,    ,,,,, ,                    ,,                        ");
            console.log("                ,,,                                                          ");
            console.log("                                                                             ");
            console.log("\x1b[40m\x1b[5m.Z$ZZZOO8Z?.                                                  .$                    ");
            console.log("    ++....7O+                                                 ~Z .                  ");
            console.log("   .++.    Z?.. OODOI.   7      ZD$Z8   .OINO.  .O.  .$:..   .ZOI.  ..Z++ZI .$8DO   ");
            console.log("   .+?.     $O  I$ .$?  .$Z    8.   ?   Z. ..Z,  Z8.. Z      =.ZZ.  ,Z    7  O:     ");
            console.log("   .I?      $$  ZO .$   I.I=  $I       Z$    $I. $ZO. $    ..Z..?+. ZZ       $:     ");
            console.log("..88Z$$$+:+  $8 .=~?$   7Z7+  Z$..:O7Z $O.   $7  Z..Z:7.   .ID8O7+  II  .Z$OZ7IOO,. ");
            console.log("    =Z. ..  I,  +7 ?7. $:  ?=  I..  =  :=    I,. 8 ..$Z.   .$   .?7. $   :7  I:  .  ");
            console.log("   .=~     :.   ~:  ??7.  .,,.  7+..I   ,=~,I .. +    :    +7    ==.. +?=:$  I?~?7  ");
            console.log("  .$O,:,:~,            .        .     .          . .=.    ,:=.                      ");
            console.log(" .                                                                                  ");
            console.log("                 ______ _______ __   _ _______ _______ _____ _______                ");
            console.log("                |  ____ |______ | \\  | |______ |______   |   |______               ");
            console.log("                |_____| |______ |  \\_| |______ ______| __|__ ______|               ");
            console.log("                                                                              \x1b[0m");

            console.log("\n\n                     Welcome to Dragon Age Genesis.                           ");
        
         
}; //close graphic function//

//Alt graph func//
function Graphic2()
{
    console.log("\x1b[40m\x1b[5m                                                                                   ");
    console.log(".Z$ZZZOO8Z?.                                                  .$                    ");
    console.log("    ++....7O+                                                 ~Z .                  ");
    console.log("   .++.    Z?.. OODOI.   7      ZD$Z8   .OINO.  .O.  .$:..   .ZOI.  ..Z++ZI .$8DO   ");
    console.log("   .+?.     $O  I$ .$?  .$Z    8.   ?   Z. ..Z,  Z8.. Z      =.ZZ.  ,Z    7  O:     ");
    console.log("   .I?      $$  ZO .$   I.I=  $I       Z$    $I. $ZO. $    ..Z..?+. ZZ       $:     ");
    console.log("..88Z$$$+:+  $8 .=~?$   7Z7+  Z$..:O7Z $O.   $7  Z..Z:7.   .ID8O7+  II  .Z$OZ7IOO,. ");
    console.log("    =Z. ..  I,  +7 ?7. $:  ?=  I..  =  :=    I,. 8 ..$Z.   .$   .?7. $   :7  I:  .  ");
    console.log("   .=~     :.   ~:  ??7.  .,,.  7+..I   ,=~,I .. +    :    +7    ==.. +?=:$  I?~?7  ");
    console.log("  .$O,:,:~,            .        .     .          . .=.    ,:=.                      ");
    console.log(" .                                                                                  ");
    console.log("                 ______ _______ __   _ _______ _______ _____ _______                ");
    console.log("                |  ____ |______ | \\  | |______ |______   |   |______               ");
    console.log("                |_____| |______ |  \\_| |______ ______| __|__ ______|               ");
    console.log("                                                                                \x1b[0m\n\n");

};
///end alt graph//



//How main runs//
function Main()
{
    initial_save=0;
    Savecheck();

        if (initial_save == 0)
        {
        
                Graphic1();
                Getstats();
        
        }

        if (initial_save == 1)
        {
            
            Graphic2();
            Load();
            Map();
            Hud();
            Commands();
           
        }
    
};
    //end initialization//

//end of functs//


//Main call||body of program//

Main();