const java = require('java');
const path = require('path');

// Přidání classpath k Skript JAR
java.classpath.push(path.join(__dirname, '../utils/Skript/build/libs/Skript-2.8.5.jar'));
java.classpath.push(path.join(__dirname, '../utils/spigot-api-1.20.4-R0.1-SNAPSHOT.jar'));

const SkriptSyntaxChecker = java.import('ch.njol.skript.SkriptSyntaxChecker');

const checkSyntax = (code) => {
  return new Promise((resolve, reject) => {
    SkriptSyntaxChecker.checkSyntax(code, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

module.exports = { checkSyntax };
