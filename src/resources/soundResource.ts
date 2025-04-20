import type { LanguagePronunciationMap, SoundResource } from '@/typings'

export const SOUND_URL_PREFIX = REACT_APP_DEPLOY_ENV === 'pages' ? '/qwerty-learner/sounds/' : './sounds/'
export const KEY_SOUND_URL_PREFIX = SOUND_URL_PREFIX + 'key-sound/'

// will add more sound resource and add config ui in the future
const videoList = import.meta.glob(['../../public/sounds/key-sound/*.(wav|mp3)'], {
  eager: false,
})

/**
 * the Mechanical keyboard sound from https://github.com/tplai/kbsim
 */
export const keySoundResources: SoundResource[] = Object.keys(videoList)
  .map((k) => {
    const name = k.replace(/(.*\/)*([^.]+).*/gi, '$2')
    const suffix = k.substring(k.lastIndexOf('.'))
    return {
      key: name,
      name: `${name}`,
      filename: `${name}${suffix}`,
    }
  })
  .sort((a, b) => {
    // default key should be the first one
    if (a.key === 'Default') {
      return -1
    }
    if (b.key === 'Default') {
      return 1
    }

    return a.key.localeCompare(b.key)
  })

export const wrongSoundResources: SoundResource[] = [{ key: '1', name: '声音1', filename: 'beep.wav' }]

export const correctSoundResources: SoundResource[] = [{ key: '1', name: '声音1', filename: 'correct.wav' }]

export const LANG_PRON_MAP: LanguagePronunciationMap = {
  en: {
    defaultPronIndex: 0,
    pronunciation: [
      {
        name: 'american',
        pron: 'us',
      },
      {
        name: 'english',
        pron: 'uk',
      },
    ],
  },
  code: {
    defaultPronIndex: 0,
    pronunciation: [
      {
        name: 'american',
        pron: 'us',
      },
      {
        name: 'english',
        pron: 'uk',
      },
    ],
  },
  de: {
    defaultPronIndex: 0,
    pronunciation: [
      {
        name: 'german',
        pron: 'de',
      },
    ],
  },
  romaji: {
    defaultPronIndex: 0,
    pronunciation: [
      {
        name: 'romaji',
        pron: 'romaji',
      },
    ],
  },
  hapin: {
    defaultPronIndex: 0,
    pronunciation: [
      {
        name: 'hapin',
        pron: 'hapin',
      },
    ],
  },
  zh: {
    defaultPronIndex: 0,
    pronunciation: [
      {
        name: 'mandarin',
        pron: 'zh',
      },
    ],
  },
  ja: {
    defaultPronIndex: 0,
    pronunciation: [
      {
        name: 'japanese',
        pron: 'ja',
      },
    ],
  },
  kk: {
    defaultPronIndex: 0,
    pronunciation: [
      {
        name: 'kazakh',
        pron: 'kk',
      },
    ],
  },
  id: {
    defaultPronIndex: 0,
    pronunciation: [
      {
        name: 'indonesia',
        pron: 'id',
      },
    ],
  },
}
