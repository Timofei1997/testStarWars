import { useNavigate } from 'react-router';
import iconBack from './img/left-arrow.png'

import styles from './PersonLinkBack.module.css';


const PersonLinkBack = () => {
    const navigate = useNavigate()
    const handleGoBack = e => {
        e.preventDefault()
        console.log('handleGoBack');
        navigate(-1)
    }
    return (
        <a
        href='#'
        onClick={handleGoBack}
        className = {styles.link}
        >
            <img className={styles.link__img} src={iconBack} alt="Go back" />
            <span>Go back</span>
        </a>
    )
}


export default PersonLinkBack;