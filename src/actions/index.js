export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesDelete = (heroes, id) => {
    return {
        type: 'HEROES_DELETE',
        payload: (
            heroes.filter(hero => hero.id !== id)
        )
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersAddActiveClass = (filters, id) => {
    return {
        type: 'FILTERS_ADD_ACTIVECLASS',
        payload: filters.map(filter => {
            
            if (filter.id === id) {
                return { ...filter, isActive: true }
            } else {
                return { ...filter, isActive: false };
            }
            
        })
    }
}

export const heroesFiltered = (copiedHeroes, dataFilter) => {
    return {
        type: 'HEROES_FILTERED',
        payload: copiedHeroes.filter(hero => {
            if (dataFilter === 'all') {
                return {...hero}
            } else if (hero.element === dataFilter) {
                return 1;
            }
        })
    }
}

export const activeFiltersName = (dataFilter) => {
    return {
        type: 'ACTIVE_FILTER_NAME',
        payload: dataFilter
    }
}

export const addHero = (values, id) => {
    // console.log(value)
    return {
        type: 'ADD_HERO_FROM_FORM',
        payload: {id, ...values}
    }
}






