import type { AmountType } from '../DonatingCard'
import { DonatingCard } from '../DonatingCard'
import { StickerButton } from '../DonatingCard/components/StickerButton'
import { useChapterNumber, useDayFromFirstWordRecord, useSumWrongCount, useWordNumber } from './hooks/useWordStats'
import { DONATE_DATE } from '@/constants'
import { reportDonateCard } from '@/utils'
import noop from '@/utils/noop'
import { Dialog, Transition } from '@headlessui/react'
import dayjs from 'dayjs'
import type React from 'react'
import { Fragment, useLayoutEffect, useMemo, useState } from 'react'
import IconParty from '~icons/logos/partytown-icon'

export const DonateCard = () => {
  const [show, setShow] = useState(false)
  const [amount, setAmount] = useState<AmountType | undefined>(undefined)

  const chapterNumber = useChapterNumber()
  const wordNumber = useWordNumber()
  const sumWrongCount = useSumWrongCount()
  const dayFromFirstWord = useDayFromFirstWordRecord()
  const dayFromQwerty = useMemo(() => {
    const now = dayjs()
    const past = dayjs('2021-01-21')
    return now.diff(past, 'day')
  }, [])

  const HighlightedText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
    return <span className={`font-bold  ${className ? className : 'text-indigo-500'}`}>{children}</span>
  }

  const onClickHasDonated = () => {
    reportDonateCard({
      type: 'donate',
      chapterNumber,
      wordNumber,
      sumWrongCount,
      dayFromFirstWord,
      dayFromQwerty,
      amount: amount ?? 0,
    })

    setShow(false)
    const now = dayjs()
    window.localStorage.setItem(DONATE_DATE, now.format())
  }

  const onClickRemindMeLater = () => {
    reportDonateCard({
      type: 'dismiss',
      chapterNumber,
      wordNumber,
      sumWrongCount,
      dayFromFirstWord,
      dayFromQwerty,
      amount: amount ?? 0,
    })

    setShow(false)
  }

  const onAmountChange = (amount: AmountType) => {
    setAmount(amount)
  }

  useLayoutEffect(() => {
    if (chapterNumber && chapterNumber !== 0 && chapterNumber % 10 === 0) {
      const storedDate = window.localStorage.getItem(DONATE_DATE)
      const date = dayjs(storedDate)
      const now = dayjs()
      const diff = now.diff(date, 'day')
      if (!storedDate || diff > 60) {
        setShow(true)
      }
    }
  }, [chapterNumber])

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => {
          noop()
        }}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative my-8 w-[37rem] transform select-text overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all">
                <div className="flex w-full flex-col justify-center gap-4 bg-white px-2 pb-4 pt-5 dark:bg-gray-800 dark:text-gray-300">
                  <h1 className="gradient-text w-full pt-3 text-center text-[2.4rem] font-bold">{`${chapterNumber} Chapters Achievement !`}</h1>
                  <div className="flex w-full flex-col gap-4 px-4">
                    <p className="mx-auto px-4 indent-4">
                      You have just completed<HighlightedText> {chapterNumber} </HighlightedText>exercises for chapters，Qwerty Learner been with you before
                      <HighlightedText> {dayFromFirstWord} </HighlightedText> days, and together they completed the
                      <HighlightedText> {wordNumber} </HighlightedText>
                      The word practice helps you to correct the <HighlightedText> {sumWrongCount} </HighlightedText>Let's all cheer for your progress!
                      <IconParty className="ml-2 inline-block" fontSize={16} />
                      <IconParty className="inline-block" fontSize={16} />
                      <IconParty className="inline-block" fontSize={16} />
                      <br />
                    </p>
                    <p className="mx-auto px-4 indent-4">
                      Qwerty Learner Already insisted <span className="font-medium ">Open source, no ads, no commercialization</span> scheduled service
                      <HighlightedText className="text-indigo-500"> {dayFromQwerty} </HighlightedText> 天，
                      Our goal is to provide an efficient, convenient, and distraction-free learning environment for all learners. We invite you to consider making a donation that will go directly to sustaining the day-to-day operations of Qwerty 
						as well as its future growth, so that Qwerty can grow with you.
                    </p>
                    <p className="mx-auto px-4 indent-4 ">
                      As a thank you for your generosity, we will give you 5 customized Qwerty stickers for a single donation of 50 rmb or more!
                      <span className="text-xs">（Mainland China only）</span>，I hope you can share your joy with your friends
                    </p>
                    <div className="flex items-center justify-center">
                      <StickerButton />
                    </div>
                  </div>

                  <DonatingCard className="mt-2" onAmountChange={onAmountChange} />
                  <div className="flex w-full justify-between  px-14 pb-3 pt-0">
                    <button
                      type="button"
                      className={`my-btn-primary ${!amount && 'invisible'} w-36 bg-amber-500 font-medium transition-all`}
                      onClick={onClickHasDonated}
                    >
                      I have donated
                    </button>
                    <button type="button" className="my-btn-primary w-36 font-medium" onClick={onClickRemindMeLater}>
                      Remind me later
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
