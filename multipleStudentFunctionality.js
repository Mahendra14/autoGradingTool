const readline = require("readline");
const fs = require('fs');
const path = require('path');

async function promptFilePath(exerciseIndex, folderName, numberOfExercises) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    if (exerciseIndex <= numberOfExercises) {
        const exerciseName = `exercise_${exerciseIndex}`;
        const cppFileName = `${exerciseName}.cpp`;

        rl.question(`Enter the path to the file for ${cppFileName}: `, (filePath) => {
            if (fs.existsSync(filePath)) {
                console.log(`File "${filePath}" exists.`);
                const fileName = path.basename(filePath);

                const newFilePath = path.join(folderName, fileName);

                if (!fs.existsSync(folderName)) {
                    fs.mkdirSync(folderName);
                }

                fs.copyFileSync(filePath, newFilePath);
                console.log(`File copied to ${newFilePath}`);
            } else {
                console.log("File not found.");
            }

            rl.close();
            promptFilePath(exerciseIndex + 1, folderName, numberOfExercises);
        });
    } else {
        rl.close();
    }
}

async function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    let numberOfExercises = 5;
    rl.question("Are you a teacher (y/n)?", async (isTeacher) => {
        if (isTeacher === "y") {
            rl.question("Please Enter Number of Exercises: ", (num) => {
                numberOfExercises = parseInt(num, 10);
                rl.close();
            });
        } else {
            let folderName = "";
            // rl.question("Enter your first name: ", (first) => {
            //     rl.question("Enter your last name: ", (last) => {
            //         rl.question("Enter your ID: ", (idGiven) => {
            //             firstName = first;
            //             lastName = last;
            //             studentID = idGiven;
            //         })
            //     })
            // });

            const firstName = await new Promise((resolve) => {
                rl.question("Enter your first name: ", (input) => {
                    resolve(input);
                });
            });

            const lastName = await new Promise((resolve) => {
                rl.question("Enter your last name: ", (input) => {
                    resolve(input);
                });
            });

            const studentID = await new Promise((resolve) => {
                rl.question("Enter your ID: ", (input) => {
                    resolve(input);
                });
            });

             // Create a folder with the student's name and ID
             folderName = `${firstName}_${lastName}_${studentID}`;
             //   const folder = new Folder(folderName);
             try {
                 fs.mkdirSync(folderName);
                 console.log(`Folder "${folderName}" created successfully.`);
             } catch (error) {
                 console.error(`An error occurred: ${error.message}`);
             }
             

             const numberOfExercises = 5; // Set the number of exercises
            // Call the recursive function to prompt for file paths
             await promptFilePath(1, folderName, numberOfExercises);
        }
    });
}

main();