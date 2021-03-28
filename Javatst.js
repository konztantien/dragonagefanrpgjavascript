//consts go here//
const fs = require('fs');

const readline = require('readline').createInterface
    ({
    input: process.stdin,
    output: process.stdout
    });

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
//end color def//
//end of consts//




//vars go here//
let playername = 0;
let playerage = 0;
var playernamesw = 0;
var playeragesw = 0;
var playerlvl = 0;
var health = 0;
var gold = 0;
var mana = 0;
var holdname = 0;
var holdage = 0;
var map = [40, 60, 3];
let playerloc = [0, 0, 0];
let input = 0;
var intialsw = 0;
//end of vars//


//functs go here//

//stats intitilzation//
function Getstats()
{
    readline.question("Please tell me your name. \n\n", playername =>
    {
        console.log("\n\nYou have chosen the name: %s. \n\n", playername);
        playernamesw = 1;
        holdname = playername;
        readline.question("Please tell me your age. \n\n", playerage =>
        {
        console.log("\n\nYou have entered %s as your age.\n\n", playerage);
            playeragesw = 1;
            playerlvl = 1;
            holdage = playerage;
            playerloc = [0, 0, 0];
            Main();
        });
    });
}

//Date & Time function//

let ts = Date.now();
let date_ob = new Date(ts);
let hours = date_ob.getHours();
let minutes = date_ob.getMinutes();
let date = date_ob.getDate();
let month = date_ob.getMonth() + 1;
let year = date_ob.getFullYear();
let realhours = hours - 12;

function datetimestamp()
{
    let dn = 0;

    if (hours < 11)
    {
        dn = "Morning";
    }

    if (hours > 11 && hours < 16)
    {
        dn = "Afternoon";
    }

    if (hours > 16 && hours < 20)
    {
        dn = "Evening";
    }

    if (hours > 20)
    {
        dn = "Night";
    }
    
    if (hours < 12&&minutes<10)
    {
            console.log("\x1b[0m  " + realhours + ":0" + minutes + "AM " + month + "-" + date + "-" + year + "  " + "\x1b[40m %s \x1b[0m", dn);
    }
    
    if (hours < 12 && minutes > 10)
    {
        console.log("\x1b[0m  " + realhours + ":0" + minutes + "AM " + month + "-" + date + "-" + year + "  " + "\x1b[40m %s \x1b[0m", dn);
    }
    
    if (hours > 12 && minutes < 10)
    {
        console.log("\x1b[0m  " + realhours + ":0" + minutes + "PM " + month + "-" + date + "-" + year + "  " + "\x1b[40m %s \x1b[0m", dn);
    }

    if (hours > 12 && minutes > 10)
    {
        console.log("\x1b[0m  " + realhours + ":" + minutes + "PM " + month + "-" + date + "-" + year + "  " + "\x1b[40m %s \x1b[0m", dn);

    }
};
//end date&time//


//day/night system//
function daynight()
{
    if (hours < 11)
    {
        dnstatus="Morning";
    }

    if (hours > 11 && hours < 16)
    {
        dnstatus ="Afternoon";
    }

    if (hours > 16 && hours < 20)
    {
        dnstatus ="Evening";
    }

    if (hours > 20)
    {
        dnstatus ="Night";
    }
};
//end day/night system//

//save function//
/* Work in PROGRESS
function Save()
{
    var savedata=(playername, playerlvl, health, mana, gold, playerloc);
    fs.writeFileSync("save.txt", savedata, (err) =>
        {
            if (err) console.log(err);
            console.log("Game Saved.");
         });
    Hud();
};
//end save//

//load function//
function Load()
{
    const data = fs.readFileSync("save.txt", "%s %d %d %d %d %s", playername, playerlvl, health, mana, gold, playerloc);
    Hud();
};
//end load//
*/

//coordinates//
function Coord()
{
    console.log("  \x1b[33mLocation: %s", playerloc);
};

//HUD display//
function Hud()
{
    Coord();
    datetimestamp();
    console.log("\x1b[32m< %s LV: %d H \x1b[31m %d \x1b[32m M \x1b[34m %d \x1b[32m G \x1b[33m %d \x1b[32m >\x1b[0m", holdname, playerlvl, health, mana, gold);
};

