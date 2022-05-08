import React from "react";

var sdk = require("microsoft-cognitiveservices-speech-sdk");

const useTextToSpeech = (): [(text: string) => Promise<void>, boolean] => {
    const [isSpeaking, setIsSpeaking] = React.useState(false);

    const speakTextAsync = React.useCallback(async (text: string) => {
        var key = process.env.REACT_APP_TTS_API_KEY as string;
        var region = process.env.REACT_APP_TTS_REGION as string;
        var voice = process.env.REACT_APP_TTS_VOICE_EN as string;
        var speechConfig = sdk.SpeechConfig.fromSubscription(key, region);
        var player = new sdk.SpeakerAudioDestination();
        player.onAudioStart = function (e: any) {};
        player.onAudioEnd = function (e: any) {
            setIsSpeaking(false);
        };
        var audioConfig = sdk.AudioConfig.fromSpeakerOutput(player);
        speechConfig.speechSynthesisVoiceName = voice;
        const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        setIsSpeaking(true);
        await synthesizer.speakTextAsync(
            text,
            function (result: any) {
                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                } else {
                    console.error(
                        "Speech synthesis canceled, " +
                            result.errorDetails +
                            "\nDid you set the speech resource key and region values?"
                    );
                }
                synthesizer.close();
            },
            function (err: any) {
                console.trace("err - " + err);
                synthesizer.close();
            }
        );
    }, []);

    return [speakTextAsync, isSpeaking];
};

export default useTextToSpeech;
