import { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import './filme-info.css'

import api from '../../services/api';

function Filme(){
    const { id } = useParams();
    const navigation = useNavigate();

    const [filme, setFilme] = useState({});
    const [loading, setLoading] = useState(true);

    function salvarFilme() {
        const minhaLista = localStorage.getItem('@primeflix');

        let filmesSalvos = JSON.parse(minhaLista) || [];

        const hasFilme = filmesSalvos.some((filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme){
            toast.warn("Este filme já está na sua lista!")
            return
        }

        filmesSalvos.push(filme);
        localStorage.setItem("@primeflix", JSON.stringify(filmesSalvos));
        toast.success('Filme salvo com sucesso.')
    }

    useEffect(() => {
        async function loadFilme(){
            await api.get(`/movie/${id}`, {
                params: {
                    api_key: '4b524c5083ad2e55c77098f327c92745',
                    language: "pt-BR"
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false)
            })
            .catch(() => {
                console.log("Filme não encontrado!");
                navigation("/", { replace: true });
                return;
            })
        }

        loadFilme();

        return () => {
            console.log("Componente foi desmontado")
        }
    }, [navigation, id])

    if(loading){
        return(
            <div className='filme-info'>
                <h1>Carregando detalhes...</h1>
            </div>
        )
    }

    return(
       <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className='area-buttons'>
                <button onClick={salvarFilme}>Salvar</button>
                <button>
                    <a href={`https://youtube.com/results?search_query=${filme.title}+trailer`} target='blank' rel='external'>
                        Trailer
                    </a>
                </button>
            </div>
       </div>
    )
}

export default Filme;