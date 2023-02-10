import { openai } from "../1-dal/openAi";

export async function dallE(query:string){
    const response = await openai.createImage({
        prompt: query,
        n: 1,
        size: "256x256",
    });
    const image_url = response.data.data[0].url;
    return image_url
}
