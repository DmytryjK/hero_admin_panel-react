import { Formik } from 'formik';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addHero } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {

    const { filters, heroesAddForm } = useSelector(state => state);
    const dispatch = useDispatch();

  
    const onSubmit = (data) => {
        console.log(data);
    }

    useEffect(() => {
        // console.log(heroesAddForm)
    }, [heroesAddForm]);

    const updateHeroProperties = (e) => {
        const value = e.target.value;
        dispatch(addHero(value, heroesAddForm));
    }

    const renderedOptions = () => {
        if (filters) {
            return filters.map(filter => {
                const {name, dataFilter, id} = filter;
                if (dataFilter !== 'all') {
                    return (
                        <option key={id} value={dataFilter}>{name}</option>
                    )
                }
            })
        }
    }
    
    return (      
        <form 
            className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={(e) => updateHeroProperties(e)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    {renderedOptions()}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}





{/* <form 
            className="border p-4 shadow-lg rounded" 
            onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label 
                    className="form-label fs-4"
                    htmlFor="name">Имя нового героя</label>
                <Controller
                    render={({ field }) => <input 
                    className="form-control" 
                    placeholder="Как меня зовут?"
                    onBlur={field.onBlur}
                    {...field} />}            
                    name="name"
                    defaultValue=""
                    control={control}
                    rules={{ required: "safdsafasdf" }}
                />
            </div>
            <div className="mb-3">
                <label 
                    className="form-label fs-4"
                    htmlFor="text">Описание</label>
                <Controller
                    render={({ field }) => <textarea className="form-control"
                    placeholder="Что я умею?" 
                    style={{"height": '130px'}}
                    {...field} />}            
                    name="text"
                    defaultValue=""
                    control={control}
                    rules={{ required: "Field must be fill" }}
                />
            </div>
            <div className="mb-3">
                <label 
                    htmlFor="element"
                    className="form-label">Выбрать элемент героя</label>
                <select
                    className="form-select"
                    {...register("element", 
                        { 
                            required: "Field must be fill"
                        }
                    )}>
                        <option value="">Я владею элементом...</option>
                        {renderedOptions()}
                </select>
                <div style={{height: 40}}>
                    {errors?.element && <p>{errors?.element?.message || "Error"}</p>}
                </div>
            </div>
            
            <input className="btn btn-primary" type="submit" />
        </form> */}

export default HeroesAddForm;