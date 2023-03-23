import { useTransition, animated } from '@react-spring/web'
import { useState } from 'react';

const HeroesListItem = ({itemId, removeItem, name, description, element}) => {
    const [isAnimate, setIsAnimate] = useState(true);

    const transitions  = useTransition(isAnimate, {
        from: { opacity: 0, y: 50 },
        enter: { opacity: 1, y: 0 },
        leave: { opacity: 0, y: 20 },
        config: {
            duration: 300,
        },
        onRest: () => {
            if (!isAnimate) {
              removeItem(itemId);
              setIsAnimate(true);
            }
        }
    })

    const handleRemove = () => {
        setIsAnimate(false);
    };

    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    return (
        transitions ((style, item) => 
            item && (
            <animated.li style={style} className={`card flex-row mb-4 shadow-lg text-white ${elementClassName}`}>
                <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg" 
                    className="img-fluid w-25 d-inline" 
                    alt="unknown hero" 
                    style={{'objectFit': 'cover'}}/>
                <div className="card-body">
                    <h3 className="card-title">{name}</h3>
                    <p className="card-text">{description}</p>
                </div>
                <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                    <button 
                        onClick={handleRemove}
                        type="button" className="btn-close btn-close" aria-label="Close">    
                    </button>
                </span>
            </animated.li>
        ))
    )
}

export default HeroesListItem;
