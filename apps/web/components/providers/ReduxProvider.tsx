'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { store, AppStore } from '@/store/store';

export default function ReduxProvider({ children }: { children: React.ReactNode }) {
    // Use a ref to ensure the store is only initialized once per request/client instance
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = store;
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}
