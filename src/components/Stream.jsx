import React, {useRef, useState, useEffect} from 'react';
import './Stream.css';
import {PlayCircleFill, StopCircleFill} from "react-bootstrap-icons";

// import Waveform from './Waveform';

function Stream() {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const volume = .5
    const ctx = useRef(null);
    const volumeGainRef = useRef(null);
    const waveformGainRef = useRef(null);
    const sourceNode = useRef(null);
    const analyser = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            if (!ctx.current) {
                ctx.current = new (window.AudioContext || window.webkitAudioContext)();
                volumeGainRef.current = ctx.current.createGain();
                waveformGainRef.current = ctx.current.createGain();
                waveformGainRef.current.gain.value = 3;
            }

            audioRef.current.crossOrigin = "anonymous";

            if (!sourceNode.current) {
                sourceNode.current = ctx.current.createMediaElementSource(audioRef.current);
                sourceNode.current.connect(volumeGainRef.current).connect(ctx.current.destination);
            }

            if (!analyser.current) {
                analyser.current = ctx.current.createAnalyser();
                analyser.current.fftSize = 256;
                analyser.current.smoothingTimeConstant = 0.9;
            }

            if (sourceNode.current && waveformGainRef.current && analyser.current) {
                sourceNode.current.connect(volumeGainRef.current).connect(waveformGainRef.current).connect(analyser.current);
            }
        }
    }, [isPlaying]);

    useEffect(() => {
        if (volumeGainRef.current) {
            volumeGainRef.current.gain.value = volume; // Update gain node volume
        }
    }, [volume]);

    const handleTogglePlayState = async () => {
        if (audioRef.current) {
            if (ctx.current.state === 'suspended') {
                await ctx.current.resume();
            }

            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.load();
                audioRef.current.play().catch(error => {
                    console.error("Error playing audio:", error);
                });
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className={'d-flex justify-content-center'}>
            <div id="stream-box">
                <div className={'d-flex'}>
                    <audio id="stream" ref={audioRef} src="https://audio.wbar.org:8443/stream"
                           title="WBAR RADIO"></audio>
                    <div className={'text-white'}>LIVE</div>

                    <div className={"h3 text-white ps-3"} onClick={handleTogglePlayState}>
                        {isPlaying ? <StopCircleFill/> : < PlayCircleFill className={"b3 text-white"}/>}
                    </div>
                    {/*<Waveform*/}
                    {/*    isPlaying={isPlaying}*/}
                    {/*    analyser={analyser.current}*/}
                    {/*    color="#ff5722"*/}
                    {/*/>*/}

                </div>
            </div>
        </div>
    );
}

export default Stream;