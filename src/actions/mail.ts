import type { SWRConfiguration } from 'swr';
import type { IMail, IMailLabel } from 'src/types/mail';

import useSWR from 'swr';
import { useMemo } from 'react';
import { keyBy } from 'es-toolkit';



// ----------------------------------------------------------------------

import { _mock } from 'src/_mock';

// ----------------------------------------------------------------------

const _labels: IMailLabel[] = [
  { id: 'all', type: 'system', name: 'all', unreadCount: 0, color: '#0000FF' },
  { id: 'inbox', type: 'system', name: 'inbox', unreadCount: 1, color: '#0000FF' },
  { id: 'sent', type: 'system', name: 'sent', unreadCount: 0, color: '#0000FF' },
  { id: 'drafts', type: 'system', name: 'drafts', unreadCount: 0, color: '#0000FF' },
  { id: 'trash', type: 'system', name: 'trash', unreadCount: 0, color: '#0000FF' },
  { id: 'spam', type: 'system', name: 'spam', unreadCount: 1, color: '#0000FF' },
  { id: 'starred', type: 'system', name: 'starred', unreadCount: 1, color: '#0000FF' },
  { id: 'important', type: 'system', name: 'important', unreadCount: 1, color: '#0000FF' },
  { id: 'social', type: 'custom', name: 'social', unreadCount: 0, color: '#00A76F' },
  { id: 'promotions', type: 'custom', name: 'promotions', unreadCount: 2, color: '#FFAB00' },
  { id: 'forums', type: 'custom', name: 'forums', unreadCount: 1, color: '#00B8D9' },
];

const _mails: IMail[] = [...Array(9)].map((_, index) => ({
  id: _mock.id(index),
  labelIds: ['inbox'],
  folder: 'inbox',
  isImportant: _mock.boolean(index),
  isStarred: _mock.boolean(index),
  isUnread: _mock.boolean(index),
  subject: _mock.sentence(index),
  message: _mock.description(index),
  createdAt: _mock.time(index),
  attachments:
    index > 5
      ? []
      : [
          {
            id: _mock.id(index),
            name: 'attachment.jpg',
            size: 1000,
            type: 'image',
            path: _mock.image.cover(index),
            preview: _mock.image.cover(index),
            createdAt: _mock.time(index),
            modifiedAt: _mock.time(index),
          },
        ],
  from: {
    name: _mock.fullName(index),
    email: _mock.email(index),
    avatarUrl: _mock.image.avatar(index),
  },
  to: [
    {
      name: _mock.fullName(index + 1),
      email: _mock.email(index + 1),
      avatarUrl: _mock.image.avatar(index + 1),
    },
  ],
}));

// ----------------------------------------------------------------------

export function useGetLabels() {
  const memoizedValue = useMemo(
    () => ({
      labels: _labels,
      labelsLoading: false,
      labelsError: null,
      labelsValidating: false,
      labelsEmpty: !_labels.length,
    }),
    []
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMails(labelId: string) {
  const memoizedValue = useMemo(() => {
    const byId = keyBy(_mails, (option) => option.id);
    const allIds = Object.keys(byId);

    return {
      mails: { byId, allIds },
      mailsLoading: false,
      mailsError: null,
      mailsValidating: false,
      mailsEmpty: !allIds.length,
    };
  }, []);

  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetMail(mailId: string) {
  const memoizedValue = useMemo(
    () => ({
      mail: _mails.find((mail) => mail.id === mailId),
      mailLoading: false,
      mailError: null,
      mailValidating: false,
      mailEmpty: !_mails.find((mail) => mail.id === mailId),
    }),
    [mailId]
  );

  return memoizedValue;
}
