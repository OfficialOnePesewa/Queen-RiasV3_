const fs = require("fs");
require("dotenv").config();

let config = {
    prefix: process.env.PREFIX || ".",
    ownerName: process.env.OWNER_NAME || "𝑻𝒐𝒙𝒙𝒊𝒄-𝑺𝒂𝒏",
    ownerNumber: process.env.OWNER_NUMBER || "2347042081220",
    mode: process.env.MODE || "private",
    region: process.env.REGION || "Nigeria",
    botName: process.env.BOT_NAME || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifPack: process.env.EXIF_PACK || "𝐑𝐢𝐚𝐬 𝐆𝐫𝐞𝐦𝐨𝐫𝐲",
    exifAuthor: process.env.EXIF_AUTHOR || "𝑴𝒂𝒅𝒆 𝑩𝒚 𝑻𝒐𝒙𝒙𝒊𝒄",
    timeZone: process.env.TIME_ZONE || "Africa/Lagos",
    presenceStatus: process.env.PRESENCE_STATUS || "unavailable",
    autoRead: process.env.AUTO_READ?.toLowerCase() === "true" || false,
    autoViewStatus: process.env.AUTO_VIEW_STATUS?.toLowerCase() === "true" || false,
    autoReact: process.env.AUTO_REACT?.toLowerCase() === "true" || false,
    sessionId: process.env.SESSION_ID || "eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUhqWUhGclVkQXdET2RlMWU3Um15ZlVCSTBuRkk3Y2RKUXRzRjRGTEcyVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOWNpNEJzTFhnZG90SXd1TVU5em9hTE1sUTRjN1VvaHdubnhNY3o1NGloWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPTXdNbUpBaUxHSHBXa1ZuNHRFcS9telNlVkl5TlpYMHFZdGFlMlc0YzFvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaRzBUL3UvVzNPR2svSVBBblc3WGZvWTVvQWpYYjFTbW01aEE5Vm56WFE0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdLOG94UGFIZkJUWUNVVDBsdFI3NUVMWU42UmhRak0vSjNwVHpNOXE1bEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJ5UkZmcElkRWR2N3p1NEVwQWhiKzl2WFJaSjRoWWpNb0YvdDRhSlNXeXc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0dkcHI2ZGx3a2g2NWF5SWpzWWFyZXNXOENTTy82b2Z5MzdZMzRuZDRYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUYyUUpnM1YrUkREenVFT2R6R1Q0RUxiamlSd3BHbWZEakVFTmFlbWoyWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxnYXlKRGdTSkRVaVNzVXMxLzkrUHdLQUovVkJrdUg1aDdXbkVQUFZRcFdGanpFUG03UEF5UlJicEdUR2RXOVRJRUFoWnNHWlRBR0h0MEYvQUZhQkJBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM4LCJhZHZTZWNyZXRLZXkiOiJPWEZKcndpZkFHSENZbnFkdGNjMmRvZ2MwMlQ1YVFJaDhWbXpNODRHamlBPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwicmVnaXN0ZXJlZCI6dHJ1ZSwicGFpcmluZ0NvZGUiOiJSS0gzNlRMMiIsIm1lIjp7ImlkIjoiMjMzNTQ0NDgyNDk0OjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiT2ZmaWNpYWwgU29sdXRpb25zIiwibGlkIjoiMjUwMDE0NzEwNDE1NTA2OjVAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLV0Z4eFVRK0xhbXdBWVlCQ0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJHNVRadjN2ZnFxU09VbU1WdmtRZlNuZkkwek9acnByVGxTYUJkVGtsSDE0PSIsImFjY291bnRTaWduYXR1cmUiOiJhMUg2TW9sdUR0WnNNRXBzbmI1UEtjVU5GcEo5Vm1oWDlveXNxM3lTaEQ0UzMxWkl3RDRseUVoNnpDaUJCbHlFb3RYK3o2MDhERTNRUzZzeWFqZGRBdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSWxCRkVMZkp3TW53ZGVoQTEwZkFPMGpzVEFZNmtsWWp1MXhIU1VOWEs4TXNKQ0FFeFU0YmYrUEpyMSthZlg4cXdhcFdrRE9kN0NHS2JnWVU2ZnhxQ3c9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzM1NDQ0ODI0OTQ6NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJSdVUyYjk3MzZxa2psSmpGYjVFSDBwM3lOTXptYTZhMDVVbWdYVTVKUjllIn19XSwicGxhdGZvcm0iOiJzbWJhIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQWdJRWc9PSJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDU0NjAxMDIsImxhc3RQcm9wSGFzaCI6Im5tM0JiIn0=",
    autoRejectEnabled: process.env.AUTO_REJECT_ENABLED?.toLowerCase() === "true" || false,
    antiDelete: process.env.ANTIDELETE?.toLowerCase() === "true" || false,
    sessionSite: process.env.SESSION_SITE || 'https://session-toxxictech.zone.id',    
    menuType: process.env.MENU_TYPE || 2  // 1 = Image, 2 = Video
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(`🔥 Update detected in '${__filename}', reloading Rias Gremory's config...`);
    delete require.cache[file];
    config = require(file);
});

module.exports = config;
