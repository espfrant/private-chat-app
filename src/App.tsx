// types.ts
interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: Date;
}

import React, { useState } from 'react';
import { nanoid } from 'nanoid';

const ChatApp = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [username, setUsername] = useState('Usuario');
    const [showClearModal, setShowClearModal] = useState(false);

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        const message: Message = {
            id: nanoid(),
            text: newMessage,
            sender: username,
            timestamp: new Date()
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    const clearHistory = () => {
        setMessages([]);
        setShowClearModal(false);
    };

    return (
        <div className="min-h-screen bg-dracula-background">
            {/* Header con título y logo */}
            <div className="bg-dracula-current shadow-lg">
                <div className="max-w-4xl mx-auto p-6">
                    <div className="flex items-center justify-center gap-4">
                        {/* Logo */}
                        <div className="w-12 h-12 bg-dracula-purple rounded-lg flex items-center justify-center shadow-lg">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-8 h-8 text-dracula-background"
                                fill="currentColor"
                            >
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l7 4.5-7 4.5z" />
                            </svg>
                        </div>
                        {/* Título y subtítulo */}
                        <div className="text-center">
                            <h1 className="text-4xl font-bold text-dracula-purple mb-1
                                         hover:text-dracula-pink transition-colors duration-300">
                                PrivateChat
                            </h1>
                            <p className="text-dracula-comment italic text-sm">
                                Mensajería privada y segura
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Container principal */}
            <div className="max-w-4xl mx-auto p-4">
                <div className="bg-dracula-current rounded-lg shadow-xl overflow-hidden">
                    {/* User Settings y Clear History */}
                    <div className="border-b border-dracula-comment/30 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-10 w-10 rounded-full bg-dracula-purple
                                              flex items-center justify-center text-dracula-background
                                              font-bold shadow-md">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <input
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Tu nombre"
                                    className="bg-dracula-background text-dracula-foreground
                                             px-4 py-2 rounded-md focus:outline-none
                                             focus:ring-2 focus:ring-dracula-purple
                                             placeholder-dracula-comment shadow-inner"
                                />
                            </div>
                            {/* Clear History Button */}
                            {messages.length > 0 && (
                                <button
                                    onClick={() => setShowClearModal(true)}
                                    className="px-4 py-2 bg-dracula-red/20 text-dracula-red
                                             rounded-md hover:bg-dracula-red/30 transition-colors
                                             duration-300 flex items-center gap-2"
                                >
                                    <svg
                                        viewBox="0 0 24 24"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                    >
                                        <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/>
                                    </svg>
                                    Limpiar historial
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="h-[500px] overflow-y-auto p-4 bg-dracula-background/50">
                        {messages.map((message) => (
                            <div
                                key={message.id}
                                className={`mb-4 ${
                                    message.sender === username
                                        ? 'ml-auto'
                                        : 'mr-auto'
                                }`}
                            >
                                <div
                                    className={`max-w-sm p-3 rounded-lg shadow-md ${
                                        message.sender === username
                                            ? 'bg-dracula-purple text-dracula-background ml-auto'
                                            : 'bg-dracula-current text-dracula-foreground'
                                    }`}
                                >
                                    <p className="font-semibold text-sm">
                                        {message.sender}
                                    </p>
                                    <p className="mt-1">{message.text}</p>
                                    <p className="text-xs mt-1 opacity-75">
                                        {message.timestamp.toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Message Input */}
                    <form onSubmit={sendMessage} className="p-4 bg-dracula-current">
                        <div className="flex gap-2">
                            <input
                                type="text"
                                value={newMessage}
                                onChange={(e) => setNewMessage(e.target.value)}
                                placeholder="Escribe un mensaje..."
                                className="flex-1 px-4 py-2 rounded-md
                                         bg-dracula-background text-dracula-foreground
                                         placeholder-dracula-comment shadow-inner
                                         focus:outline-none focus:ring-2 focus:ring-dracula-purple"
                            />
                            <button
                                type="submit"
                                className="px-6 py-2 bg-dracula-purple text-dracula-background
                                         rounded-md font-semibold hover:bg-dracula-pink
                                         transition-colors duration-300 shadow-md
                                         focus:outline-none focus:ring-2 focus:ring-dracula-comment"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            {/* Clear History Modal */}
            {showClearModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                    <div className="bg-dracula-current p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold text-dracula-foreground mb-4">
                            ¿Limpiar historial?
                        </h3>
                        <p className="text-dracula-comment mb-6">
                            Esta acción eliminará todos los mensajes del chat. Esta acción no se puede deshacer.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowClearModal(false)}
                                className="px-4 py-2 text-dracula-comment hover:text-dracula-foreground"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={clearHistory}
                                className="px-4 py-2 bg-dracula-red text-dracula-background rounded-md
                                         hover:bg-dracula-red/90 transition-colors duration-300"
                            >
                                Limpiar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatApp;