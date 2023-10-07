import dotenv from 'dotenv';
import { Command } from "commander";

const program = new Command();

program
    .option ('-d', "variable de debug", false)
    .option ('-p <PORT>', "variable de puerto", 8080)
    .option ('--mode <mode>', "Modo de trabajo", "dev")
    .option ('-u <user>', 'Usuario que va a utilizar la app', 'No se declaro ningun usuario')
    .option ('--persist <mode>', 'persistencia de datos', 'mongo')
    program.parse();


const enviroment = program.opts().mode;
console.log("Modo Opt: ", program.opts().mode);
console.log("Persistencia Opt: ", program.opts().persist);


dotenv.config({
    path: enviroment === "production" ? "./src/config/.env.production" : "./src/config/.env.development"
});



export default {
    port: process.env.PORT,
    mongoUrl: process.env.URL_MONGO,
    persistence : program.opts().persist,
}