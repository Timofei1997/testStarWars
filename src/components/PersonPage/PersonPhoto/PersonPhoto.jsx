import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { setPersonToFavorite, removePersonFromFavorite } from '@store/actions'

import iconFavorite from './img/favorite.svg'
import iconFavoriteFill from './img/favorite-fill.svg'

import styles from './PersonPhoto.module.css';


const PersonPhoto = ({
    personId,
    personPhoto, 
    personName, 
    personFavorite,
    setpersonFavorite
}) => {
    const dispath = useDispatch()
    
    

    const dispathFavoritePeople = () => {
        if (personFavorite) {
            dispath(removePersonFromFavorite(personId))
            setpersonFavorite(false)
        } else {
            dispath(setPersonToFavorite({
                [personId]: {
                    name: personName,
                    img: personPhoto
                }
            }))
            setpersonFavorite(true)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <img className={styles.photo} src={personPhoto} alt={personName} />
                <img
                    src={personFavorite ? iconFavoriteFill : iconFavorite}
                    onClick={dispathFavoritePeople}
                    className={styles.favorite}
                    alt="Add to favorite" 
                />
            </div>

            
            

            
            
            
        </>
    )
}

PersonPhoto.propTypes = {
    personId: PropTypes.string,
    personName: PropTypes.string,
    personPhoto: PropTypes.string,
    personFavorite: PropTypes.bool,
    setpersonFavorite: PropTypes.func,
}

export default PersonPhoto;