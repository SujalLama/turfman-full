import Wysiwyg from '@/components/Wysiwyg';
import React from 'react'

export default function ProductTabs({tabs}: {tabs : {name: string; value: string; content: string;}[]}) {
  return (
    <div>
        <div className="md:flex relative z-10 " role="tablist">
            {
            tabs.map(tab => {
                return (
                <button 
                    key={tab.name}
                    className="py-4 px-8 tracking-[1px] font-semibold -mb-[1px] text-[13px] bg-white
                    text-gray-darker uppercase hover:bg-primary hover:text-white border border-b-0 first:md:mr-1.5">
                    {tab.name}
                </button>
                )
            })
            }
        </div>

        <div className="border p-8 relative z-0">
            {
            tabs.map(tab => {
                return <Wysiwyg content={tab.content} className="w-full max-w-full prose-th:w-[10%] prose-th:pl-3 prose-td:pl-3 prose-td:border prose-tr:border" />
            })
            }
        </div>
    </div>
  )
}
