import PropTypes from "prop-types";

import { withErrorApi } from "@hoc-helpers/withErrorApi";

import PersonInfo from '@components/PersonPage/PersonInfo'
import PersonPhoto from '@components/PersonPage/PersonPhoto'
import PersonLinkBack from '@components/PersonPage/PersonLinkBack'

import UiLoading from '@ui/UiLoading'


import { getApiResource } from "@utils/network";
import { getPeopleImage } from '@services/getPeopleData'
import { API_PERSON } from "@constants/api";

import styles from "./PersonPage.module.css";
import { useParams } from "react-router";
import React, { useEffect, useState, Suspense } from "react";
import { useSelector } from "react-redux";

const PersonFilms = React.lazy(() => import('@components/PersonPage/PersonFilms'))

const PersonPage = ({ seterrorApi }) => {
    
  const { id } = useParams();
  const [personId, setPersonId ] = useState(null)
  const [personInfo, setpersonInfo] = useState(null)
  const [personName, setpersonName] = useState(null)
  const [personPhoto, setpersonPhoto] = useState(null)
  const [personFilms, setpersonFilms] = useState(null)
  const [personFavorite, setpersonFavorite] = useState(false)

  const storeDate = useSelector(state => state.favoriteReducer)

  useEffect(() => {
    (async () => {
      const res = await getApiResource(`${API_PERSON}/${id}/`);

      storeDate[id] ? setpersonFavorite(true) : setpersonFavorite(false)
      setPersonId(id)
      if (res) {
        setpersonInfo([
            {title: 'Height', data: res.height},
            {title: 'Mass', data: res.mass},
            {title: 'Hair Color', data: res.hair_color},
            {title: 'Skin Color', data: res.skin_color},
            {title: 'Eye Color', data: res.eye_color},
            {title: 'Birth Year', data: res.birth_year},
            {title: 'Gender', data: res.gender},
        ])

        setpersonName(res.name)
        setpersonPhoto(getPeopleImage(id))

        res.films.length && setpersonFilms(res.films)

        seterrorApi(false);
      } else {
        seterrorApi(true);
      }
    })();
  }, []);
  return (
    <>
    <PersonLinkBack/>
    <div className={styles.wrapper}>
      <span className={styles.person__name}>{personName}</span>

      <div className={styles.container}>
        <PersonPhoto 
        personId={personId}
        personPhoto={personPhoto} 
        personName={personName}
        personFavorite={personFavorite}
        setpersonFavorite={setpersonFavorite}
        />
        {personInfo && <PersonInfo  personInfo={personInfo}/>}

        {personFilms && (
          <Suspense fallback={<UiLoading/>}>
            <PersonFilms personFilms={personFilms}/>
          </Suspense>
        )  }
        </div>
      </div>
    </>
  );
};

PersonPage.propTypes = {
  seterrorApi: PropTypes.func,
};

export default withErrorApi(PersonPage);
