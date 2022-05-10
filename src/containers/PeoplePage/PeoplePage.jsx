import { getApiResource, changeHTTP } from "@utils/network";
import { useState, useEffect } from "react";
import { API_PEOPLE } from "@constants/api";
import { getPeopleId, getPeopleImage, getPeoplePageId } from "@services/getPeopleData";
import PeopleList from "@components/PeoplePage/PeopleList";
import { withErrorApi } from "@hoc-helpers/withErrorApi";
import PropTypes from "prop-types";
import {useQueryParams} from '@hooks/useQueryParams'
import PeopleNavigation from '@components/PeoplePage/PeopleNavigation'

const PeoplePage = ({ seterrorApi }) => {
  const [people, setPeople] = useState(null);
  const [prevPage, setprevPage] = useState(null);
  const [nextPage, setnextPage] = useState(null);
  const [counterPage, setcounterPage] = useState(1);
 
  const query = useQueryParams()
  const queryPage = query.get('page')



  
 
 



  const getResource = async (url) => {
    const res = await getApiResource(url);

    
    if (res) {
      const peopleList = res.results.map(({ name, url }) => {
        const id = getPeopleId(url);
        const img = getPeopleImage(id);
        
        return {
          id,
          name,
          img,
        };
      });

      setPeople(peopleList);
      setprevPage(changeHTTP(res.previous))
      setnextPage(changeHTTP(res.next))
      setcounterPage(getPeoplePageId(url))
      seterrorApi(false);
    } else {
      seterrorApi(true);
    }
  };

  useEffect(() => {
    getResource(API_PEOPLE + queryPage);
  }, []);
  return (
    <>
      
      <PeopleNavigation
      getResource = {getResource}
      prevPage = {prevPage}
      nextPage = {nextPage}
      counterPage = {counterPage}

      />
      {people && <PeopleList people={people} />}
    </>
  );
};

PeoplePage.propTypes = {
  seterrorApi: PropTypes.func,
};

export default withErrorApi(PeoplePage);
