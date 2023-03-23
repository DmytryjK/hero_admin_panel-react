import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {heroesData} from '../../dataForHosting/heroeData';

import { heroesFetching, heroesFetched, heroesFetchingError, heroesDelete, heroesFiltered } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента: 
// DONE При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// DONE Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const {heroes, heroesLoadingStatus, renderedHeroes, activeFilterName, isHeroDeleted} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        // request("http://localhost:3001/heroes")
        //     .then(data => dispatch(heroesFetched(data)))
        //     .catch(() => dispatch(heroesFetchingError()))
        dispatch(heroesFetched(heroesData()));

        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        dispatch(heroesFiltered([...heroes], activeFilterName));
    }, [isHeroDeleted]);

    const removeItem = (id) => {
        dispatch(heroesDelete(heroes, id));    
        // fetch(`http://localhost:3001/heroes/${id}`, {
        //     method: 'DELETE'
        // });
    }

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} removeItem={removeItem} itemId={id} {...props}/>
        })
    }

    return (
        <ul>
            {renderHeroesList(renderedHeroes)}
        </ul>
    )
}

export default HeroesList;