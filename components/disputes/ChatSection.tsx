/**
 * Chat Section Component
 * Messaging interface for dispute communication
 */

'use client';

import React, { useState } from 'react';
import { Icons } from '@/components/common/Icons';
import type { DisputeMessage } from '@/types';

interface ChatSectionProps {
  messages: DisputeMessage[];
  initiatorName: string;
  respondentName: string;
}

export default function ChatSection({ messages, initiatorName, respondentName }: ChatSectionProps) {
  const [newMessage, setNewMessage] = useState('');

  // Mock messages for display
  const displayMessages: DisputeMessage[] = messages.length > 0 ? messages : [
    {
      id: '1',
      userId: 'user1',
      userName: initiatorName,
      message: 'The content does not meet the specifications outlined in our contract. Please review the attached brief.',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      isAdmin: false,
    },
    {
      id: '2',
      userId: 'user2',
      userName: respondentName,
      message: 'I followed the brief exactly as provided. All requirements were met according to my understanding.',
      timestamp: new Date(Date.now() - 1800000).toISOString(),
      isAdmin: false,
    },
  ];

  const handleSend = () => {
    if (newMessage.trim()) {
      // Handle send logic here
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
      {/* Messages */}
      <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
        {displayMessages.length === 0 ? (
          <div className="py-12 text-center">
            <Icons.message className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <p className="text-sm text-gray-500">No messages yet</p>
          </div>
        ) : (
          displayMessages.map((msg, i) => {
            const isInitiator = msg.userName === initiatorName;
            const isAdmin = msg.isAdmin;

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isAdmin ? '' : isInitiator ? '' : 'justify-end'}`}
              >
                {!isAdmin && isInitiator && (
                  <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {msg.userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
                <div className={`flex-1 ${isAdmin ? '' : 'max-w-[70%]'} flex flex-col ${isInitiator ? 'items-start' : 'items-end'}`}>
                  <div
                    className={`rounded-2xl p-4 ${
                      isAdmin
                        ? 'bg-blue-50 border border-blue-200 rounded-tl-none w-full'
                        : isInitiator
                        ? 'bg-gray-50 rounded-tl-none'
                        : 'bg-violet-500 text-white rounded-tr-none'
                    }`}
                  >
                    {isAdmin && (
                      <p className="text-xs font-semibold text-blue-600 mb-1">Admin Response</p>
                    )}
                    <p className={`text-sm ${isAdmin ? 'text-gray-700' : isInitiator ? 'text-gray-700' : 'text-white'}`}>
                      {msg.message}
                    </p>
                  </div>
                  <p className={`text-xs text-gray-400 mt-1 ${isInitiator ? 'ml-2' : 'mr-2'}`}>
                    {new Date(msg.timestamp).toLocaleTimeString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {!isAdmin && !isInitiator && (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold shrink-0">
                    {msg.userName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message as Admin..."
            className="flex-1 h-11 px-4 rounded-xl bg-gray-50 border border-gray-200 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="h-11 px-5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 text-sm font-medium transition-colors"
          >
            <Icons.send className="w-4 h-4" />
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
