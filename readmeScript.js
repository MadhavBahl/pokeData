const csvParser = require('csv-parser');
const fs = require('fs');

const filepath = './pokedex.csv';

let cellCount = 0, rowCount = 0;
let readmeContent = `# PokeData

Learning to write CSV file with NodeJS by making our own Pokemon Dataset.

> How I made my pokemon dataset in 2 minutes ᕦ( ͡° ͜ʖ ͡°)ᕤ 

> But lol, writing a script to populate the README file took me so much time, Arghh this MD syntax

![cover](./cover.png)

## Pokemon List

| `;

fs.createReadStream(filepath)
    .on('error', () => {
        // handle error
    })

    .pipe(csvParser())
    .on('data', (row) => {
        // use row data
        try {
            cellCount++;
            let name = row.name;
            let sprite = JSON.parse(row.sprites).animated;      
            if (name) {
                let rowAppend = `[<img src="${sprite}" width="100px;" alt="${name}"/><br /><sub><b>${name}</b></sub>](#) | `;
                readmeContent += rowAppend;
            }
            if (cellCount % 7 === 0) {
                rowCount === 0 
                    ? readmeContent += `\n| :---: | :---: | :---: | :---: | :---: | :---: | :---: |\n|`
                    : readmeContent += `\n|`;
                rowCount++;
            }
        } catch (error) {
            
        }
    })

    .on('end', () => {
        // handle end of CSV
        console.log('README CONTENT - ', readmeContent);
        fs.writeFile('README.md', readmeContent, function (err) {
            if (err) throw err;
            console.log('Saved!');
        });
    })


