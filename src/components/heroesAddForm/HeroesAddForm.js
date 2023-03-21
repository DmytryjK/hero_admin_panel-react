import nextId from "react-id-generator";
import { useFormik } from 'formik';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addHero, heroesFiltered } from '../../actions';

import './heroesAddForm.scss';

// DONE Задача для этого компонента:
// DONE Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// DONE Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// DONE Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// DONE Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const { filters, activeFilterName, heroes } = useSelector(state => state);
    const dispatch = useDispatch();
    const id = nextId("added-hero");

    useEffect(() => {
        dispatch(heroesFiltered([...heroes], activeFilterName));
    }, [heroes])

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

    const validate = (values) => {
        const errors = {};
        if (!values.name) {
            errors.name = 'Поле должно быть заполнено';
        } 

        if (!values.description) {
            errors.description = 'Поле должно быть заполнено';
        } 

        if (!values.element || values.element === "Я владею элементом...") {
            errors.element = 'Поле должно быть заполнено';
        } 
        
        return errors;
    };

   
    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            element: 'Я владею элементом...',
        },
        validate,
        onSubmit: (values, {resetForm}) => {
            dispatch(addHero(values, id));
            console.log({...values, id});
            fetch('http://localhost:3001/heroes/', {
                method: 'POST',
                body: JSON.stringify({id, ...values}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            resetForm();
        }
    });
    
    return (     
        <form 
            onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    className="form-control" 
                    id="name"
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                    placeholder="Как меня зовут?"
                />
                {formik.touched.name && formik.errors.name ? <div className="form-error">{formik.errors.name}</div> : null}
            </div>

            <div className="mb-3">
                <label htmlFor="description" className="form-label fs-4">Описание</label>
                <textarea
                    className="form-control" 
                    id="text"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                />
                {formik.touched.description && formik.errors.description ? <div className="form-error">{formik.errors.description}</div> : null}
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.element}
                >
                    <option disabled={true}>Я владею элементом...</option>
                    {renderedOptions()}
                </select>
                {formik.touched.element && formik.errors.element ? <div className="form-error">{formik.errors.element}</div> : null}
            </div>

            <button className="btn btn-primary" type="submit">Создать</button>
        </form>
    )
}


export default HeroesAddForm;