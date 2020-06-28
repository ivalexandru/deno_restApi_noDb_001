import {Application } from "https://deno.land/x/oak/mod.ts";
const port = 5000;
const app = new Application();


//no curly braces o router because it was default exported
import router from "./routes.ts";


app.use(router.routes());
//this allows all methods (put, delete...)
app.use(router.allowedMethods());



console.log(`serv u on port ${port}`)
await app.listen({port: port});



