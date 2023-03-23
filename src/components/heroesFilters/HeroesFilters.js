import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {filtersData} from '../../dataForHosting/filtersData';

import { filtersFetched, filtersAddActiveClass, heroesFiltered, activeFiltersName } from '../../actions';
// Задача для этого компонента:
// DONE Фильтры должны формироваться на основании загруженных данных
// DONE Фильтры должны отображать только нужных героев при выборе
// DONE Активный фильтр имеет класс active
// DONE Изменять json-файл для удобства МОЖНО!
// DONE Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const {filters, heroes} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        // async function fetchData() {
        //   try {
        //     const data = await request("http://localhost:3001/filters");
        //     dispatch(filtersFetched(data));
        //   } catch (error) {
        //     console.error(error);
        //   }
        // }
      
        // fetchData();
        dispatch(filtersFetched(filtersData));

    }, []);

    const filterHeroes = (id, dataFilter) => {
        dispatch(filtersAddActiveClass(filters, id));
        dispatch(activeFiltersName(dataFilter));
        dispatch(heroesFiltered([...heroes], dataFilter));
    }

    const createFilters = (filters) => {
        return filters.map((filter) => {
            const {id, name, uniqClass, isActive, dataFilter} = filter;

            const renderedClass = `${uniqClass} ${isActive ? 'active' : ''}`;

            return (
                <button 
                    key={id} 
                    className={`btn ${renderedClass}`}
                    onClick={() => filterHeroes(id, dataFilter)}
                    >{name}
                </button>
            )
        })
    }
    
    const renderedFilters = createFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {renderedFilters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;