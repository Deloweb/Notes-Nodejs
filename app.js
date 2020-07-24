const fs = require("fs");
const yargs = require("yargs");

function loadDatas(path) {
  let data = fs.readFileSync(path);
  return JSON.parse(data.toString());
}

yargs
  .command({
    command: "add",
    describe: "Ajoute une note (avec titre et contenu)",
    builder: {
      title: {
        discribe: "Titre de la note",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Contenue de la note",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      let notesList = loadDatas("./datas/notes.json");
      let newNote = {
        title: argv.title,
        body: argv.body,
      };
      let test = notesList.map((note) => {
        if (argv.title === note.title) {
          let isAlreadyHere = 1;
          return isAlreadyHere
        }
    });
      if (test.includes(1)) {
        console.log("Cette note a déjà été ajoutée");
      } else
        notesList.push(newNote),
          fs.writeFile(
            "./datas/notes.json",
            JSON.stringify(notesList),
            (err) => {
              if (err) throw err;
              console.log("Note ajoutée");
            }
          );
    },
  })
  .command({
    command: "list",
    describe: "Affiche les titres de toutes les notes",
    handler: (argv) => {
      let notes = loadDatas("./datas/notes.json");
      console.log(notes);
    },
  })
  .command({
      command: "remove",
      describe: "Supprime une note de la liste",
      builder:{
          title: {
              describe: "Titre de la note à supprimer",
              demandOption: true,
              type: "string"
          }
      },
      handler: (argv) => {
          let table = [...loadDatas('./datas/notes.json').filter(argv.title)];
      }
  })
  .argv;
