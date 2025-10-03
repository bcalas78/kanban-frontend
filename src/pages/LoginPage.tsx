import { useState } from 'react';
import api from '../api/api';
import { useAppDispatch } from '../app/hooks';
import { setToken } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const validateFields = (): boolean => {
        const newErrors: string[] = [];
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
            const res = await api.post('/auth/login', { 
                email, 
                password 
            });

            dispatch(setToken(res.data.token));
            localStorage.setItem("token", res.data.token);

            navigate('/');
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error(err.message);
            } else {
                console.error(err);
            }
            alert("Erreur lors de la connexion");
        }
    };
    
    return (
        <div>
            <h1>Connexion</h1>
            
            {errors.length > 0 && (
                <ul style={{ color: "red" }}>
                    {errors.map((err, i) => (
                        <li key={i}>{err}</li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit}>
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
                <button type="submit">Se connecter</button>
            </form>
        </div>     
    );
}
