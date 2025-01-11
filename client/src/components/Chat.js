import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';
import { useDraggable } from '@dnd-kit/core';

function Chat() {
    const [isVisible, setIsVisible] = useState(false);
    const [deltaOffset, setDeltaOffset] = useState({ x: 0, y: 0 });
    const [finalOffset, setFinalOffset] = useState({ x: 0, y: 0 });
    const [isMinimized, setIsMinimized] = useState(false);
    const [size, setSize] = useState({ width: 400, height: 600 });
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: 'chat',
    });

    const wResizeRef = useRef(null);
    const sResizeRef = useRef(null);
    const initialSize = useRef(size);

    useEffect(() => {
        if (transform) {
            setIsMinimized(false);
            const newDeltaOffset = { x: transform.x, y: transform.y };
            setDeltaOffset(newDeltaOffset);
        }
    }, [transform, isMinimized]);

    useEffect(() => {
        const handleResize = () => {
            const chatContainer = document.getElementById('chat-container');
            if (chatContainer) {
                const { width, height } = chatContainer.getBoundingClientRect();
                const maxX = window.innerWidth - width;
                const maxY = window.innerHeight - height;

                setFinalOffset(prev => ({
                    x: Math.min(Math.max(prev.x, 0), maxX),
                    y: Math.min(Math.max(prev.y, 0), maxY),
                }));

                if (window.innerWidth <= 768) {
                    setSize({ width: window.innerWidth * 0.9, height: window.innerHeight * 0.6 });
                } else {
                    setSize({ width: 400, height: 600 });
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
        setDeltaOffset({ x: 0, y: 0 });
    };

    const unMinimizeChat = () => {
        setIsMinimized(false);
        setFinalOffset({ x: finalOffset.x, y: 0 });
    };

    const minimizeChat = () => {
        setIsMinimized(true);
        const chatHeight = document.getElementById('chat-container')?.offsetHeight;
        const offsetHeight = chatHeight - document.getElementById('chat-header')?.offsetHeight;
        setFinalOffset({ x: finalOffset.x, y: offsetHeight });
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
        setSize(prevSize => ({ ...prevSize, width: newWidth }));
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

        setSize(prevSize => ({ ...prevSize, height: newHeight }));
        setFinalOffset(prevOffset => ({ ...prevOffset, y: newY }));
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

    if (!isVisible) return (
        <button
            id={'show-chat-btn'}
            className={'btn btn-dark btn-lg'}
            onClick={() => setIsVisible(!isVisible)}
        >
            <i className={'bi bi-chat-fill'}></i> <span>Show chat</span>
        </button>
    );

    return (
        <div
            id={"chat-container"}
            ref={setNodeRef}
            style={{ ...style, width: size.width, height: size.height }}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
        >
            <div id={'chat-header'}>
                <i
                    id={'close-chat'}
                    className={'bi bi-x h2'}
                    onClick={() => {
                        setFinalOffset({ x: 0, y: 0 });
                        setIsMinimized(false);
                        setIsVisible(false);
                        setSize({ width: 400, height: 600 });
                    }}
                    title={'Close chat'}
                ></i>
                <i
                    id={'chat-h-grip'}
                    className="h2 bi bi-grip-horizontal"
                    {...listeners}
                    {...attributes}
                ></i>
                <i id={"chat-to-margin"} className="h5 bi bi-chevron-down"
                   onClick={isMinimized ? unMinimizeChat : minimizeChat}
                   style={isMinimized ? { transform: 'rotate(180deg)' } : {}}
                   title={isMinimized ? 'Maximize' : 'Minimize'}
                ></i>
            </div>
            <div id="chat-content" className=" w-100 h-100 d-flex flex-column justify-content-center">
                <div
                    ref={wResizeRef}
                    onMouseDown={handleMouseDownX}
                    onTouchStart={handleMouseDownX}
                    className="d-flex flex-column justify-content-center"
                    style={{
                        width: '10px',
                        height: '100%',
                        cursor: 'ew-resize',
                        position: 'absolute',
                        left: '0',
                        top: '0'
                    }}
                >
                    <i className="bi bi-three-dots-vertical h5"></i>
                </div>
                <iframe
                    title='chat'
                    src='https://minnit.chat/c/WBAR?embed&&nickname='
                    style={{
                        border: 'none', width: '100%', height: '100%', borderRadius: '8px 8px 0 0',
                    }}
                ></iframe>
            </div>

            <div
                ref={sResizeRef}
                onMouseDown={handleMouseDownY}
                onTouchStart={handleMouseDownY}
                className="d-flex justify-content-center"
                style={{
                    width: '100%',
                    height: '10px',
                    cursor: 'ns-resize',
                    position: 'absolute',
                    bottom: '0',
                    left: '0'
                }}
            >
                <i className="bi bi-three-dots h5"></i>
            </div>
            <a href='https://minnit.chat/c/WBAR' target={'_blank'} rel={'noreferrer'} style={{ marginTop: '10px' }}>
                Open in new tab
            </a>
        </div>
    );
}

export default Chat;