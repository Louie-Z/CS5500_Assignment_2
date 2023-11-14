import React, { useState, useEffect, useCallback, useRef } from "react";

import { MessageContainer } from "../Server/Globals";

import ChatClient from "./ChatClient";
import './Styles.css';


interface ChatComponentProps {
    userName: string;
}


const chatClient = new ChatClient();


function ChatComponent({userName}: ChatComponentProps) {
    const [messages, setMessages] = useState<MessageContainer[]>([]);
    const [mostRecentId, setMostRecentId] = useState<number>(-1);
    const [message, setMessage] = useState<string>("please enter a message");
    const bottomRef = useRef(null);


    let localUser = userName;
    let localMessage = message;
    const updateDisplay = useCallback(() => {
        let updateNeeded = false;
        const newLastId = chatClient.messages[0].id;
        if (newLastId !== mostRecentId) {
            updateNeeded = true;
        }
        if (chatClient.previousMessagesFetched) {
            updateNeeded = true;
            chatClient.previousMessagesFetched = false;
        }
        if (!updateNeeded) {
            return;
        }

        let newMessages = [...chatClient.messages];

        setMessages(newMessages);
        setMostRecentId(newLastId);
    }, [mostRecentId, messages]);

    useEffect(() => {
        chatClient.setCallback(updateDisplay);
    }, [updateDisplay]);


    function makeFormatedMessages() {
        let formatedMessages = [...messages].reverse().map((message, index, array) => {
            if (index === array.length - 1) { // if this is the last message
                return <textarea key={index} readOnly value={message.id + "| " + message.user + ": " + message.message} ref={bottomRef} />
            } else {
                return <textarea key={index} readOnly value={message.id + "| " + message.user + ": " + message.message} />
            }
        });
        return formatedMessages;
    }

    return (
        <div>
            <h1>Chat with others</h1>
            <button onClick={() => chatClient.getNextMessages()}>Get History Messages</button>
            <div className="scrollable-text-view">
                {makeFormatedMessages()}
            </div>
            <input
                type="text"
                id="message"
                placeholder={message}
                onKeyUp={(event) => {
                    localMessage = event.currentTarget.value;
                    setMessage(event.currentTarget.value);
                    if (event.key === "Enter") {
                        chatClient.sendMessage(localUser, localMessage);
                        // clear the message
                        event.currentTarget.value = "";
                        setMessage("");
                    }
                }}
            />

            <button onClick={() => chatClient.sendMessage(localMessage, localUser)}>Send</button>
        </div>
    );
}

export default ChatComponent;
