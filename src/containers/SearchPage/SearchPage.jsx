import PropTypes from 'prop-types';
import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';

import { withErrorApi } from '@hoc-helpers/withErrorApi'
import { getApiResource } from '@utils/network'
import { API_SEARCH } from '@constants/api'
import { getPeopleId, getPeopleImage } from "@services/getPeopleData";

import UiInput from '@ui/UiInput'
import SearchPageInfo from '@components/SearchPage/SearchPageInfo'

import styles from './SearchPage.module.css';


const SearchPage = ({seterrorApi}) => {
    const [inputSearchValue, setInputSearchValue] = useState('')
    const [people, setPeople] = useState([])

    const getResponse = async param => {
        const res = await getApiResource(API_SEARCH+param)

        if (res) {
            const peopleList = res.results.map(({name, url}) => {
                const id = getPeopleId(url)
                const img = getPeopleImage(id)
                return {
                    id,
                    name,
                    img,
                }
            })

            setPeople(peopleList);

            seterrorApi(false)
        } else {
            seterrorApi(true)
        }
    }

    useEffect(() => {
        getResponse('')
    }, [])

    const debounceGetResponse = useCallback(
        debounce(value => getResponse(value), 300),
        []
    )
    

    const handleInputChange = value => {
        setInputSearchValue(value)
        debounceGetResponse(value)
    }
    return (
        <>
            <h1 className="header__text">Search</h1>
            <UiInput 
                value={inputSearchValue}
                handleInputChange={handleInputChange}
                placeholder="Input characters's name"
                classes={styles.input__search}
            />
            <SearchPageInfo people={people}/>
        </>
    )
}

SearchPage.propTypes = {
    seterrorApi: PropTypes.func
}

export default withErrorApi(SearchPage);