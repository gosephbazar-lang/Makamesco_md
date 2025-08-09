const { zokou } = require('../framework/zokou');
const Heroku = require('heroku-client');
const fs = require('fs');
const s = require("../set");
const axios = require("axios");
const conf = require(__dirname + "/../set");
const { sleep } = require("../framework/index");

// Helper to save config file
function saveConfig() {
  fs.writeFileSync("./config.json", JSON.stringify(config, null, 2));
}

// Helper to get environment variable description from app.json
function getDescriptionFromEnv(varName) {
  try {
    const filePath = "./app.json";
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const configFile = JSON.parse(fileContent);
    return configFile.env?.[varName]?.description || "The environment variable description was not found.";
  } catch (error) {
    console.error("Error reading app.json:", error);
    return "Error retrieving environment variable description.";
  }
}

// PREFIX COMMAND
zokou({
  nomCom: "setprefix",
  alias: ["prefix"],
  categorie: "Dave-Mods",
  reaction: "⚙️",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");

  if (!args[0]) return repondre("❌ Please provide a new prefix.");

  config.PREFIX = args[0];
  saveConfig();

  repondre(`✅ Prefix changed to: ${config.PREFIX}`);

  const { exec } = require("child_process");
  repondre("♻️ Restarting bot to apply new prefix...");
  await sleep(1500);
  exec("pm2 restart all");
});

// MODE COMMAND
zokou({
  nomCom: "mode",
  categorie: "Dave-Mods",
  reaction: "🔄",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");

  if (!args[0]) {
    return repondre(`ℹ️ Current mode: *${config.MODE}*\nUsage: .mode private | public`);
  }

  const mode = args[0].toLowerCase();

  if (mode === "private" || mode === "public") {
    config.MODE = mode;
    saveConfig();
    repondre(`✅ Bot mode set to *${mode}*.`);

    if (mode === "public") {
      const { exec } = require("child_process");
      repondre("♻️ Restarting bot to apply changes...");
      await sleep(1500);
      exec("pm2 restart all");
    }
  } else {
    repondre("❌ Invalid mode! Use `private` or `public`.");
  }
});



// AUTORECORDING COMMAND
zokou({
  nomCom: "autoreacording",
  alias: ["autorecording"],
  categorie: "Dave-Mods",
  reaction: "🎙️",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.AUTO_RECORDING = "true";
    saveConfig();
    repondre("✅ Fake recording enabled.");
  } else if (val === "off") {
    config.AUTO_RECORDING = "false";
    saveConfig();
    repondre("❌ Fake recording disabled.");
  } else {
    repondre("⚠️ Usage: .autorecording on/off");
  }
});


// STATUSREACT COMMAND
zokou({
  nomCom: "statusreact",
  alias: ["statusreact"],
  categorie: "Dave-Mods",
  reaction: "❤️",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.AUTO_STATUS_REACT = "true";
    saveConfig();
    repondre("✅ Auto status react enabled.");
  } else if (val === "off") {
    config.AUTO_STATUS_REACT = "false";
    saveConfig();
    repondre("❌ Auto status react disabled.");
  } else {
    repondre("⚠️ Usage: .statusreact on/off");
  }
});

// READMESSAGE COMMAND
zokou({
  nomCom: "readmessage",
  alias: ["autoread"],
  categorie: "Dave-Mods",
  reaction: "📖",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.READ_MESSAGE = "true";
    saveConfig();
    repondre("✅ Read message feature enabled.");
  } else if (val === "off") {
    config.READ_MESSAGE = "false";
    saveConfig();
    repondre("❌ Read message feature disabled.");
  } else {
    repondre("⚠️ Usage: .readmessage on/off");
  }
});

// ANTIBAD COMMAND
zokou({
  nomCom: "antibad",
  alias: ["antibad"],
  categorie: "Dave-Mods",
  reaction: "🚫",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.ANTI_BAD = "true";
    saveConfig();
    repondre("✅ Anti bad word feature enabled.");
  } else if (val === "off") {
    config.ANTI_BAD = "false";
    saveConfig();
    repondre("❌ Anti bad word feature disabled.");
  } else {
    repondre("⚠️ Usage: .antibad on/off");
  }
});

// AUTOSTICKER COMMAND
zokou({
  nomCom: "autosticker",
  alias: ["autosticker"],
  categorie: "Dave-Mods",
  reaction: "🖼️",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.AUTO_STICKER = "true";
    saveConfig();
    repondre("✅ Auto-sticker enabled.");
  } else if (val === "off") {
    config.AUTO_STICKER = "false";
    saveConfig();
    repondre("❌ Auto-sticker disabled.");
  } else {
    repondre("⚠️ Usage: .autosticker on/off");
  }
});

// AUTOREPLY COMMAND
zokou({
  nomCom: "autoreply",
  alias: ["autoreply"],
  categorie: "Dave-Mods",
  reaction: "🤖",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.AUTO_REPLY = "true";
    saveConfig();
    repondre("✅ Auto-reply enabled.");
  } else if (val === "off") {
    config.AUTO_REPLY = "false";
    saveConfig();
    repondre("❌ Auto-reply disabled.");
  } else {
    repondre("⚠️ Usage: .autoreply on/off");
  }
});

// AUTOVOICE COMMAND
zokou({
  nomCom: "autovoice",
  alias: ["autovoice"],
  categorie: "Dave-Mods",
  reaction: "🎤",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.AUTO_VOICE = "true";
    saveConfig();
    repondre("✅ Auto-voice enabled.");
  } else if (val === "off") {
    config.AUTO_VOICE = "false";
    saveConfig();
    repondre("❌ Auto-voice disabled.");
  } else {
    repondre("⚠️ Usage: .autovoice on/off");
  }
});

// AUTOREACT COMMAND
zokou({
  nomCom: "autoreact",
  alias: ["autoreact","areact"],
  categorie: "Dave-Mods",
  reaction: "✨",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.AUTO_REACT = "true";
    saveConfig();
    repondre("✅ Auto-react enabled.");
  } else if (val === "off") {
    config.AUTO_REACT = "false";
    saveConfig();
    repondre("❌ Auto-react disabled.");
  } else {
    repondre("⚠️ Usage: .autoreact on/off");
  }
});

// CUSTOMREACT COMMAND
zokou({
  nomCom: "customreacts",
  alias: ["heartreact","dillreact"],
  categorie: "Dave-Mods",
  reaction: "💖",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.CUSTOM_REACT = "true";
    saveConfig();
    repondre("✅ Heart react enabled.");
  } else if (val === "off") {
    config.CUSTOM_REACT = "false";
    saveConfig();
    repondre("❌ Heart react disabled.");
  } else {
    repondre("⚠️ Usage: .customreacts on/off");
  }
});



// STATUSREPLY COMMAND
zokou({
  nomCom: "statusreply",
  alias: ["autostatusreply"],
  categorie: "Dave-Mods",
  reaction: "🔔",
  nomFichier: __filename,
}, async (dest, zk, { args, repondre }) => {
  if (!config.OWNER.includes(dest)) return repondre("⛔ Only the owner can use this command!");
  const val = args[0]?.toLowerCase();
  if (val === "on") {
    config.AUTO_STATUS_REPLY = "true";
    saveConfig();
    repondre("✅ Status reply enabled.");
  } else if (val === "off") {
    config.AUTO_STATUS_REPLY = "false";
    saveConfig();
    repondre("❌ Status reply disabled.");
  } else {
    repondre("⚠️ Usage: .statusreply on/off");
  }
});
