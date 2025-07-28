import type { SWRConfiguration } from 'swr';
import type { IChatMessage, IChatParticipant, IChatConversation } from 'src/types/chat';

import { useMemo } from 'react';
import { keyBy } from 'es-toolkit';
import useSWR, { mutate } from 'swr';

import axios from 'src/lib/axios';
import { _mock, _userList } from 'src/_mock';

// ----------------------------------------------------------------------

const swrOptions: SWRConfiguration = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

const _participants: IChatParticipant[] = _userList.map((user, index) => ({
  id: user.id,
  name: user.name,
  role: user.role,
  email: user.email,
  address: user.address,
  avatarUrl: user.avatarUrl,
  phoneNumber: user.phoneNumber,
  lastActivity: _mock.time(index),
  status:
    (index % 2 && 'online') || (index % 3 && 'busy') || (index % 4 && 'away') || 'offline',
}));

const _messages: IChatMessage[] = Array.from({ length: 40 }).map((_, index) => ({
  id: _mock.id(index),
  body: _mock.sentence(index),
  senderId: _userList[index % 8].id,
  contentType: index % 5 ? 'text' : 'image',
  createdAt: _mock.time(index),
  attachments:
    index % 5
      ? []
      : [
          {
            name: 'attachment.jpg',
            size: 1000,
            type: 'image',
            path: _mock.image.cover(index),
            preview: _mock.image.cover(index),
            createdAt: _mock.time(index),
            modifiedAt: _mock.time(index),
          },
        ],
}));

const _conversations: IChatConversation[] = [
  {
    id: _mock.id(1),
    type: 'one_to_one',
    unreadCount: 0,
    messages: _messages.slice(0, 5),
    participants: [_participants[0], _participants[1]],
  },
  {
    id: _mock.id(2),
    type: 'group',
    unreadCount: 3,
    messages: _messages.slice(5, 15),
    participants: [_participants[2], _participants[3], _participants[4], _participants[5]],
  },
  {
    id: _mock.id(3),
    type: 'one_to_one',
    unreadCount: 0,
    messages: _messages.slice(15, 20),
    participants: [_participants[6], _participants[7]],
  },
  {
    id: _mock.id(4),
    type: 'group',
    unreadCount: 0,
    messages: _messages.slice(20, 30),
    participants: [_participants[8], _participants[9], _participants[10], _participants[11]],
  },
  {
    id: _mock.id(5),
    type: 'one_to_one',
    unreadCount: 5,
    messages: _messages.slice(30, 40),
    participants: [_participants[12], _participants[13]],
  },
];

// ----------------------------------------------------------------------

type ContactsData = {
  contacts: IChatParticipant[];
};

export function useGetContacts() {
  const { data, isLoading, error, isValidating } = useSWR<ContactsData>(
    'contacts',
    null,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      contacts: data?.contacts || _participants,
      contactsLoading: isLoading,
      contactsError: error,
      contactsValidating: isValidating,
      contactsEmpty: !isLoading && !isValidating && !data?.contacts.length,
    }),
    [data?.contacts, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

type ConversationsData = {
  conversations: IChatConversation[];
};

export function useGetConversations() {
  const { data, isLoading, error, isValidating } = useSWR<ConversationsData>(
    'conversations',
    null,
    swrOptions
  );

  const memoizedValue = useMemo(() => {
    const conversations = data?.conversations ?? _conversations;
    const byId = conversations.length ? keyBy(conversations, (option) => option.id) : {};
    const allIds = Object.keys(byId);

    return {
      conversations: { byId, allIds },
      conversationsLoading: isLoading,
      conversationsError: error,
      conversationsValidating: isValidating,
      conversationsEmpty: !isLoading && !isValidating && !allIds.length,
    };
  }, [data?.conversations, error, isLoading, isValidating]);

  return memoizedValue;
}

// ----------------------------------------------------------------------

type ConversationData = {
  conversation: IChatConversation;
};

export function useGetConversation(conversationId: string) {
  const { data, isLoading, error, isValidating } = useSWR<ConversationData>(
    `conversation-${conversationId}`,
    null,
    swrOptions
  );

  const memoizedValue = useMemo(
    () => ({
      conversation: data?.conversation ?? _conversations.find((c) => c.id === conversationId),
      conversationLoading: isLoading,
      conversationError: error,
      conversationValidating: isValidating,
      conversationEmpty: !isLoading && !isValidating && !data?.conversation,
    }),
    [data?.conversation, error, isLoading, isValidating, conversationId]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export async function sendMessage(conversationId: string, messageData: IChatMessage) {
  /**
   * Work in local
   */
  mutate(
    `conversation-${conversationId}`,
    (currentData: ConversationData | undefined) => {
      const currentConversation: IChatConversation | undefined = currentData?.conversation;

      if (!currentConversation) return currentData;

      const conversation = {
        ...currentConversation,
        messages: [...currentConversation.messages, messageData],
      };

      return { ...currentData, conversation };
    },
    false
  );

  mutate(
    'conversations',
    (currentData: ConversationsData | undefined) => {
      const currentConversations: IChatConversation[] = currentData?.conversations ?? _conversations;

      const conversations: IChatConversation[] = currentConversations.map(
        (conversation: IChatConversation) =>
          conversation.id === conversationId
            ? { ...conversation, messages: [...conversation.messages, messageData] }
            : conversation
      );

      return { ...currentData, conversations };
    },
    false
  );
}

// ----------------------------------------------------------------------

export async function createConversation(conversationData: IChatConversation) {
  /**
   * Work in local
   */
  const res = await axios.post('/api/chat', { conversationData });

  mutate(
    'conversations',
    (currentData: ConversationsData | undefined) => {
      const currentConversations: IChatConversation[] = currentData?.conversations ?? _conversations;

      const conversations: IChatConversation[] = [...currentConversations, conversationData];

      return { ...currentData, conversations };
    },
    false
  );

  return res.data;
}

// ----------------------------------------------------------------------

export async function clickConversation(conversationId: string) {
  /**
   * Work in local
   */
  mutate(
    'conversations',
    (currentData: ConversationsData | undefined) => {
      const currentConversations: IChatConversation[] = currentData?.conversations ?? _conversations;

      const conversations = currentConversations.map((conversation: IChatConversation) =>
        conversation.id === conversationId ? { ...conversation, unreadCount: 0 } : conversation
      );

      return { ...currentData, conversations };
    },
    false
  );
}
