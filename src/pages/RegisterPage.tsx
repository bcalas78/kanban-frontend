import { useState } from 'react';
import api from '../api/api';
import { useAppDispatch } from '../app/hooks';
import { setToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const validateFields = (): boolean => {
        const newErrors: string[] = [];
        if(!username || username.length < 3) {
            newErrors.push("Le nom d'utilisateur doit faire au moins 3 caractères");
        }
        if(!email.includes("@")) {
            newErrors.push("L'email n'est pas valide");
        }
        if(!password || password.length < 8) {
            newErrors.push("Le mot de passe doit faire au moins 8 caractères");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

         if(!validateFields()) {
            return;
        }

        try {
            const res = await api.post('/auth/register', { 
                username, 
                email, 
                password 
            });

            dispatch(setToken(res.data.token));
            localStorage.setItem('token', res.data.token);

            navigate('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error(err);
            }
            alert("Erreur lors de l'inscription");
        }
    };
    
    return (
        <div>
            <h1>Inscription</h1>

            {errors.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errors.map((err, i) => (
                        <li key={i}>{err}</li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                />
                <input 
                    type="email"
                    placeholder='Email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input 
                    type="password"
                    placeholder='Mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                />
                <button type="submit">S'inscrire</button>
            </form>
        </div>
            
    );
}