import { CreateCore } from "./core.js";

const core = CreateCore();

const book = async() => {
    bestAuthorChoice = await core.bestAuthorChoice();
    console.log(bestAuthorChoice)
}
book()