
import React, { useState, useEffect, useRef } from 'react';

interface LoginModalProps {
    onClose: () => void;
    onLoginSuccess: (token: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('admin');
    const [password, setPassword] = useState('admin');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const usernameInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        usernameInputRef.current?.focus();
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [onClose]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                onLoginSuccess(data.token);
            } else {
                setError(data.message || 'Invalid username or password.');
            }
        } catch (err) {
            setError('Failed to connect to the server. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const inputStyles = "mt-1 block w-full px-3 py-2 bg-white text-gray-900 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-ocean-blue focus:border-ocean-blue sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white";

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fadeIn" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="login-title"
        >
            <div 
                ref={modalRef} 
                className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 sm:p-8 max-w-sm w-full transform transition-all" 
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <h3 id="login-title" className="text-2xl font-bold text-ocean-blue-dark dark:text-ocean-blue-light">
                        Admin Login
                    </h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors" aria-label="Close login form">
                        <i className="fas fa-times text-2xl" aria-hidden="true"></i>
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                        <input
                            ref={usernameInputRef}
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={inputStyles}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputStyles}
                            required
                        />
                    </div>
                     {error && (
                        <p className="text-red-500 text-sm text-center" role="alert">
                            {error}
                        </p>
                    )}
                    <div>
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-lg font-bold text-white bg-ocean-blue hover:bg-ocean-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ocean-blue disabled:bg-gray-400">
                            {isLoading ? 'Logging in...' : 'Login'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginModal;
