import React, { Dispatch, SetStateAction } from "react";

var sdk = require("microsoft-cognitiveservices-speech-sdk");

//function that removes point from the end of the string
const removePoint = (text: string) => {
    return text.substring(0, text.length - 1);
};

const useSpeechToText = (): [() => Promise<void>, string, Dispatch<SetStateAction<string>>] => {
    const [recognizedText, setRecognizedText] = React.useState("");
    const goodAnswers = ["yes", "no", "yeah", "nope"];
    const speechToText = React.useCallback(async () => {
        var key = process.env.REACT_APP_STT_API_KEY as string;
        var region = process.env.REACT_APP_STT_REGION as string;
        var language = process.env.REACT_APP_STT_LANGUAGE_EN as string;
        const speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
        speechConfig.speechRecognitionLanguage = language;
        let audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
        let speechRecognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

        speechRecognizer.recognizeOnceAsync((result: any) => {
            var text = removePoint(result.text.toLowerCase());
            switch (result.reason) {
                case sdk.ResultReason.RecognizedSpeech:
                    console.log(`RECOGNIZED: Text=${result.text}`);
                    console.log(goodAnswers.includes(text), text);
                    if (goodAnswers.includes(text)) {
                        setRecognizedText(text);
                    } else {
                        setRecognizedText("different");
                    }
                    break;
                case sdk.ResultReason.NoMatch:
                    console.log("NOMATCH: Speech could not be recognized.");
                    break;
                case sdk.ResultReason.Canceled:
                    const cancellation = sdk.CancellationDetails.fromResult(result);
                    console.log(`CANCELED: Reason=${cancellation.reason}`);

                    if (cancellation.reason == sdk.CancellationReason.Error) {
                        console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                        console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                        console.log(
                            "CANCELED: Did you set the speech resource key and region values?"
                        );
                    }
                    break;
            }

            speechRecognizer.close();
        });
    }, []);

    return [speechToText, recognizedText, setRecognizedText];
};

export default useSpeechToText;
