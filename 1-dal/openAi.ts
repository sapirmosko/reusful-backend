import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    organization: "",
    apiKey: '',
});

export const openai = new OpenAIApi(configuration);
