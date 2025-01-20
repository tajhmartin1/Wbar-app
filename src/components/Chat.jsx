import React, {useEffect, useState, useRef, use} from 'react';
// import './Chat.css';
import {useDraggable} from '@dnd-kit/core';
import "bootstrap-icons/font/bootstrap-icons.css";

function Chat() {
    const [isVisible, setIsVisible] = useState(false);
    const [deltaOffset, setDeltaOffset] = useState({x: 0, y: 0});
    const [finalOffset, setFinalOffset] = useState({x: 0, y: 0});
    const [isMinimized, setIsMinimized] = useState(false);
    const [size, setSize] = useState({width: 400, height: 600});
    const [loading, setLoading] = useState(true);

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: 'chat',
    });
    const wResizeRef = useRef(null);
    const sResizeRef = useRef(null);
    const initialSize = useRef(size);

    useEffect(() => {
        if (transform) {
            setIsMinimized(false);
            const newDeltaOffset = {x: transform.x, y: transform.y};
            setDeltaOffset(newDeltaOffset);
        }
    }, [transform, isMinimized]);

    useEffect(() => {
        const handleResize = () => {
            const chatContainer = document.getElementById('chat-container');
            if (chatContainer) {
                const {width, height} = chatContainer.getBoundingClientRect();
                const maxX = window.innerWidth - width;
                const maxY = window.innerHeight - height;

                setFinalOffset(prev => ({
                    x: Math.min(Math.max(prev.x, 0), maxX), y: Math.min(Math.max(prev.y, 0), maxY),
                }));

                if (window.innerWidth <= 768) {
                    setSize({width: window.innerWidth * 0.9, height: window.innerHeight * 0.6});
                } else {
                    setSize({width: 400, height: 600});
                }
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDragEnd = () => {
        setFinalOffset(prev => ({
            x: prev.x + deltaOffset.x, y: prev.y + deltaOffset.y,
        }));
        setDeltaOffset({x: 0, y: 0});
    };

    const unMinimizeChat = () => {
        setIsMinimized(false);
        setFinalOffset({x: finalOffset.x, y: 0});
    };

    const minimizeChat = () => {
        setIsMinimized(true);
        const chatHeight = document.getElementById('chat-container')?.offsetHeight;
        const offsetHeight = chatHeight - document.getElementById('chat-header')?.offsetHeight;
        setFinalOffset({x: finalOffset.x, y: offsetHeight});
    };

    const handleMouseDownX = (e) => {
        e.preventDefault();
        initialSize.current = size;
        window.addEventListener('mousemove', handleMouseMoveX);
        window.addEventListener('mouseup', handleMouseUpX);
        window.addEventListener('touchmove', handleMouseMoveX);
        window.addEventListener('touchend', handleMouseUpX);
    };

    const handleMouseMoveX = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const deltaX = (wResizeRef.current.getBoundingClientRect().right - clientX) * 0.5;
        const newWidth = Math.max(350, initialSize.current.width + deltaX);
        setSize(prevSize => ({...prevSize, width: newWidth}));
    };

    const handleMouseUpX = () => {
        window.removeEventListener('mousemove', handleMouseMoveX);
        window.removeEventListener('mouseup', handleMouseUpX);
        window.removeEventListener('touchmove', handleMouseMoveX);
        window.removeEventListener('touchend', handleMouseUpX);
    };

    const handleMouseDownY = (e) => {
        e.preventDefault();
        initialSize.current = size;
        window.addEventListener('mousemove', handleMouseMoveY);
        window.addEventListener('mouseup', handleMouseUpY);
        window.addEventListener('touchmove', handleMouseMoveY);
        window.addEventListener('touchend', handleMouseUpY);
    };

    const handleMouseMoveY = (e) => {
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const deltaY = (sResizeRef.current.getBoundingClientRect().bottom - clientY) * 0.5;
        const newHeight = Math.max(300, initialSize.current.height - deltaY);
        const heightChange = initialSize.current.height - newHeight;

        const newY = finalOffset.y - heightChange;

        setSize(prevSize => ({...prevSize, height: newHeight}));
        setFinalOffset(prevOffset => ({...prevOffset, y: newY}));
    };

    const handleMouseUpY = () => {
        window.removeEventListener('mousemove', handleMouseMoveY);
        window.removeEventListener('mouseup', handleMouseUpY);
        window.removeEventListener('touchmove', handleMouseMoveY);
        window.removeEventListener('touchend', handleMouseUpY);
    };

    let style = {
        transform: `translate3d(${deltaOffset.x + finalOffset.x}px, ${finalOffset.y + deltaOffset.y}px, 0)`,
        touchAction: 'none',
    };

    if (!isVisible) return (<button
        id={'show-chat-btn'}
        className={'border font-black uppercase text-2xl flex gap-2 items-center rounded fixed bottom-10 right-10 p-2 bg-gray-800 z-[3000]'}
        onClick={() => {
            setLoading(true);
            setIsVisible(!isVisible)
        }}
    >
        Chat
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor"
             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path
                d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
        </svg>
    </button>);

    return (<div
        id={"chat-container"}
        className={'bg-white flex-col pt-4 pb-16 px-3 rounded fixed right-3 bottom-3 z-[3000]'}
        ref={setNodeRef}
        style={{...style, width: size.width, height: size.height}}
        onMouseUp={handleDragEnd}
        onTouchEnd={handleDragEnd}
    >
        <div id={'chat-header'} className={'flex justify-between items-center pb-1'}>
            <div title={"close chat"}>
                <svg className="h-5 w-5 text-red-600"
                     onClick={() => {
                         setFinalOffset({x: 0, y: 0});
                         setIsMinimized(false);
                         setIsVisible(false);
                         setLoading(false);
                         setSize({width: 400, height: 600});
                     }}
                     width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                     stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
            </div>
            <div>
                <svg
                    {...listeners}
                    {...attributes}
                    className="h-6 w-6 text-gray-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                    stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="5" cy="9" r="1"/>
                    <circle cx="5" cy="15" r="1"/>
                    <circle cx="12" cy="9" r="1"/>
                    <circle cx="12" cy="15" r="1"/>
                    <circle cx="19" cy="9" r="1"/>
                    <circle cx="19" cy="15" r="1"/>
                </svg>
            </div>
            <div title={isMinimized ? "minimize" : "maximize"}>
                <svg
                    onClick={isMinimized ? unMinimizeChat : minimizeChat}
                    style={isMinimized ? {transform: 'rotate(180deg)'} : {}}
                    className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                </svg>
            </div>
        </div>
        <div id="chat-content" className="w-full h-full flex flex-col justify-center px-4 pt-2">
            <div
                ref={wResizeRef}
                onMouseDown={handleMouseDownX}
                onTouchStart={handleMouseDownX}
                className="flex flex-col justify-center chat-resize h-full w-3 absolute left-0 top-0 cursor-ew-resize"
            >
                <svg className="h-6 w-6 text-gray-700" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2"
                     stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z"/>
                    <circle cx="12" cy="12" r="1"/>
                    <circle cx="12" cy="19" r="1"/>
                    <circle cx="12" cy="5" r="1"/>
                </svg>
            </div>
            {loading && (
                <div className={'w-full h-full'}>
                    <svg className=" relative left-1/2 top-1/2 animate-spin -ml-1 mr-3 h-10 w-10 text-purple-500"
                         xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>)
            }
            <iframe
                title='chat'
                src='https://minnit.chat/c/WBAR?embed&&nickname='
                className={'w-full h-full rounded'}
                onLoad={() => setLoading(false)}
            >
            </iframe>
        </div>

        <div
            ref={sResizeRef}
            onMouseDown={handleMouseDownY}
            onTouchStart={handleMouseDownY}
            className="w-full flex justify-center h-3 chat-resize absolute bottom-0 cursor-ns-resize"
        >
            <svg className="h-6 w-6 text-gray-700 absolute bottom-0" width="24" height="24" viewBox="0 0 24 24"
                 strokeWidth="2"
                 stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z"/>
                <circle cx="5" cy="12" r="1"/>
                <circle cx="12" cy="12" r="1"/>
                <circle cx="19" cy="12" r="1"/>
            </svg>
        </div>
    </div>);
}

export default Chat;