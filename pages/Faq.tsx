import React, { useState } from 'react';
import { faqs } from '../data/faqs';
import { FaqItem as FaqType } from '../types';


const FaqItemComponent: React.FC<{ item: FaqType }> = ({ item }) => {
    const [isOpen, setIsOpen] = useState(false);
    const panelId = `faq-panel-${item.id}`;
    const buttonId = `faq-button-${item.id}`;

    return (
        <div className="border-b border-gray-200 dark:border-gray-700 py-6">
            <dt>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full flex justify-between items-start text-left text-gray-600 dark:text-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ocean-blue rounded p-1"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    id={buttonId}
                >
                    <span className="text-lg font-medium text-ocean-blue-dark dark:text-ocean-blue-light">{item.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                        <i className={`fas fa-chevron-down transform transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`} aria-hidden="true"></i>
                    </span>
                </button>
            </dt>
            {isOpen && (
                <dd id={panelId} role="region" aria-labelledby={buttonId} className="mt-4 pr-12">
                    <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">{item.answer}</p>
                </dd>
            )}
        </div>
    );
}

const Faq: React.FC = () => {
    return (
        <div className="bg-white dark:bg-gray-900 py-16 sm:py-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base font-semibold text-ocean-blue tracking-wide uppercase">Need Help?</h2>
                    <p className="mt-2 text-3xl font-extrabold text-ocean-blue-dark dark:text-ocean-blue-light tracking-tight sm:text-4xl">
                        Frequently Asked Questions
                    </p>
                    <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                        Find answers to common questions about our tours and services.
                    </p>
                </div>
                <div className="mt-12">
                    <dl className="space-y-4">
                        {faqs.map((faq) => (
                           <FaqItemComponent key={faq.id} item={faq} />
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
};

export default Faq;
