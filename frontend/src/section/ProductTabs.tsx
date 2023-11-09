"use client";

import Wysiwyg from '@/components/Wysiwyg';
import { useState } from 'react';

export interface ITab {
    id: number;
    title: string; 
    content: string;
}

export default function ProductTabs({tabs}: {tabs : ITab[]}) {
    const [activeTab, setActiveTab] = useState(0);

    if(!tabs?.length) {
        return null;
    }

  return (
    <div>
        <div className="md:flex relative z-10 " role="tablist">
            {
            tabs?.map((tab, index) => {
                return (
                <button 
                    onClick={() => setActiveTab(index)}
                    key={tab.id}
                    className={`py-4 px-8 tracking-[1px] font-semibold -mb-[1px] text-[13px] ${activeTab == index ? "bg-white" : "bg-primary text-white hover:bg-white hover:text-black"}
                    text-gray-darker uppercase border border-b-0 first:md:mr-1.5`}>
                    {tab.title}
                </button>
                )
            })
            }
        </div>

        <div className="border p-8 relative z-0">
        <Wysiwyg 
            content={tabs[activeTab].content} 
            className="w-full max-w-full prose-th:w-[10%] prose-th:pl-3 prose-td:pl-3 prose-td:border prose-tr:border" />
        </div>
    </div>
  )
}
