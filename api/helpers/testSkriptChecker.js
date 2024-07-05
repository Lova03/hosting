const { checkSyntax } = require('./skriptChecker');

const skriptCode = `
  command /test:
    trigger:
      send "Hello, world!" to player
`;

checkSyntax(skriptCode)
  .then((result) => {
    if (result) {
      console.log('Syntax is correct.');
    } else {
      console.log('Syntax is incorrect.');
    }
  })
  .catch((err) => {
    console.error('Error:', err);
  });
