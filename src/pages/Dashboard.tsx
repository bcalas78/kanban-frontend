import { useAppSelector } from "../app/hooks"

export default function Dashboard() {
    const { isAuthenticated, token } = useAppSelector((state) => state.auth);

    return (
        <div>
            <h1>Tableau de bord</h1>
            {isAuthenticated ? (
                <p>Connecté avec token: {token}</p> 
            ) : (
                <p>Non connecté</p>
            )}
        </div> 
    );
}