//Commands//
function Commands()
{
    readline.question("Enter Command: ", input =>
    {
        if (input=save)
        {
            Save();
            input = 0;
            Main();
        }
        
        if (input=load)
        {
            Load();
            input = 0;
            Main();
        }
    });
};

function Graphic()
{
    if (playernamesw == 0) {
        //print opening graphics//

        console.log("\n\n                                       ,                                     \n");
        console.log("                                      ,  ,      ,          ,   ,     ,       \n");
        console.log("                                       ,         ,    ,            ,         \n");
        console.log("                                     ,       .,,,,,.,.........,,,,,,,,,,.    \n");
        console.log("                               ,,  ,,   ,,,,......,,,,,,,,,,,,,,,,,,         \n");
        console.log("                                    ,,,,,,,,,,,,,,..,,,,,,.,,,,,             \n");
        console.log("                                ,,,,,,,,,,,,,,,,,,,,,,,,,,,~                 \n");
        console.log("                       ,     ,,,,,,,,,,,,,,,,,,,,,,,.,,,                     \n");
        console.log("                        , ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                      \n");
        console.log("               ,    , ,  ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,    ,                  \n");
        console.log("               ,     , ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,, ,                    \n");
        console.log("                     ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                      \n");
        console.log("                ,  , ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                   \n");
        console.log("                ,,, ,,,,,,,,,,,,,,,,,:,,,,,,,,,,,,,,,,,,,,  ,,               \n");
        console.log("                 ,,,,,,,,,,,,,,,,,,,:,,,,,,,,,,,,,,,,,                       \n");
        console.log("             ,   ,,,,,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                        \n");
        console.log("            ,      ,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,                          \n");
        console.log("               , , ,,,,,,,,,,,,,,,,,,,,,,,,,,,,                              \n");
        console.log("               ,   ,,,,,,,,.:,,,,,::,,,,,,,,    ,,,,,,,                      \n");
        console.log("           .    , ,,,,,,,,,...,,,,,,~+=:,,.. ,,,,,,,,,,,,                    \n");
        console.log("             ,  ,,......,,.....=,,,,:=~:,,,,,,,,,,,,,,,,,,,                  \n");
        console.log("      ,  ,    , , ,,..,,,,,.....:~,,,,,,,,,,,,,,,,,,,,,,,,,                  \n");
        console.log("      ,   ,,      ,,,,,,,,...,,..:,,,,,,,,,,,,, ,,,  ,,,,,,,                 \n");
        console.log("      ,  , ,       ,,,,,,....,...,~,,,,,,,,,, ,        ,,,,,,                \n");
        console.log("      ,,  ,  ,      ,:,,,..,..,..,,,:,,,,,,,          , ,,,,       ,         \n");
        console.log("         ,, ,      , ,,,.,.....:.,,,,,,:,,,             ,,,,,                \n");
        console.log("     , ,,,,,,,,,     ,,..,,. ,,,,,,.,,,,:, ,             ,,,,                \n");
        console.log("       ,,,,,,,,,, ~  ,.,.,..,..,,,,.,..,, ,,,,          ,,,,                 \n");
        console.log("     ,,,,,  ,,,,,,,  ,..:..........,,,.,.,,,,,,,       ,,,,,,                \n");
        console.log("     ,,,,     ,,,,, ,..,.........,,,,...,,,,.,,     ,,,,,,,                  \n");
        console.log("     ,,,      ,,,,,,,,,.,........,,,,.,,,,, ,,,  ,,,,,,,,                    \n");
        console.log("    ,,,,,      ,,,,,,,,.,,..,..,,,,,,...,   ,,  ,,,,,,                       \n");
        console.log("     , ,         ,,,,,,,.....,,,,,,        ,, ,  ,,,                         \n");
        console.log("    ,, ,,   , ,,,,,,,..........  ,        ,,      ,,,,,                      \n");
        console.log("           ,,,        .,,, ,      ,        ,         :,,                     \n");
        console.log("          ,,,,    :,,,,,,,,,                        :,,                      \n");
        console.log("          ,      ,,,    ,,,,, ,                    ,,                        \n");
        console.log("                ,,,                                                          \n");
        console.log("                                                                             \n");
        console.log(".Z$ZZZOO8Z?.                                                  .$                    \n");
        console.log("    ++....7O+                                                 ~Z .                  \n");
        console.log("   .++.    Z?.. OODOI.   7      ZD$Z8   .OINO.  .O.  .$:..   .ZOI.  ..Z++ZI .$8DO   \n");
        console.log("   .+?.     $O  I$ .$?  .$Z    8.   ?   Z. ..Z,  Z8.. Z      =.ZZ.  ,Z    7  O:     \n");
        console.log("   .I?      $$  ZO .$   I.I=  $I       Z$    $I. $ZO. $    ..Z..?+. ZZ       $:     \n");
        console.log("..88Z$$$+:+  $8 .=~?$   7Z7+  Z$..:O7Z $O.   $7  Z..Z:7.   .ID8O7+  II  .Z$OZ7IOO,. \n");
        console.log("    =Z. ..  I,  +7 ?7. $:  ?=  I..  =  :=    I,. 8 ..$Z.   .$   .?7. $   :7  I:  .  \n");
        console.log("   .=~     :.   ~:  ??7.  .,,.  7+..I   ,=~,I .. +    :    +7    ==.. +?=:$  I?~?7  \n");
        console.log("  .$O,:,:~,            .        .     .          . .=.    ,:=.                      \n");
        console.log(" .                                                                                  \n");
        console.log("                 ______ _______ __   _ _______ _______ _____ _______              \n");
        console.log("                |  ____ |______ | \\  | |______ |______   |   |______              \n");
        console.log("                |_____| |______ |  \\_| |______ ______| __|__ ______|              \n");
        console.log("                                                                              \n\n\n");

        console.log("\n\n                     Welcome to Dragon Age Genesis.                           \n\n");
    }

    if (playernamesw != 0)
    {
        console.log("                                                                                    \n");
        console.log(".Z$ZZZOO8Z?.                                                  .$                    \n");
        console.log("    ++....7O+                                                 ~Z .                  \n");
        console.log("   .++.    Z?.. OODOI.   7      ZD$Z8   .OINO.  .O.  .$:..   .ZOI.  ..Z++ZI .$8DO   \n");
        console.log("   .+?.     $O  I$ .$?  .$Z    8.   ?   Z. ..Z,  Z8.. Z      =.ZZ.  ,Z    7  O:     \n");
        console.log("   .I?      $$  ZO .$   I.I=  $I       Z$    $I. $ZO. $    ..Z..?+. ZZ       $:     \n");
        console.log("..88Z$$$+:+  $8 .=~?$   7Z7+  Z$..:O7Z $O.   $7  Z..Z:7.   .ID8O7+  II  .Z$OZ7IOO,. \n");
        console.log("    =Z. ..  I,  +7 ?7. $:  ?=  I..  =  :=    I,. 8 ..$Z.   .$   .?7. $   :7  I:  .  \n");
        console.log("   .=~     :.   ~:  ??7.  .,,.  7+..I   ,=~,I .. +    :    +7    ==.. +?=:$  I?~?7  \n");
        console.log("  .$O,:,:~,            .        .     .          . .=.    ,:=.                      \n");
        console.log(" .                                                                                  \n");
        console.log("                 ______ _______ __   _ _______ _______ _____ _______                \n");
        console.log("                |  ____ |______ | \\  | |______ |______   |   |______               \n");
        console.log("                |_____| |______ |  \\_| |______ ______| __|__ ______|               \n");
        console.log("                                                                                \n\n\n");


    }

}; //close graphic function//

//How main runs//
function Main()
{
    //intialize the game for first time//
    Graphic();

    if (playernamesw == 0)
    {
        Getstats();
    }
    //end intialization//

    if (playernamesw != 0) 
    {
        //Load();//
        Hud();
        intialsw = 1;
        Commands();
    }
    /*if (intialsw != 0)
    {
        Hud();
        initialsw = 1;
        Commands();
    }*/

    return 0;
}
//end of functs//





//body of program//
Main();