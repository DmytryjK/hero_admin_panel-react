const   initialState = {
        heroes: [],
        isHeroDeleted: false,
        heroesLoadingStatus: 'idle',
        filters: [],
        activeFilterName: 'all',
        renderedHeroes: [],
        isStartAnimation: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
                renderedHeroes: action.payload
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_FILTERED':
            return {
                ...state,
                isFilterActive: true,
                isHeroDeleted: false,
                renderedHeroes: action.payload
            }
        case 'HEROES_DELETE':
            return {
                ...state,
                isStartAnimation: false,
                isHeroDeleted: true,
                heroes: action.payload,
                renderedHeroes: action.payload
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filters: action.payload
            }
        case 'FILTERS_ADD_ACTIVECLASS':
            return {
                ...state,
                filters: action.payload
            }
        case 'ACTIVE_FILTER_NAME':
            return {
                ...state,
                activeFilterName: action.payload
            }
        case 'ADD_HERO_FROM_FORM':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                renderedHeroes: [...state.heroes, action.payload]
            }
        case 'END_ANIMATION':
            return {
                ...state,
                isStartAnimation: false
            }
        default: return state
    }
}

export default reducer;