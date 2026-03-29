"use client"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader, Send } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EmptyBoxState from './EmptyBoxState'
import GroupSizeUi from './GroupSizeUi'
import BudgetUi from './BudgetUi'
import SelectDays from './SelectDays'
import InterestsUi from './InterestsUi'
import FinalUi from './FinalUi'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useUserDetail } from '@/app/Provider'
import { v4 as uuidv4 } from 'uuid';
type Message = {
    role: string,
    content: string,
    ui?: string,
    data?: any,
}
export type TripInfo={
    budget: string,
    destination: string,
    duration: string,
    group_size: string,
    origin: string,
    hotels: any,
    itinerary: any,
}
function ChatBox() {

    const [messages, setMessages] = useState<Message[]>([])
    const [userInput, setUserInput] = useState<string>('')
    const [loading, setLoading] = useState(false)
    const [isFinal, setIsFinal] = useState(false)
    const [tripDetail, setTripDetail]=useState<TripInfo>()
    const SaveTripDetail=useMutation(api.tripDetail.CreateTripDetail)
    const {userDetail,setUserDetail}=useUserDetail()
    const onsend = async (overrideInput?: string, overrideIsFinal?: boolean) => {
        const input = overrideInput ?? userInput;
        if (!input?.trim()) return;

        const finalFlag = overrideIsFinal ?? isFinal;

        setLoading(true);
        setUserInput('');

        const newMsg: Message = {
            role: 'user',
            content: input
        };

        setMessages((prev: Message[]) => [...prev, newMsg]);

        const result = await axios.post('/api/aimodel', {
            messages: [...messages, newMsg],
            isFinal: finalFlag
        });

        console.log("TRIP", result.data);

        if (finalFlag) {
            setTripDetail(result?.data?.trip_plan)
            const tripId = uuidv4();
            await SaveTripDetail({
                tripDetail: result?.data?.trip_plan,
                tripId:tripId,
                uid:userDetail?._id 

            })
        } else {
            setMessages((prev: Message[]) => [...prev, {
                role: 'assistant',
                content: result?.data?.resp,
                ui: result?.data?.ui
            }]);
        }

        setLoading(false);
    };

    const RenderGenerativeUi = (msg: Message) => {
        const ui = msg.ui ?? '';

        if (ui === "budget") {
            return <BudgetUi onSelectOption={(v: string) => onsend(v)} />
        } else if (ui === "groupSize") {
            return <GroupSizeUi onSelectOption={(v: string) => onsend(v)} />
        } else if (ui === "tripDuration") {
            return <SelectDays onSelectedOption={(v: string) => onsend(v)} />
        } else if (ui === "interests") {
            return <InterestsUi onSelectOption={(v: string) => onsend(v)} />
        } else if (ui === "final") {
            return <FinalUi viewTrip={() => console.log()} 
            disable={!tripDetail}/>
        }
        return null;
    };

    useEffect(() => {
        const lastMsg = messages[messages.length - 1];
        if (lastMsg?.ui === 'final') {
            setIsFinal(true);
            onsend('Ok, Great', true);
        }
    }, [messages]);

    return (
        <div className='h-[85vh] flex flex-col'>
            {messages?.length === 0 &&
                <EmptyBoxState onSelectOption={(v: string) => onsend(v)} />
            }
            <section className='flex-1 overflow-y-auto p-4'>
                {messages.map((msg: Message, index) => (
                    msg.role === "user" ? (
                        <div key={index} className='flex justify-end mt-2'>
                            <div className='max-w-lg bg-primary text-white px-4 py-2 rounded-lg'>
                                {msg.content}
                            </div>
                        </div>
                    ) : (
                        <div key={index} className='flex justify-start mt-2'>
                            <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                                {msg.content}
                                {RenderGenerativeUi(msg)}
                            </div>
                        </div>
                    )
                ))}
                {loading && (
                    <div className='flex justify-start mt-2'>
                        <div className='max-w-lg bg-gray-100 text-black px-4 py-2 rounded-lg'>
                            <Loader className='animate-spin' />
                        </div>
                    </div>
                )}
            </section>
            <section>
                <div className='border rounded-2xl p-4 relative'>
                    <Textarea
                        placeholder='Start Typing Here...'
                        className='w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none'
                        onChange={(event) => setUserInput(event.target.value)}
                        value={userInput}
                    />
                    <Button size={'icon'} className='absolute bottom-6 right-6' onClick={() => onsend()}>
                        <Send className='h-4 w-4' />
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default ChatBox